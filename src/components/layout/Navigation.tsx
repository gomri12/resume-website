import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--background-light);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px var(--shadow-color);
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
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 1rem;
  text-align: center;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
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
  background: var(--background-light);
  z-index: 1001;
  padding: 2rem;
  
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