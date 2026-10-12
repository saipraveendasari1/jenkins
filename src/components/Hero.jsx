import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PlayCircle, Search } from 'lucide-react';

export default function Hero({ searchQuery, setSearchQuery, onLaunchSimulator }) {
  return (
    <section style={{ padding: '36px 0 24px', textAlign: 'center', position: 'relative' }}>
      <div className="content-wrapper">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
            border: '1px solid rgba(59, 130, 246, 0.35)',
            color: '#60a5fa',
            padding: '6px 18px',
            borderRadius: 'var(--radius-full)',
            fontSize: '13px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '16px'
          }}
        >
          <Sparkles size={14} color="#f59e0b" />
          <span>Jenkins Practical Lab</span>
        </motion.div>

        {/* Punchy Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '16px'
          }}
        >
          Jenkins Hands-On{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #f43f5e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            DevOps Practical
          </span>
        </motion.h1>

        {/* Server Status & Fast Simulator Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '26px'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
              padding: '7px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13.5px',
              fontWeight: 600,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div
              className="status-pulse"
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: 'var(--accent-green)',
                borderRadius: '50%'
              }}
            />
            <span>
              Server: <code style={{ color: '#38bdf8', fontWeight: 700 }}>http://localhost:8000</code>
            </span>
            <span style={{ color: 'var(--border-medium)' }}>|</span>
            <span>User: <strong style={{ color: '#f59e0b' }}>sai</strong></span>
          </div>

          <button
            onClick={onLaunchSimulator}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
              transition: 'transform 0.2s ease'
            }}
          >
            <PlayCircle size={16} />
            <span>Interactive Terminal Simulator</span>
          </button>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ maxWidth: '520px', margin: '0 auto', position: 'relative' }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 18px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Search size={17} color="var(--text-dim)" style={{ flexShrink: 0, marginRight: '10px' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search practical steps (e.g., 'freestyle', 'parameter', 'batch')..."
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-main)',
                fontSize: '13.5px',
                padding: '8px 0',
                fontFamily: 'inherit'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 8px'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
