import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Terminal, Server } from 'lucide-react';

export default function Header({
  theme,
  toggleTheme,
  activeTab,
  setActiveTab,
  completedSteps,
  totalSteps
}) {
  const progressPercent = Math.round((completedSteps.size / totalSteps) * 100);

  const navItems = [
    { id: 'lab1', label: 'Lab 1' },
    { id: 'lab2', label: 'Lab 2' },
    { id: 'lab3', label: 'Lab 3' },
    { id: 'lab4', label: 'Lab 4' },
    { id: 'lab5', label: 'Lab 5' },
    { id: 'simulator', label: 'Simulator' }
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: theme === 'dark' ? 'rgba(8, 12, 22, 0.85)' : 'rgba(244, 246, 251, 0.85)',
        borderBottom: '1px solid var(--border-medium)',
        transition: 'background-color 0.3s ease'
      }}
    >
      <div
        className="content-wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          gap: '16px'
        }}
      >
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => {
            setActiveTab('lab1');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(59, 130, 246, 0.45)',
              color: '#ffffff'
            }}
          >
            <Terminal size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Jenkins DevOps Lab</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  color: 'var(--primary)',
                  border: '1px solid var(--border-accent)'
                }}
              >
                v2.580.1
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Server size={12} />
              <span>localhost:8000 &bull; sai</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Nav Links */}
        <div
          className="header-nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--bg-card)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'var(--primary-gradient)' : 'transparent',
                  border: 'none',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(59, 130, 246, 0.4)' : 'none'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Progress Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              fontSize: '12.5px',
              fontWeight: 700
            }}
          >
            <span style={{ color: progressPercent === 100 ? '#10b981' : 'var(--primary)' }}>
              {progressPercent}%
            </span>
            <span style={{ color: 'var(--text-dim)' }}>Done</span>
          </div>

          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-main)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {theme === 'dark' ? <Moon size={16} color="#60a5fa" /> : <Sun size={16} color="#f59e0b" />}
            </motion.div>
            <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
