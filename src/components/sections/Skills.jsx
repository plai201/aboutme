import React from "react";
import styled from "styled-components";
import { skills } from "../../data/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  width: 100%;
`;

const SkillCard = styled.div`
  background: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  max-width: 400px;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const SkillTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.background_light};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "80"};
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  position: relative;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transform: translateY(-8px);
  }
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 6px;
  border-radius: 4px;
  font-size: 12px;
  visibility: hidden;
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.3s, transform 0.3s;
`;

const Skills = () => {
  return (
    <Container id="Skills">
      <Title>Kỹ Năng</Title>
      <Description>
        {/* Here are some of my skills I have been working on over the past 3
        years. */}
      </Description>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillCard key={`skill-${index}`}>
            <SkillTitle>{skill.title}</SkillTitle>
            <SkillList>
              {skill.skills.map((item, idx) => (
                <SkillItem key={`skill-item-${idx}`}>
                  <SkillImage src={item.image} alt={item.name} />
                  {item.name}
                  <Tooltip className="tooltip">{item.description}</Tooltip>
                </SkillItem>
              ))}
            </SkillList>
          </SkillCard>
        ))}
      </SkillsGrid>
    </Container>
  );
};

export default Skills;
