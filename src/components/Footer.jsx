import React from 'react';
import { Terminal, ArrowUp, Heart, Shield } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-card)',
        padding: '48px 24px 36px',
        marginTop: '60px',
        position: 'relative'
      }}
    >
      <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '17px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}
          >
            <Terminal size={16} />
          </div>
          <span>DevOps Engineering Lab Manual</span>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '600px', lineHeight: 1.6 }}>
          Designed for Jenkins 2.580.1 running on <code>http://localhost:8000</code>. Featuring interactive screen guides, dynamic runtime parameterization, and OS runner sandboxing.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: 'var(--text-dim)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span>Freestyle Jobs</span>
          <span>&bull;</span>
          <span>Batch & Shell Runners</span>
          <span>&bull;</span>
          <span>Choice & String Parameters</span>
          <span>&bull;</span>
          <span>Exit Codes 0 & 1</span>
        </div>

        <button
          onClick={scrollToTop}
          style={{
            marginTop: '12px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-muted)',
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowUp size={14} />
          <span>Back to Top</span>
        </button>

        <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '16px' }}>
          DevOps Lab Interactive Visual Edition &bull; Click any screenshot to open full-screen lightbox
        </div>
      </div>
    </footer>
  );
}
