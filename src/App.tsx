import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import styled from '@emotion/styled';
import './App.css';
import HackingGame from './components/HackingGame';
import Navigation from './components/layout/Navigation';
import { content } from './content';

// Styled components for animated background
const AnimatedBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 25%, #2d1b3d 50%, #1a1f3a 75%, #0a0e27 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  overflow: hidden;
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(66, 153, 225, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
    animation: pulse 8s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
`;

const Star = styled(motion.div)`
  position: absolute;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  box-shadow: 
    0 0 6px rgba(255, 255, 255, 0.8),
    0 0 12px rgba(66, 153, 225, 0.6),
    0 0 18px rgba(139, 92, 246, 0.4);
`;

const ShootingStar = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 2px;
  background: linear-gradient(90deg, 
    rgba(255,255,255,0) 0%, 
    rgba(255,255,255,1) 30%,
    rgba(66, 153, 225, 1) 50%,
    rgba(255,255,255,0) 100%);
  transform-origin: left center;
  filter: blur(1.5px);
  box-shadow: 
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(66, 153, 225, 0.6);
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
  margin-top: 80px;
`;

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: #2d3748;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #4299e1;
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
  color: #2d3748;
  
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
  background: white;
  z-index: 1001;
  padding: 2rem;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
`;

const Header = styled(motion.header)`
  margin-bottom: 4rem;
  padding-top: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfileSection = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3rem;
  align-items: start;
  background: rgba(255, 255, 255, 0.08);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      rgba(66, 153, 225, 0.8),
      rgba(139, 92, 246, 0.8),
      rgba(236, 72, 153, 0.8));
    background-size: 200% 100%;
    animation: shimmer 3s ease infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    padding: 2rem;
  }
`;

const ProfileImage = styled(motion.div)`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: visible;
  position: relative;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    padding: 4px;
    background: linear-gradient(135deg, 
      rgba(66, 153, 225, 0.8),
      rgba(139, 92, 246, 0.8),
      rgba(236, 72, 153, 0.8),
      rgba(66, 153, 225, 0.8));
    background-size: 300% 300%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: rotate 4s linear infinite;
  }
  
  @keyframes rotate {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 10px 40px rgba(0, 0, 0, 0.3),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
  }
  
  &:hover img {
    transform: scale(1.08) rotate(2deg);
  }
`;

const ProfileInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Section = styled(motion.section)`
  background: rgba(255, 255, 255, 0.08);
  padding: 3rem;
  border-radius: 24px;
  margin-bottom: 3rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      rgba(66, 153, 225, 0.8),
      rgba(139, 92, 246, 0.8),
      rgba(236, 72, 153, 0.8));
    background-size: 200% 100%;
    animation: shimmer 3s ease infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 2rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.85) 30%,
    rgba(66, 153, 225, 0.9) 60%,
    rgba(139, 92, 246, 0.9) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.2;
  animation: gradientShift 5s ease infinite;
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.5rem 0;
  letter-spacing: 0.01em;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ContactGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(66, 153, 225, 0.3);
    transform: translateY(-2px);
  }
  
  a {
    color: rgba(66, 153, 225, 0.9);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s ease;
    font-weight: 500;
    
    &:hover {
      color: rgba(66, 153, 225, 1);
      transform: translateX(2px);
    }
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: rgba(66, 153, 225, 0.8);
    transition: all 0.3s ease;
  }
  
  &:hover svg {
    color: rgba(66, 153, 225, 1);
    transform: scale(1.1);
  }
  
  span {
    color: rgba(255, 255, 255, 0.75);
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
`;

const SkillsCategory = styled(motion.div)`
  background: rgba(255, 255, 255, 0.06);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 20px rgba(66, 153, 225, 0.2);
    border-color: rgba(66, 153, 225, 0.3);
  }
  
  &:hover::before {
    left: 100%;
  }
  
  h4 {
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    &::before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 1.5rem;
      background: linear-gradient(180deg, 
        rgba(66, 153, 225, 0.9),
        rgba(139, 92, 246, 0.9));
      border-radius: 3px;
      box-shadow: 0 2px 8px rgba(66, 153, 225, 0.4);
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      color: rgba(255, 255, 255, 0.75);
      padding: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
      transition: all 0.3s ease;
      
      &::before {
        content: '▹';
        position: absolute;
        left: 0;
        color: rgba(66, 153, 225, 0.8);
        font-size: 1.2rem;
        transition: transform 0.3s ease;
      }
      
      &:hover {
        color: rgba(255, 255, 255, 0.95);
        transform: translateX(4px);
        
        &::before {
          transform: translateX(2px);
          color: rgba(66, 153, 225, 1);
        }
      }
    }
  }
`;

const ExperienceTimeline = styled(motion.div)`
  position: relative;
  padding-left: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, 
      rgba(66, 153, 225, 0.6),
      rgba(139, 92, 246, 0.6),
      rgba(236, 72, 153, 0.6));
    background-size: 100% 200%;
    animation: timelineFlow 3s ease infinite;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(66, 153, 225, 0.3);
  }
  
  @keyframes timelineFlow {
    0% { background-position: 0% 0%; }
    50% { background-position: 0% 100%; }
    100% { background-position: 0% 0%; }
  }
  
  @media (max-width: 768px) {
    padding-left: 1rem;
    
    &::before {
      width: 2px;
    }
  }
`;

const ExperienceItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.06);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
  margin-left: 2rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    left: -2rem;
    top: 2rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, 
      rgba(66, 153, 225, 0.9),
      rgba(139, 92, 246, 0.9));
    box-shadow: 
      0 0 10px rgba(66, 153, 225, 0.6),
      inset 0 0 10px rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.1);
  }
  
  &:hover {
    transform: translateX(8px) translateY(-4px);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 20px rgba(66, 153, 225, 0.2);
    border-color: rgba(66, 153, 225, 0.3);
  }
  
  h3 {
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  
  .company {
    color: rgba(66, 153, 225, 0.9);
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    display: inline-block;
    transition: all 0.3s ease;
    
    &:hover {
      color: rgba(66, 153, 225, 1);
      transform: translateX(4px);
    }
  }
  
  .date {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  
  .description {
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 1rem;
    line-height: 1.7;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    
    li {
      position: relative;
      padding-left: 2rem;
      margin-bottom: 0.75rem;
      color: rgba(255, 255, 255, 0.75);
      line-height: 1.7;
      transition: all 0.3s ease;
      
      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: rgba(66, 153, 225, 0.8);
        font-size: 1.2rem;
        transition: all 0.3s ease;
      }
      
      &:hover {
        color: rgba(255, 255, 255, 0.95);
        transform: translateX(4px);
        
        &::before {
          transform: translateX(2px);
          color: rgba(66, 153, 225, 1);
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    margin-left: 1rem;
    padding: 1.5rem;
    
    &::before {
      left: -1rem;
      width: 10px;
      height: 10px;
    }
  }
`;

const LanguagesList = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
  
  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(66, 153, 225, 0.3);
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 4px 12px rgba(66, 153, 225, 0.2);
    }
    
    strong {
      color: rgba(255, 255, 255, 0.95);
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    span {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.95rem;
    }
  }
`;

const SectionTitle = styled(motion.h3)`
  font-size: 2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
  letter-spacing: -0.01em;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, 
      rgba(66, 153, 225, 0.9),
      rgba(139, 92, 246, 0.9));
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(66, 153, 225, 0.4);
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Footer = styled(motion.footer)`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.95rem;
  
  p {
    margin: 0;
  }
`;

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const [stars] = useState(generateStars());
  const [shootingStars] = useState(generateShootingStars());

  // Generate stars for the background
  function generateStars() {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2
    }));
  }

  // Generate shooting stars
  function generateShootingStars() {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      angle: Math.random() * 45 + 45,
      duration: Math.random() * 2 + 1,
      delay: i * 3
    }));
  }

  // Animation variants for stars
  const starVariants = {
    animate: (custom: { duration: number }) => ({
      opacity: [0.3, 1, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  // Animation variants for shooting stars
  const shootingStarVariants = {
    initial: {
      x: 0,
      y: 0,
      opacity: 0
    },
    animate: (custom: { duration: number, delay: number }) => ({
      x: [0, 200],
      y: [0, 200],
      opacity: [0, 1, 0],
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        repeat: Infinity,
        repeatDelay: 5
      }
    })
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <AnimatedBackground>
        {stars.map((star) => (
          <Star
            key={star.id}
            custom={{ duration: star.duration }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size
            }}
          />
        ))}
        {shootingStars.map((star) => (
          <ShootingStar
            key={star.id}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, 200],
              y: [0, 200],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 5
            }}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: `rotate(${star.angle}deg)`
            }}
          />
        ))}
      </AnimatedBackground>

      <Navigation />

      <Container
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <ProfileSection>
            <ProfileImage
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={content.personal.profileImage}
                alt={content.personal.name}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/200x200?text=OG';
                }}
              />
            </ProfileImage>
            <ProfileInfo variants={staggerContainer} initial="initial" animate="animate">
              <Title variants={fadeInUp}>
                {content.personal.name}
              </Title>
              <Subtitle variants={fadeInUp}>{content.personal.title}</Subtitle>
              <ContactGrid variants={staggerContainer} initial="initial" animate="animate">
                <ContactItem variants={fadeInUp}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
                </ContactItem>
                <ContactItem variants={fadeInUp}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <a href={`tel:${content.contact.phone}`}>{content.contact.phone}</a>
                </ContactItem>
                <ContactItem variants={fadeInUp}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>{content.contact.location}</span>
                </ContactItem>
                <ContactItem variants={fadeInUp}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <a href={`https://${content.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                    {content.contact.linkedin}
                  </a>
                </ContactItem>
              </ContactGrid>
            </ProfileInfo>
          </ProfileSection>
        </Header>

        <Section 
          id="about" 
          variants={fadeInUp} 
          initial="initial" 
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle variants={fadeInUp}>{content.about.title}</SectionTitle>
          {content.about.paragraphs.map((paragraph, index) => (
            <motion.p 
              key={index} 
              variants={fadeInUp}
              style={{ 
                marginTop: index > 0 ? '1.5rem' : 0,
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.8',
                fontSize: '1.05rem'
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </Section>

        <Section 
          id="profile" 
          variants={fadeInUp} 
          initial="initial" 
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle variants={fadeInUp}>{content.profile.title}</SectionTitle>
          <motion.p 
            variants={fadeInUp}
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.8',
              fontSize: '1.05rem'
            }}
          >
            {content.profile.content}
          </motion.p>
        </Section>

        <Section 
          id="experience" 
          variants={fadeInUp} 
          initial="initial" 
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle variants={fadeInUp}>{content.experience.title}</SectionTitle>
          <ExperienceTimeline 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {content.experience.items.map((item, index) => (
              <ExperienceItem 
                key={index} 
                variants={fadeInUp}
                whileHover={{ scale: 1.01 }}
              >
                <h3>{item.title}</h3>
                <div className="company">{item.company}</div>
                <div className="date">{item.date}</div>
                {item.achievements && (
                  <ul>
                    {item.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </ExperienceItem>
            ))}
          </ExperienceTimeline>
        </Section>

        <Section 
          id="skills" 
          variants={fadeInUp} 
          initial="initial" 
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle variants={fadeInUp}>{content.skills.title}</SectionTitle>
          <SkillsGrid 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {content.skills.categories.map((category, index) => (
              <SkillsCategory 
                key={index} 
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <h4>{category.title}</h4>
                <ul>
                  {category.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </SkillsCategory>
            ))}
          </SkillsGrid>
        </Section>

        <Section 
          id="languages" 
          variants={fadeInUp} 
          initial="initial" 
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle variants={fadeInUp}>{content.languages.title}</SectionTitle>
          <LanguagesList 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {content.languages.items.map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <strong>{item.name}</strong>
                <span>({item.level})</span>
              </motion.div>
            ))}
          </LanguagesList>
        </Section>

        <Section 
          id="education" 
          variants={fadeInUp} 
          initial="initial" 
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle variants={fadeInUp}>{content.education.title}</SectionTitle>
          <ExperienceTimeline 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {content.education.items.map((item, index) => (
              <ExperienceItem 
                key={index} 
                variants={fadeInUp}
                whileHover={{ scale: 1.01 }}
              >
                <h3>{item.degree}</h3>
                <div className="company">{item.institution}</div>
                <div className="date">{item.date}</div>
              </ExperienceItem>
            ))}
          </ExperienceTimeline>
        </Section>

        <Footer 
          variants={fadeInUp} 
          initial="initial" 
          whileInView="animate"
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} {content.personal.name}</p>
        </Footer>
      </Container>

      <HackingGame />
    </>
  );
}

export default App;
