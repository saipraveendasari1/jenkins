import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, ExternalLink } from 'lucide-react';
import CodeBox from './CodeBox';
import ScreenshotViewer from './ScreenshotViewer';

export default function StepCard({
  step,
  isCompleted,
  onToggleComplete,
  onOpenLightbox,
  index
}) {
  const theme = step.colorTheme || {
    primary: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    glow: 'rgba(59, 130, 246, 0.4)',
    text: '#60a5fa',
    cardBorder: 'rgba(59, 130, 246, 0.35)',
    bgAccent: 'rgba(59, 130, 246, 0.08)'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'var(--bg-card)',
        border: isCompleted
          ? '1.5px solid #10b981'
          : `1.5px solid ${theme.cardBorder}`,
        borderRadius: 'var(--radius-lg)',
        marginBottom: '32px',
        overflow: 'hidden',
        boxShadow: isCompleted
          ? '0 10px 35px rgba(16, 185, 129, 0.2)'
          : `0 10px 35px rgba(0, 0, 0, 0.35), 0 0 20px ${theme.bgAccent}`,
        transition: 'all 0.3s ease',
        position: 'relative'
      }}
    >
      {/* Top Colorful Accent Ribbon */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: isCompleted
            ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
            : theme.gradient,
          zIndex: 2
        }}
      />

      {/* Step Header */}
      <div
        style={{
          padding: '22px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          background: 'rgba(255, 255, 255, 0.025)',
          borderBottom: '1px solid var(--border-subtle)',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '260px' }}>
          {/* Vibrant Step Number Badge */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: isCompleted
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : theme.gradient,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 900,
              flexShrink: 0,
              boxShadow: isCompleted
                ? '0 4px 18px rgba(16, 185, 129, 0.45)'
                : `0 4px 20px ${theme.glow}`,
              transition: 'background 0.3s'
            }}
          >
            {isCompleted ? <Check size={24} strokeWidth={3} /> : step.number}
          </div>

          <div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '-0.01em',
                marginBottom: '4px',
                color: 'var(--text-main)'
              }}
            >
              {step.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5 }}>
              {step.subtitle}
            </p>
          </div>
        </div>

        {/* Step Complete Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggleComplete(step.id)}
          style={{
            background: isCompleted
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              : 'var(--bg-surface)',
            border: isCompleted
              ? 'none'
              : '1px solid var(--border-medium)',
            color: isCompleted ? '#ffffff' : 'var(--text-main)',
            padding: '9px 18px',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: isCompleted
              ? '0 4px 16px rgba(16, 185, 129, 0.4)'
              : 'var(--shadow-sm)',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
        >
          <CheckCircle2 size={16} color={isCompleted ? '#ffffff' : 'var(--text-dim)'} />
          <span>{isCompleted ? 'Completed ✓' : 'Mark Done'}</span>
        </motion.button>
      </div>

      {/* Step Content Body */}
      <div style={{ padding: '26px 28px' }}>
        {/* Instruction Flow Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {step.instructions?.map((inst, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '15px',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '13px 18px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                borderLeft: `4px solid ${theme.primary}`,
                lineHeight: 1.7,
                color: 'var(--text-main)'
              }}
            >
              <span style={{ color: theme.text, fontWeight: 900, marginRight: '4px' }}>👉</span>
              <span>{inst.text}</span>

              {inst.link && (
                <a
                  href={inst.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#38bdf8',
                    textDecoration: 'none',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(14, 165, 233, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(14, 165, 233, 0.4)'
                  }}
                >
                  <span>{inst.link}</span>
                  <ExternalLink size={12} />
                </a>
              )}

              {inst.afterLink && <span>{inst.afterLink}</span>}

              {inst.target && (
                <span className="click-target">
                  {inst.target}
                </span>
              )}

              {inst.afterTarget && <span>{inst.afterTarget}</span>}

              {inst.secondTarget && (
                <span className="click-target">
                  {inst.secondTarget}
                </span>
              )}

              {inst.badge && (
                <span className="key-badge">
                  {inst.badge}
                </span>
              )}

              {inst.afterBadge && <span>{inst.afterBadge}</span>}

              {inst.secondBadge && (
                <span className="key-badge">
                  {inst.secondBadge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Code Snippets Box if exists */}
        {step.codeSnippets && <CodeBox codeSnippets={step.codeSnippets} />}

        {/* Primary Screenshot */}
        {step.screenshot && (
          <ScreenshotViewer screenshot={step.screenshot} onOpenLightbox={onOpenLightbox} />
        )}

        {/* Secondary instructions if present (e.g. OS choice) */}
        {step.secondaryInstructions && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px 0 14px' }}>
            {step.secondaryInstructions.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: `4px solid ${theme.primary}`,
                  fontSize: '15px'
                }}
              >
                <div>
                  <span style={{ color: theme.text, marginRight: '8px', fontWeight: 900 }}>👉</span>
                  <span>{item.text}</span>
                </div>
                {item.windowsTarget && (
                  <div style={{ marginTop: '10px', paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      • <strong style={{ color: '#38bdf8' }}>Windows Students:</strong>{' '}
                      <span className="click-target">{item.windowsTarget}</span>
                    </div>
                    <div>
                      • <strong style={{ color: '#a78bfa' }}>Linux / Mac Students:</strong>{' '}
                      <span className="click-target">{item.linuxTarget}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Table if present (e.g. for parameter configurations) */}
        {step.table && (
          <div className="param-table-container">
            <div
              style={{
                padding: '12px 18px',
                background: 'rgba(255, 255, 255, 0.04)',
                fontWeight: 800,
                fontSize: '14px',
                color: theme.text,
                borderBottom: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>📋 {step.table.title}</span>
            </div>
            <table className="param-table">
              <thead>
                <tr>
                  {step.table.headers.map((h, hi) => (
                    <th key={hi}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.table.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci}>
                        {ci === 1 ? (
                          <code style={{ color: '#38bdf8', whiteSpace: 'pre-line', fontWeight: 800 }}>
                            {cell}
                          </code>
                        ) : (
                          <span>{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Secondary Screenshot if exists */}
        {step.secondaryScreenshot && (
          <ScreenshotViewer screenshot={step.secondaryScreenshot} onOpenLightbox={onOpenLightbox} />
        )}
      </div>
    </motion.div>
  );
}
