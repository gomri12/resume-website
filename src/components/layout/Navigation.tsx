import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(10, 14, 39, 0.8);
  backdrop-filter: blur(20px);
  z-index: 1000;
  padding: 1.25rem 2rem;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 1rem;
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 8px;
  
  &:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(66, 153, 225, 0.9),
      rgba(139, 92, 246, 0.9));
    border-radius: 2px;
    transition: width 0.3s ease;
    box-shadow: 0 2px 8px rgba(66, 153, 225, 0.4);
  }
  
  &:hover::after {
    width: 80%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-primary);
  position: absolute;
  right: 2rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 14, 39, 0.98);
  backdrop-filter: blur(20px);
  z-index: 1001;
  padding: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    text-align: center;
  }
`;

const MotionLink = motion(Link);

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <Nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContainer>
          <NavLinks>
            <MotionLink
              to="/#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              About
            </MotionLink>
            <MotionLink
              to="/#profile"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('profile');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              Profile
            </MotionLink>
            <MotionLink
              to="/#skills"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('skills');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              Skills
            </MotionLink>
            <MotionLink
              to="/#languages"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('languages');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              Languages
            </MotionLink>
            <MotionLink
              to="/#education"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('education');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              Education
            </MotionLink>
          </NavLinks>
          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <MotionLink
              to="/#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              About
            </MotionLink>
            <MotionLink
              to="/#profile"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('profile');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              Profile
            </MotionLink>
            <MotionLink
              to="/#skills"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('skills');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              Skills
            </MotionLink>
            <MotionLink
              to="/#languages"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('languages');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              Languages
            </MotionLink>
            <MotionLink
              to="/#education"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('education');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              Education
            </MotionLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 