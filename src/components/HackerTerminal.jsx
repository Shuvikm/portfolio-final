import { useState, useEffect, useRef } from 'react';
import { profile, skillCategories } from '../data/portfolioData';

export default function HackerTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', content: 'INITIALIZING SYSTEM...' },
    { type: 'system', content: 'ACCESS GRANTED. WELCOME, AGENT.' },
    { type: 'system', content: 'TYPE "help" TO SEE AVAILABLE COMMANDS.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Keep input focused
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    
    // Add command to history
    let newHistory = [...history, { type: 'command', content: `guest@shuvik.dev:~$ ${cmd}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({ type: 'output', content: 'AVAILABLE COMMANDS:' });
        newHistory.push({ type: 'output', content: '  whoami  - Display profile information' });
        newHistory.push({ type: 'output', content: '  skills  - List technical stack' });
        newHistory.push({ type: 'output', content: '  clear   - Clear terminal output' });
        newHistory.push({ type: 'output', content: '  exit    - Close terminal session' });
        break;
      
      case 'whoami':
        newHistory.push({ type: 'output', content: `NAME: ${profile.name}` });
        newHistory.push({ type: 'output', content: `ROLE: ${profile.role}` });
        newHistory.push({ type: 'output', content: `BIO: ${profile.bio}` });
        break;

      case 'skills':
        skillCategories.forEach(category => {
          newHistory.push({ 
            type: 'output', 
            content: `[${category.category.toUpperCase()}] ${category.items.join(' // ')}` 
          });
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        onClose();
        return;

      case '':
        break;

      default:
        newHistory.push({ type: 'error', content: `bash: ${cleanCmd}: command not found` });
        break;
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 9999, // Above everything
        fontFamily: '"Courier New", Courier, monospace',
        color: '#39d353',
        padding: '2rem',
        boxSizing: 'border-box',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={() => inputRef.current?.focus()}
      ref={terminalRef}
    >
      <div style={{ pointerEvents: 'none' }}>
        {history.map((line, i) => (
          <div 
            key={i} 
            style={{ 
              marginBottom: '0.5rem',
              color: line.type === 'error' ? '#ff4444' : line.type === 'command' ? '#ffffff' : '#39d353',
              opacity: line.type === 'system' ? 0.7 : 1,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            {line.content}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
        <span style={{ color: '#ffffff', marginRight: '0.5rem' }}>guest@shuvik.dev:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#39d353',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '1rem',
            outline: 'none',
            flex: 1,
            caretColor: '#39d353'
          }}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
