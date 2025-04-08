import React from 'react'
import styled from 'styled-components'
import { Bio } from '../../data/constants';
import TypeWriter from "typewriter-effect";
import ProImage from "../../images/Tung.jpg";
import ProBgAnimation from "../ProBgAnimation";
import { Tilt } from 'react-tilt';
import { motion } from "framer-motion"
import { headContainerAnimation,headContentAnimation, headTextAnimation } from "../../utils/motion";
import StarCanvas from "../canvas/Stars";
import BoxLove from '../BoxLove';

const ProContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    padding: 80px 30px;
    z-index: 1;

    @media (max-width: 960px){
        padding: 66px 16px; 
    }
    @media (max-width: 640px){
        padding: 32px 16px;
    }
    clip-path: polygon( 0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;

const ProInnerContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1100px;
     
    @media (max-width: 960px){
        flex-direction: column;
    }

`;
const ProLeftContainer = styled.div`
    width: 100%;
    order: 1;
    @media (max-width: 960px){
        order: 2;
        margin-bottom: 30px;
        display: flex;
        gap: 6px;
        flex-direction: column;
        align-items: center;
    }
`;
const ProRightContainer = styled.div`
    width: 100%;
    order: 2;
    display: flex;
    justify-content: end;
    // transform: translateX(-120px); /* Dịch sang trái */

    @media (max-width: 960px){
        order: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 80px;
        // transform: translateX(0); /* Trở lại vị trí cũ trên màn nhỏ */

    }
    @media (max-width: 640px){
        margin-bottom: 30px;
    }
`;
const Title = styled.div`
    font-weight: 700;
    font-size: 50px;
    color: ${({ theme }) => theme.text_primary};
    line-height: 68px;

    @media (max-width: 960px){
        text-align: center;
    }
    @media (max-width:960px){
        font-size: 40px;
        line-height: 48px;
        margin-bottom: 8px;
    }
`;
const TextLoop = styled.div`
    font-weight: 600;
    font-size: 32px;
    display: flex;
    gap: 12px;
    color: ${({ theme }) => theme.text_primary};
    line-height: 68px;

    @media (max-width: 960px){
        text-align: center;
    }
    @media (max-width:960px){
        font-size: 22px;
        line-height: 48px;
        margin-bottom: 16px;
    }
`;
const Span = styled.div`
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
`;
const SubTitle = styled.div`
    font-size: 20px;
    line-height:32px;
    color: ${({ theme }) => theme.text_primary  + 95};

    @media (max-width: 960px){
        text-align: center;
    }
    @media (max-width:960px){
        font-size: 16px;
        line-height: 32px;
    }
`;
const ResumeButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary || "#fff"};
  background-color: ${({ theme }) => theme.primary || "#007BFF"};
  border: 2px solid ${({ theme }) => theme.primary || "#007BFF"};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  margin-top: 24px; /* Tạo khoảng cách phía trên */
  margin-bottom: 16px; /* Tạo khoảng cách phía dưới */

  &:hover {
    background-color: ${({ theme }) => theme.text_primary || "#fff"};
    color: ${({ theme }) => theme.primary || "#007BFF"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media screen and (max-width: 960px) {
    padding: 10px 20px; /* Giảm kích thước nút */
    font-size: 0.9rem; /* Giảm kích thước chữ */
    text-align: center;
  }
`;
const Img = styled.img`
  border-radius: 50%; /* Tạo hình tròn */
  width: 100%; /* Chiều rộng của ảnh chiếm toàn bộ container */
  max-width: 400px; /* Giới hạn kích thước tối đa */
  aspect-ratio: 1 / 1; /* Đảm bảo tỷ lệ 1:1 để hình luôn là hình tròn */
  object-fit: cover; /* Cắt ảnh để vừa khít mà không bị méo */
  border: 2px solid ${({ theme }) => theme.primary};

  @media (max-width: 640px) {
    max-width: 280px; /* Giới hạn kích thước tối đa trên màn hình nhỏ */
  }
`;
const ProBg = styled.div`
  position: absolute; /* Đặt nền trong context của container */
  display: flex; /* Để canh chỉnh nội dung nếu có */
  top: 50%; /* Định vị giữa màn hình theo trục Y */
  left: 50%; /* Định vị giữa màn hình theo trục X */
  width: 100%; /* Độ rộng 100% của container */
  height: 100%; /* Chiều cao đầy đủ của container */
  max-width: 1360px; /* Giới hạn chiều rộng tối đa */
  justify-content: flex-end; /* Căn nội dung về bên phải */
  transform: translate(-50%, -50%); /* Dịch chuyển trung tâm */
  background: ${({ theme }) => theme.background || 'none'}; /* Thêm màu nền nếu cần */

  @media (max-width: 960px) {
    justify-content: center; /* Căn giữa trên màn hình nhỏ */
    padding: 0; /* Xóa padding nếu có */
  }

`;



const ProSection = () => {
  return (
    <div id="About">
  {/* Container chính chứa toàn bộ phần "Giới thiệu" */}
  <ProContainer>
    {/* Nền với hiệu ứng hoạt họa */}
    <ProBg>
        <StarCanvas />
      <ProBgAnimation />
    </ProBg>

    {/* Nội dung chính với hiệu ứng hoạt họa */}
    <motion.div {...headContainerAnimation}>
      <ProInnerContainer>
        {/* Phần bên trái - Hiển thị tên, vai trò, và nút xem CV */}
        <ProLeftContainer>
          {/* Hiệu ứng hoạt họa cho tiêu đề */}
          <motion.div {...headTextAnimation}>
            <Title>
              Xin chao, Toi la <br /> {Bio.name} {/* Hiển thị tên từ dữ liệu Bio */}
            </Title>
            <TextLoop>
              
              <Span>
                <TypeWriter
                  options={{
                    strings: Bio.roles, // Hiển thị danh sách vai trò
                    autoStart: true,    // Tự động chạy hiệu ứng
                    loop: true,         // Lặp lại liên tục
                  }}
                />
              </Span>
            </TextLoop>
          </motion.div>

          {/* Hiệu ứng hoạt họa cho phần mô tả */}
          <motion.div {...headContentAnimation}>
            <SubTitle>{Bio.description}</SubTitle> {/* Hiển thị mô tả từ dữ liệu Bio */}
          </motion.div>

          {/* Nút gọi */}
            <ResumeButton href="tel:+84969503077">
              Book now
          </ResumeButton> 
             </ProLeftContainer>

        {/* Phần bên phải - Hiển thị ảnh với hiệu ứng nghiêng */}
        <ProRightContainer>
          <motion.div {...headContentAnimation}>
            <Tilt>
             <Img src={ProImage} alt="NguyenThanhTung" />
            </Tilt>
          </motion.div>
        </ProRightContainer>
      </ProInnerContainer>
    </motion.div>
  </ProContainer>
    </div>

  );
};

export default ProSection
