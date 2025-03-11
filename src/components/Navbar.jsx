import React, { useState, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import { Link as LinkR} from "react-router-dom";
import { Bio } from "../data/constants";
import { MenuRounded } from "@mui/icons-material"

// Navbar Container
const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg || "#282c34"};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

// Inner Container
const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Logo
const NavLogo = styled(LinkR)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
`;

// Desktop Navigation Items
const NavItems = styled.ul`
  display: flex;
  gap: 32px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none; /* Ẩn trên màn hình nhỏ */
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary || "white"};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary || "#007BFF"};
  }
`;

// Mobile Icon
const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

// Mobile Menu
const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  padding: 16px 0;
  gap: 16px;
  z-index: 999;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen}) => isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "999" : "-999")};
`;

// Button Container
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none; /* Ẩn trên màn hình nhỏ */
  }
`;

const GitHubButton = styled.a`
  background: none;
  color: ${({ theme }) => theme.primary || "#007BFF"};
  border: 1px solid ${({ theme }) => theme.primary || "#007BFF"};
  border-radius: 20px;
  padding: 8px 16px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.primary || "#007BFF"};
    color: white;
  }
`;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();
    const menuRef = useRef(null);

    // Close the mobile menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <Nav>
        <NavbarContainer>
          {/* Logo */}
          <NavLogo to="/"></NavLogo>

          {/* Mobile Icon */}
          <MobileIcon onClick={() => setIsOpen(!isOpen)}>
            <MenuRounded style={{ color: "inherit" }} />
          </MobileIcon>

          {/* Desktop Nav Items */}
          <NavItems>
            <NavLink href="#About">Giới Thiệu</NavLink>
            <NavLink href="#Skills">Kỹ Năng</NavLink>
            <NavLink href="#Projects">Dự Án</NavLink>
            <NavLink href="#Skills">Linh Tinh</NavLink>
            <NavLink href="#Contact">Liên Hệ</NavLink>
          </NavItems>

          {/* Mobile Menu */}
          <MobileMenu ref={menuRef} isOpen={isOpen}>
            <NavLink href="#About" onClick={() => setIsOpen(false)}>Giới Thiệu</NavLink>
            <NavLink href="#Skills" onClick={() => setIsOpen(false)}>Kỹ Năng</NavLink>
            <NavLink href="#Projects" onClick={() => setIsOpen(false)}>Dự Án</NavLink>
            <NavLink href="#Skills" onClick={() => setIsOpen(false)}>Sở Thích</NavLink>
            <NavLink href="#Contact" onClick={() => setIsOpen(false)}>Liên Hệ</NavLink>
            <GitHubButton href={Bio.github} target="_blank"
              style={{
                background: theme.primary,
                color: theme.text_primary,
              }}
            >
              GitHub
            </GitHubButton>
          </MobileMenu>

          {/* Button Container */}
          <ButtonContainer>
            <GitHubButton href={Bio.github} target="_blank">
              GitHub
            </GitHubButton>
          </ButtonContainer>
        </NavbarContainer>
      </Nav>
    );
};

export default Navbar;
