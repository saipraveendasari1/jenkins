import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export default function ProgressBar({ completedSteps, totalSteps, resetProgress }) {
  const completedCount = completedSteps.size;
  const percentage = Math.min(100, Math.round((completedCount / totalSteps) * 100));

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 22px',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={20} color={percentage === 100 ? '#10b981' : '#3b82f6'} />
          <span style={{ fontWeight: 700, fontSize: '15px' }}>
            Lab Completion Tracker
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            ({completedCount} of {totalSteps} steps completed)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 800, fontSize: '16px', color: percentage === 100 ? '#10b981' : 'var(--primary)' }}>
            {percentage}%
          </span>
          {completedCount > 0 && (
            <button
              onClick={resetProgress}
              title="Reset progress"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Track and Animated Bar */}
      <div
        style={{
          height: '10px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            height: '100%',
            background:
              percentage === 100
                ? 'linear-gradient(90deg, #10b981, #059669)'
                : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            boxShadow:
              percentage === 100
                ? '0 0 12px rgba(16, 185, 129, 0.6)'
                : '0 0 12px rgba(59, 130, 246, 0.6)',
            borderRadius: '9999px'
          }}
        />
      </div>
    </div>
  );
}
