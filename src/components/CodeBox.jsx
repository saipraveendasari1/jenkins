import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CodeBox({ codeSnippets }) {
  const [activeOs, setActiveOs] = useState('windows');
  const [copied, setCopied] = useState(false);

  const activeSnippet = activeOs === 'windows' ? codeSnippets.windows : codeSnippets.linux;

  const handleCopy = () => {
    if (!activeSnippet?.code) return;
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        margin: '22px 0',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border-medium)',
        background: 'var(--bg-code)',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      {/* OS Tabs Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0 12px',
          background: 'rgba(255, 255, 255, 0.03)'
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setActiveOs('windows')}
            style={{
              padding: '10px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeOs === 'windows' ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeOs === 'windows' ? '#60a5fa' : 'var(--text-dim)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>🪟 Windows Batch Command</span>
          </button>

          <button
            onClick={() => setActiveOs('linux')}
            style={{
              padding: '10px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeOs === 'linux' ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeOs === 'linux' ? '#60a5fa' : 'var(--text-dim)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>🐧 Linux / macOS Shell</span>
          </button>
        </div>

        {/* Copy Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          style={{
            background: copied ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
            border: '1px solid ' + (copied ? '#10b981' : 'var(--border-subtle)'),
            color: '#ffffff',
            padding: '5px 12px',
            borderRadius: 'var(--radius-xs)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background-color 0.2s'
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'Copied! ✓' : 'Copy Code'}</span>
        </motion.button>
      </div>

      {/* Snippet Header */}
      <div
        style={{
          padding: '8px 18px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          fontSize: '12px',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)'
        }}
      >
        {activeSnippet?.title}
      </div>

      {/* Code Text */}
      <div style={{ position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeOs}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: '18px 22px',
              overflowX: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '13.5px',
              lineHeight: 1.65,
              color: '#e2e8f0',
              margin: 0
            }}
          >
            {activeSnippet?.code}
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}
