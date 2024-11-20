import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Component để render mô hình Earth
const Earth = () => {
  const { scene } = useGLTF('./planet/scene.gltf');
  return <primitive object={scene} scale={3} position-y={0} />;
};

const OrbitWithIcons = ({ setAutoRotate }) => {
  const groupRef = useRef();
  const [textures, setTextures] = useState([]);
  const [isHovered, setIsHovered] = useState(null);
  const [scales, setScales] = useState(new Array(6).fill(1)); // Mảng lưu trữ scale của các icon

  const icons = useMemo(() => [
    { uri: 'fb.png', link: 'https://www.facebook.com/nttpp22' },
    { uri: 'instagram.png', link: 'https://www.instagram.com/tugthnh.0/' },
    { uri: 'phone.png', link: 'tel:+84969503077' },
    { uri: 'linkedin.png', link: 'https://linkedin.com' },
    { uri: 'zalo.png', link: 'https://zalo.me/0969503077' },
    { uri: 'tiktok.webp', link: 'https://www.tiktok.com/@plai.201' },
  ], []);

  // Tải textures khi cần
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = icons.map(icon => textureLoader.load(`./planet/textures/${icon.uri}`, (texture) => {
      texture.anisotropy = 16; // Tăng chất lượng texture với anisotropic filtering
      texture.minFilter = THREE.LinearMipmapLinearFilter; // Sử dụng mipmap cho texture
    }));
    setTextures(loadedTextures);
  }, [icons]);

  // Hàm xử lý sự kiện click
  const handleClick = (url) => {
    if (url.startsWith('tel:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  };

  const radius = 6;

  // Xử lý hover và highlight icon
  const handlePointerOver = (index) => {
    setIsHovered(index);
    setAutoRotate(false); // Dừng quay khi hover vào icon
  };

  const handlePointerOut = () => {
    setIsHovered(null);
    setAutoRotate(true); // Tiếp tục quay khi không hover
  };

  // Cập nhật scale một cách mượt mà
  useFrame(() => {
    if (isHovered !== null) {
      setScales(prevScales => prevScales.map((scale, index) => 
        index === isHovered ? Math.min(scale + 0.05, 1.5) : scale
      ));
    } else {
      setScales(prevScales => prevScales.map(scale => Math.max(scale - 0.05, 1)));
    }
  });

  return (
    <group ref={groupRef}>
      {icons.map((icon, index) => {
        const angle = (index / icons.length) * Math.PI * 2;
        const position = [radius * Math.cos(angle), 0, radius * Math.sin(angle)];

        return (
          <mesh
            key={index}
            position={position}
            onClick={() => handleClick(icon.link)}
            onPointerOver={() => handlePointerOver(index)}
            onPointerOut={handlePointerOut}
            scale={[scales[index], scales[index], scales[index]]}  // Sử dụng scale mượt mà
          >
            <planeGeometry args={[2, 2]} />
            <meshStandardMaterial
              map={textures[index]}
              transparent={true}
              opacity={1}
              emissive={isHovered === index ? new THREE.Color(0.1, 0.1, 1) : new THREE.Color(0, 0, 0)}
              emissiveIntensity={isHovered === index ? 1 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const EarthCanvas = () => {
  const [autoRotate, setAutoRotate] = useState(true); // Trạng thái autoRotate

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
        position: [-8, 5, 10],
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate={autoRotate} // Điều chỉnh autoRotate dựa trên trạng thái
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Earth />
        <OrbitWithIcons setAutoRotate={setAutoRotate} /> {/* Truyền hàm setAutoRotate */}
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
