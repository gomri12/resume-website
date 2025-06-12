import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  overflow: hidden;
`;

const Star = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 4px white;
`;

const ShootingStar = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
  transform-origin: left center;
  filter: blur(1px);
  box-shadow: 0 0 10px white;
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
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const ProfileImage = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProfileInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Section = styled(motion.section)`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
    opacity: 0.5;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: #2d3748;
  margin: 0;
  background: linear-gradient(120deg, #2d3748, #4a5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: #4a5568;
  margin: 0.5rem 0;
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
  gap: 0.5rem;
  color: var(--text-secondary);
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-dark);
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: var(--primary-color);
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
`;

const SkillsCategory = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 1rem;
      background: var(--primary-color);
      border-radius: 2px;
    }
  }
`;

const ExperienceTimeline = styled(motion.div)`
  position: relative;
  padding-left: 2rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-color);
  }
`;

const ExperienceItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }
  
  .company {
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .date {
    color: var(--text-tertiary);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding-left: 1rem;
    margin-top: 0.5rem;
    
    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
      
      &:before {
        content: '→';
        position: absolute;
        left: 0;
        color: var(--primary-color);
      }
    }
  }
`;

const LanguagesList = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    span {
      color: var(--text-secondary);
    }
    
    &:after {
      content: '•';
      color: var(--primary-color);
      margin-left: 1rem;
    }
    
    &:last-child:after {
      display: none;
    }
  }
`;

const SectionTitle = styled(motion.h3)`
  font-size: 1.75rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #4299e1, #63b3ed);
    border-radius: 2px;
  }
`;

const Footer = styled(motion.footer)`
  text-align: center;
  color: #718096;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
`;

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
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
              <Title variants={fadeInUp}>{content.personal.name}</Title>
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
          animate="animate"
        >
          <SectionTitle variants={fadeInUp}>{content.about.title}</SectionTitle>
          {content.about.paragraphs.map((paragraph, index) => (
            <motion.p 
              key={index} 
              variants={fadeInUp}
              style={{ marginTop: index > 0 ? '1rem' : 0 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </Section>

        <Section 
          id="profile" 
          variants={fadeInUp} 
          initial="initial" 
          animate="animate"
        >
          <SectionTitle variants={fadeInUp}>{content.profile.title}</SectionTitle>
          <motion.p variants={fadeInUp}>{content.profile.content}</motion.p>
        </Section>

        <Section 
          id="experience" 
          variants={fadeInUp} 
          initial="initial" 
          animate="animate"
        >
          <SectionTitle variants={fadeInUp}>{content.experience.title}</SectionTitle>
          <ExperienceTimeline variants={staggerContainer} initial="initial" animate="animate">
            {content.experience.items.map((item, index) => (
              <ExperienceItem key={index} variants={fadeInUp}>
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
          animate="animate"
        >
          <SectionTitle variants={fadeInUp}>{content.skills.title}</SectionTitle>
          <SkillsGrid variants={staggerContainer} initial="initial" animate="animate">
            {content.skills.categories.map((category, index) => (
              <SkillsCategory key={index} variants={fadeInUp}>
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
          animate="animate"
        >
          <SectionTitle variants={fadeInUp}>{content.languages.title}</SectionTitle>
          <LanguagesList variants={staggerContainer} initial="initial" animate="animate">
            {content.languages.items.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
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
          animate="animate"
        >
          <SectionTitle variants={fadeInUp}>{content.education.title}</SectionTitle>
          <ExperienceTimeline variants={staggerContainer} initial="initial" animate="animate">
            {content.education.items.map((item, index) => (
              <ExperienceItem key={index} variants={fadeInUp}>
                <h3>{item.degree}</h3>
                <div className="company">{item.institution}</div>
                <div className="date">{item.date}</div>
              </ExperienceItem>
            ))}
          </ExperienceTimeline>
        </Section>

        <Footer variants={fadeInUp} initial="initial" animate="animate">
          <p>&copy; {new Date().getFullYear()} {content.personal.name}</p>
        </Footer>
      </Container>

      <HackingGame />
    </>
  );
}

export default App;
