import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from "maath/random/dist/maath-random.esm";
import styled from 'styled-components';

// Wrapper cho Canvas
const StyledCanvaswrapper = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  inset: 0;
`;

const Stars = (props) => {
  const ref = useRef();

  // Tạo vị trí ngẫu nhiên cho các điểm trong hình cầu
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  // Thêm chuyển động xoay cho các điểm
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10; // Xoay chậm theo trục X
    ref.current.rotation.y -= delta / 15; // Xoay chậm theo trục Y
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        {/* Thuộc tính hiển thị cho các điểm */}
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StyledStarCanvas = () => {
  return (
    <StyledCanvaswrapper>
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Sử dụng Suspense để tải */}
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        {/* Tải trước các tài nguyên */}
        <Preload all />
      </Canvas>
    </StyledCanvaswrapper>
  );
};

export default StyledStarCanvas;
