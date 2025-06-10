import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  height: 300px;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  overflow: hidden;
  z-index: 1000;
  font-family: 'Courier New', monospace;
  border: 1px solid rgba(0, 255, 0, 0.5);
  backdrop-filter: blur(8px);
`;

const TerminalHeader = styled.div`
  background: rgba(0, 255, 0, 0.1);
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
`;

const TerminalTitle = styled.div`
  color: #00ff00;
  font-size: 14px;
`;

const TerminalControls = styled.div`
  display: flex;
  gap: 8px;
`;

const TerminalButton = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;
`;

const TerminalContent = styled.div`
  padding: 16px;
  height: calc(100% - 40px);
  overflow-y: auto;
  color: #00ff00;
  font-size: 14px;
  line-height: 1.5;
`;

const TerminalInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const TerminalPrompt = styled.span`
  color: #00ff00;
`;

const TerminalCursor = styled(motion.span)`
  display: inline-block;
  width: 8px;
  height: 16px;
  background: #00ff00;
  margin-left: 4px;
`;

const TerminalLine = styled.div`
  margin-bottom: 8px;
  white-space: pre-wrap;
`;

const SecretButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  color: #00ff00;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  z-index: 999;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(4px);
  
  &:hover {
    background: rgba(0, 255, 0, 0.2);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const commands = {
  help: () => `Available commands:
  - help: Show this help message
  - clear: Clear the terminal
  - about: Show about information
  - skills: Display technical skills
  - hack: Start hacking simulation
  - contact: Show contact information
  - exit: Close terminal`,
  
  about: () => `Omri Glam - Engineering Group Manager
  Experienced tech leader with a passion for innovation
  and building high-performing engineering teams.`,
  
  skills: () => `Technical Skills:
  - Leadership & Management
  - System Architecture
  - Cloud Technologies
  - DevOps & CI/CD
  - Full Stack Development
  - Agile Methodologies`,
  
  contact: () => `Contact Information:
  Email: gomri12@gmail.com
  Phone: 050-3323352
  Location: Tel Aviv, Israel
  LinkedIn: linkedin.com/in/omri-glam`,
  
  hack: async (setLines: (lines: string[]) => void, lines: string[]) => {
    const hackSequence = [
      'Initializing hack sequence...',
      'Bypassing security protocols...',
      'Accessing mainframe...',
      'Decrypting data...',
      'Injecting payload...',
      'Hack complete! Just kidding, this is a demo 😉'
    ];
    
    for (const message of hackSequence) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLines([...lines, message]);
    }
  }
};

const HackingGame: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<string[]>(['Welcome to the terminal. Type "help" for available commands.']);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.altKey && e.key === 't') {
      e.preventDefault();
      setIsVisible(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleCommand = async (cmd: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    const newLines = [...lines, `> ${cmd}`];
    setLines(newLines);
    setInput('');

    if (cmd === 'clear') {
      setLines([]);
    } else if (cmd === 'exit') {
      setIsVisible(false);
    } else if (cmd === 'hack') {
      await commands.hack(setLines, newLines);
    } else {
      const response = (commands as any)[cmd]?.() || `Command not found: ${cmd}. Type "help" for available commands.`;
      setLines([...newLines, response]);
    }
    
    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim().toLowerCase());
    }
  };

  return (
    <>
      <SecretButton
        onClick={() => setIsVisible(prev => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"/>
        </svg>
        Terminal (Ctrl+Alt+T)
      </SecretButton>
      <AnimatePresence>
        {isVisible && (
          <TerminalContainer
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <TerminalHeader>
              <TerminalTitle>Terminal v1.0</TerminalTitle>
              <TerminalControls>
                <TerminalButton 
                  color="#ff5f56" 
                  onClick={() => setIsVisible(false)}
                  style={{ cursor: 'pointer' }}
                />
                <TerminalButton color="#ffbd2e" />
                <TerminalButton color="#27c93f" />
              </TerminalControls>
            </TerminalHeader>
            <TerminalContent>
              {lines.map((line, i) => (
                <TerminalLine key={i}>{line}</TerminalLine>
              ))}
              <form onSubmit={handleSubmit}>
                <TerminalInput>
                  <TerminalPrompt>$</TerminalPrompt>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#00ff00',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      width: '100%',
                      outline: 'none'
                    }}
                    autoFocus
                  />
                  <TerminalCursor
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </TerminalInput>
              </form>
            </TerminalContent>
          </TerminalContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default HackingGame; 