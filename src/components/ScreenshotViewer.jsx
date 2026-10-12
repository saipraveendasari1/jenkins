import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Info } from 'lucide-react';

export default function ScreenshotViewer({ screenshot, onOpenLightbox }) {
  if (!screenshot) return null;

  return (
    <div
      style={{
        margin: '22px 0 12px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border-medium)',
        background: '#0a0d14',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
        position: 'relative'
      }}
    >
      {/* Browser Chrome Toolbar */}
      <div
        style={{
          padding: '10px 18px',
          background: 'rgba(20, 24, 33, 0.95)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}
      >
        {/* Window Dots */}
        <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>

        {/* Address Bar Simulation */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.35)',
            padding: '3px 14px',
            borderRadius: '9999px',
            fontSize: '11.5px',
            fontFamily: 'var(--font-mono)',
            color: '#94a3b8',
            maxWidth: '480px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          {screenshot.url || 'http://localhost:8000'}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onOpenLightbox(screenshot)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '12px',
            transition: 'color 0.2s'
          }}
          title="Click to expand screenshot"
        >
          <Maximize2 size={13} />
          <span>Expand</span>
        </button>
      </div>

      {/* Screenshot Image with hover zoom */}
      <div
        onClick={() => onOpenLightbox(screenshot)}
        style={{
          cursor: 'zoom-in',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#030712'
        }}
      >
        <motion.img
          className="step-screenshot"
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.25 }}
          src={screenshot.src}
          alt={screenshot.alt}
          loading="eager"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.2s'
          }}
        />
      </div>

      {/* Visual Cue Caption */}
      {screenshot.caption && (
        <div
          style={{
            padding: '12px 20px',
            background: 'rgba(15, 23, 42, 0.95)',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '13px',
            color: '#cbd5e1',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Info size={16} color="#60a5fa" style={{ flexShrink: 0 }} />
          <span>
            <strong style={{ color: '#93c5fd' }}>Visual Cue:</strong> {screenshot.caption}
          </span>
        </div>
      )}
    </div>
  );
}
