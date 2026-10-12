import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function InstructorNote({ note }) {
  if (!note) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        marginTop: '28px',
        padding: '24px 28px',
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.08)'
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
        }}
      >
        {note.icon === 'Lightbulb' ? <Lightbulb size={22} /> : <GraduationCap size={22} />}
      </div>

      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#34d399',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>{note.title}</span>
        </h4>

        <p style={{ fontSize: '14.5px', color: 'var(--text-main)', lineHeight: 1.65, marginBottom: '12px' }}>
          {note.content}
        </p>

        {note.bullets && (
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {note.bullets.map((bullet, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.55
                }}
              >
                <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
