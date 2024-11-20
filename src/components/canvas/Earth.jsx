import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Component để render mô hình Earth
const Earth = () => {
  const { scene } = useGLTF('./planet/scene.gltf'); // Đảm bảo đường dẫn chính xác đến file GLTF
  return <primitive object={scene} scale={3} position-y={0} />;
};

// Component cho vòng xích đạo với biểu tượng
const OrbitWithIcons = () => {
  const groupRef = useRef();
  const [textures, setTextures] = useState([]);
  const [isHovered, setIsHovered] = useState(null); // Trạng thái kiểm soát hover
  const [stopRotation, setStopRotation] = useState(false); // Dừng quay khi hover

  // Xoay quỹ đạo (dừng quay nếu hover)
  useFrame(() => {
    if (!stopRotation && groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Tốc độ xoay vòng
    }
  });

  // Cập nhật đường dẫn của các icon
  const icons = [
    { uri: 'fb.png', link: 'https://facebook.com' },
    { uri: 'instagram.png', link: 'https://instagram.com' },
    { uri: 'phone.png', link: 'tel:+84969503077' }, // Sử dụng tel: để mở ứng dụng gọi điện
    { uri: 'linkedin.png', link: 'https://linkedin.com' },
    { uri: 'zalo.png', link: 'https://zalo.me' },
    { uri: 'tiktok.webp', link: 'https://twitter.com' }, // Thêm icon Twitter
  ];

  // Tải textures
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = icons.map(icon => textureLoader.load(`./planet/textures/${icon.uri}`));
    setTextures(loadedTextures);
  }, []);

  // Hàm xử lý sự kiện click
  const handleClick = (url) => {
    if (url.startsWith('tel:')) {
      window.location.href = url; // Mở ứng dụng gọi điện thoại khi nhấn vào icon phone
    } else {
      window.open(url, '_blank'); // Mở liên kết trong tab mới đối với các liên kết khác
    }
  };

  // Bán kính vòng tròn
  const radius = 6;

  // Xử lý hover và highlight icon
  const handlePointerOver = (index) => {
    setIsHovered(index);
    setStopRotation(true); // Dừng xoay khi hover
  };

  const handlePointerOut = () => {
    setIsHovered(null);
    setStopRotation(false); // Tiếp tục xoay khi không hover
  };

  return (
    <group ref={groupRef}>
      {icons.map((icon, index) => {
        // Tính toán vị trí của mỗi icon trên vòng tròn
        const angle = (index / icons.length) * Math.PI * 2; // Tính toán góc để chia đều các icon trên vòng tròn
        const position = [radius * Math.cos(angle), 0, radius * Math.sin(angle)];

        const scale = isHovered === index ? 1.5 : 1; // Nổi bật icon khi hover

        return (
          <mesh
            key={index}
            position={position}
            onClick={() => handleClick(icon.link)} // Xử lý sự kiện nhấp chuột
            onPointerOver={() => handlePointerOver(index)} // Dừng quay và làm nổi bật icon khi hover
            onPointerOut={handlePointerOut} // Tiếp tục quay khi không hover
            scale={[scale, scale, scale]} // Thay đổi kích thước khi hover
          >
            {/* Sử dụng planeGeometry để icon không bị bóp méo */}
            <planeGeometry args={[2, 2]} /> {/* Điều chỉnh kích thước của plane */}
            <meshStandardMaterial
              map={textures[index]} // Áp dụng texture đã tải
              transparent={true} // Cho phép nền trong suốt
              opacity={1} // Đảm bảo icon rõ ràng
              emissive={isHovered === index ? new THREE.Color(0.1, 0.1, 1) : new THREE.Color(0, 0, 0)} // Nổi bật với màu xanh khi hover
              emissiveIntensity={isHovered === index ? 1 : 0} // Điều chỉnh độ sáng của hiệu ứng phát sáng
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Canvas để render Earth và quỹ đạo
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-8, 5, 10], // Điều chỉnh góc nhìn
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Earth />
        <OrbitWithIcons /> {/* Thêm quỹ đạo với biểu tượng */}
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
