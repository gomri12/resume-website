import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../content';

const TerminalContainer = styled(motion.div)<{ isMaximized: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: ${props => props.isMaximized ? '90vw' : '400px'};
  height: ${props => props.isMaximized ? '80vh' : '300px'};
  background: rgba(0, 0, 0, 0.95);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  overflow: hidden;
  z-index: 1000;
  font-family: 'Courier New', monospace;
  border: 1px solid rgba(0, 255, 0, 0.5);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease-in-out;
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

const MinimizedTerminal = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  z-index: 1000;
  border: 1px solid rgba(0, 255, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    color: #00ff00;
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
  - ask [question]: Ask any question about my resume
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
  Email: ${content.contact.email}
  Phone: ${content.contact.phone}
  Location: ${content.contact.location}
  LinkedIn: ${content.contact.linkedin}`,
  
  ask: async (question: string, setLines: (lines: string[]) => void, lines: string[]) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (!apiKey) {
      return [
        'Error: OpenAI API key is not configured.',
        'To use the ask command:',
        '1. Create a .env file in the root directory',
        '2. Add your OpenAI API key: REACT_APP_OPENAI_API_KEY=your-api-key-here',
        '3. Restart the development server',
        '',
        'You can get an API key from: https://platform.openai.com/api-keys'
      ].join('\n');
    }

    if (!question || question.trim().length === 0) {
      return 'Please provide a question to ask.';
    }

    try {
      setLines([...lines, 'Processing your question...', 'Connecting to AI...']);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that answers questions about a person's resume. Be concise and accurate."
            },
            {
              role: "user",
              content: `You are an AI assistant that answers questions about a person's resume. 
              Use the following resume content to answer questions accurately and concisely.
              If you're not sure about something, say so. Don't make up information.
              Keep your answers brief and to the point.

              Resume Content:
              ${JSON.stringify(content, null, 2)}

              Question: ${question}

              Answer:`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      console.log('API Response Status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', errorData);
        throw new Error(`API request failed with status ${response.status}: ${errorData?.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (!data.choices?.[0]?.message?.content) {
        console.error('Invalid API response:', data);
        throw new Error('Invalid response from AI service');
      }

      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Terminal Error:', error);
      return 'Sorry, I encountered an error while processing your question. Please try again or use a different command.';
    }
  },
  
  hack: async (setLines: (lines: string[]) => void, lines: string[]): Promise<string> => {
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
    return 'Hack completed successfully!';
  }
};

const HackingGame: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<string[]>(['Welcome to the terminal. Type "help" for available commands.']);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.altKey && e.key === 't') {
      e.preventDefault();
      if (isMinimized) {
        setIsMinimized(false);
        setIsVisible(true);
      } else {
        setIsVisible(prev => !prev);
      }
    }
  }, [isMinimized]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleMaximize = () => {
    setIsMaximized(prev => !prev);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsVisible(false);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setIsVisible(true);
  };

  const handleCommand = async (cmd: string) => {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      const newLines = [...lines, `> ${cmd}`];
      setLines(newLines);
      setInput('');

      let response: string | string[];
      
      if (cmd === 'clear') {
        setLines([]);
        setIsProcessing(false);
        return;
      } else if (cmd === 'exit') {
        setIsVisible(false);
        setIsProcessing(false);
        return;
      } else if (cmd.startsWith('ask ')) {
        const question = cmd.slice(4);
        if (!question) {
          response = 'Please provide a question. Usage: ask [your question]';
        } else {
          try {
            response = await commands.ask(question, setLines, newLines);
          } catch (error) {
            console.error('Command Error:', error);
            response = 'An error occurred while processing your question. Please try again.';
          }
        }
      } else if (cmd === 'hack') {
        const hackResponse = await commands.hack(setLines, newLines);
        response = hackResponse;
      } else {
        response = (commands as any)[cmd]?.() || `Command not found: ${cmd}. Type "help" for available commands.`;
      }

      if (typeof response === 'string') {
        if (response.includes('\n')) {
          setLines([...newLines, ...response.split('\n')]);
        } else {
          setLines([...newLines, response]);
        }
      } else if (Array.isArray(response)) {
        setLines([...newLines, ...response]);
      } else {
        setLines([...newLines, 'Error: Invalid response format']);
      }
    } catch (error) {
      console.error('Command Handler Error:', error);
      setLines([...lines, 'An error occurred. Please try again.']);
    } finally {
      setIsProcessing(false);
    }
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
        onClick={() => {
          if (isMinimized) {
            handleRestore();
          } else {
            setIsVisible(prev => !prev);
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: isVisible ? 'none' : 'flex' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"/>
        </svg>
        Terminal (Ctrl+Alt+T)
      </SecretButton>

      <AnimatePresence>
        {isMinimized && (
          <MinimizedTerminal
            onClick={handleRestore}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"/>
            </svg>
          </MinimizedTerminal>
        )}

        {isVisible && !isMinimized && (
          <TerminalContainer
            isMaximized={isMaximized}
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
                <TerminalButton 
                  color="#ffbd2e" 
                  onClick={handleMinimize}
                  style={{ cursor: 'pointer' }}
                />
                <TerminalButton 
                  color="#27c93f" 
                  onClick={handleMaximize}
                  style={{ cursor: 'pointer' }}
                />
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