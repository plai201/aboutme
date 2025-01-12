import React from 'react';
import styled from 'styled-components';

// Styled div để bao quanh ảnh và SVG
const FrameContainer = styled.div`
  position: relative;
  display: inline-block;
  width: fit-content;
`;

const Image = styled.img`
  display: block;
  border-radius: 10px;
  width: 300px; /* Kích thước ảnh */
  height: 300px; /* Kích thước ảnh */
`;

const FlowerFrameSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const FlowerFrame = ({ src, alt }) => {
  return (
    <FrameContainer>
      <Image src={src} alt={alt} />
      <FlowerFrameSVG
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
      >
        <defs>
          <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff7f50" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="150" cy="150" r="145" stroke="url(#gradient)" strokeWidth="4" fill="none" />
        <path
          d="M150 5 Q160 50 200 50 Q240 50 250 100 Q260 150 200 200 Q140 250 100 200 Q50 150 80 100 Q100 50 150 5"
          stroke="rgba(255, 182, 193, 0.8)"
          fill="none"
          strokeWidth="3"
        />
      </FlowerFrameSVG>
    </FrameContainer>
  );
};

export default FlowerFrame;
