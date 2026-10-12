import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sliders, FlaskConical, AlertTriangle, GitBranch, Terminal } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: 'lab1',
      label: 'Lab 1: Freestyle Job',
      badge: 'Job 1',
      icon: Rocket,
      activeGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      glow: '0 4px 20px rgba(59, 130, 246, 0.45)'
    },
    {
      id: 'lab2',
      label: 'Lab 2: Parameters',
      badge: 'Job 2',
      icon: Sliders,
      activeGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      glow: '0 4px 20px rgba(139, 92, 246, 0.45)'
    },
    {
      id: 'lab3',
      label: 'Lab 3: Python CI',
      badge: 'Unit Tests',
      icon: FlaskConical,
      activeGradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      glow: '0 4px 20px rgba(6, 182, 212, 0.45)'
    },
    {
      id: 'lab4',
      label: 'Lab 4: Bug Catching',
      badge: 'CI in Action',
      icon: AlertTriangle,
      activeGradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
      glow: '0 4px 20px rgba(244, 63, 94, 0.45)'
    },
    {
      id: 'lab5',
      label: 'Lab 5: Declarative Pipeline',
      badge: 'Jenkinsfile',
      icon: GitBranch,
      activeGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      glow: '0 4px 20px rgba(16, 185, 129, 0.45)'
    },
    {
      id: 'simulator',
      label: 'Build Terminal Simulator',
      badge: 'Live Console',
      icon: Terminal,
      activeGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      glow: '0 4px 20px rgba(245, 158, 11, 0.45)'
    }
  ];

  return (
    <div style={{ margin: '8px 0 28px', display: 'flex', justifyContent: 'center' }}>
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '6px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-md)',
          backdropFilter: 'blur(16px)',
          justifyContent: 'center',
          maxWidth: '100%'
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: isActive ? tab.activeGradient : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? 800 : 600,
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? tab.glow : 'none'
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#ffffff' : 'var(--text-dim)',
                  fontWeight: 800
                }}
              >
                {tab.badge}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
