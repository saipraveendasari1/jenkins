import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAB_DATA } from './data/labData';
import Header from './components/Header';
import Hero from './components/Hero';
import TabNavigation from './components/TabNavigation';
import ProgressBar from './components/ProgressBar';
import StepCard from './components/StepCard';
import JenkinsSimulator from './components/JenkinsSimulator';
import LightboxModal from './components/LightboxModal';
import Footer from './components/Footer';
import CodeBox from './components/CodeBox';
import { Code, CheckCircle2, GitBranch, AlertTriangle } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('jenkins_lab_theme') || 'dark';
  });
  const [activeTab, setActiveTab] = useState('lab1');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxScreenshot, setLightboxScreenshot] = useState(null);

  // Completed steps tracker persisted in localStorage
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem('jenkins_lab_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jenkins_lab_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      'jenkins_lab_completed',
      JSON.stringify(Array.from(completedSteps))
    );
  }, [completedSteps]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleStepComplete = (stepId) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  const resetProgress = () => {
    setCompletedSteps(new Set());
  };

  const allLabKeys = ['lab1', 'lab2', 'lab3', 'lab4', 'lab5'];
  const totalSteps = allLabKeys.reduce((acc, key) => acc + (LAB_DATA[key]?.steps?.length || 0), 0);

  // Filter steps if user typed a search query
  const filterSteps = (steps = []) => {
    if (!searchQuery.trim()) return steps;
    const q = searchQuery.toLowerCase();
    return steps.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.instructions?.some((i) => i.text?.toLowerCase().includes(q) || i.target?.toLowerCase().includes(q)) ||
        (s.codeSnippets?.windows?.code && s.codeSnippets.windows.code.toLowerCase().includes(q)) ||
        (s.codeSnippets?.linux?.code && s.codeSnippets.linux.code.toLowerCase().includes(q))
    );
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedSteps={completedSteps}
        totalSteps={totalSteps}
      />

      {/* Hero */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLaunchSimulator={() => {
          setActiveTab('simulator');
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }}
      />

      <main className="content-wrapper">
        {/* Progress Completion Tracker */}
        <ProgressBar
          completedSteps={completedSteps}
          totalSteps={totalSteps}
          resetProgress={resetProgress}
        />

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Search Status Notice */}
        {searchQuery && (
          <div
            style={{
              padding: '12px 20px',
              background: 'rgba(59, 130, 246, 0.12)',
              border: '1px solid rgba(59, 130, 246, 0.35)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '14px'
            }}
          >
            <span>
              Searching practicals matching <strong>&ldquo;{searchQuery}&rdquo;</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Clear filter
            </button>
          </div>
        )}

        {/* ========================================================
            LAB 1: YOUR FIRST FREESTYLE JOB
            ======================================================== */}
        {(activeTab === 'lab1' || searchQuery) && (
          <section id="lab1" style={{ marginBottom: '50px' }}>
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid rgba(59, 130, 246, 0.35)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                marginBottom: '28px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)'
                }}
              />
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                    background: 'rgba(59, 130, 246, 0.18)',
                    color: '#60a5fa'
                  }}
                >
                  {LAB_DATA.lab1.badge}
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  {LAB_DATA.lab1.title}
                </h2>
              </div>
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#60a5fa'
                }}
              >
                9 Practical Steps
              </div>
            </div>

            {filterSteps(LAB_DATA.lab1.steps).map((step, idx) => (
              <StepCard
                key={step.id}
                step={step}
                index={idx}
                isCompleted={completedSteps.has(step.id)}
                onToggleComplete={toggleStepComplete}
                onOpenLightbox={setLightboxScreenshot}
              />
            ))}
          </section>
        )}

        {/* ========================================================
            LAB 2: PARAMETERIZED BUILDS
            ======================================================== */}
        {(activeTab === 'lab2' || searchQuery) && (
          <section id="lab2" style={{ marginBottom: '50px' }}>
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid rgba(139, 92, 246, 0.35)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                marginBottom: '28px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #8b5cf6 0%, #6d28d9 100%)'
                }}
              />
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                    background: 'rgba(139, 92, 246, 0.18)',
                    color: '#c4b5fd'
                  }}
                >
                  {LAB_DATA.lab2.badge}
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  {LAB_DATA.lab2.title}
                </h2>
              </div>
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#c4b5fd'
                }}
              >
                8 Practical Steps
              </div>
            </div>

            {filterSteps(LAB_DATA.lab2.steps).map((step, idx) => (
              <StepCard
                key={step.id}
                step={step}
                index={idx}
                isCompleted={completedSteps.has(step.id)}
                onToggleComplete={toggleStepComplete}
                onOpenLightbox={setLightboxScreenshot}
              />
            ))}
          </section>
        )}

        {/* ========================================================
            LAB 3: PYTHON CI & AUTOMATED TESTING
            ======================================================== */}
        {(activeTab === 'lab3' || searchQuery) && (
          <section id="lab3" style={{ marginBottom: '50px' }}>
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid rgba(6, 182, 212, 0.35)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                marginBottom: '28px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #06b6d4 0%, #0891b2 100%)'
                }}
              />
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                    background: 'rgba(6, 182, 212, 0.18)',
                    color: '#22d3ee'
                  }}
                >
                  {LAB_DATA.lab3.badge}
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  {LAB_DATA.lab3.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
                  <strong>Objective:</strong> {LAB_DATA.lab3.objective}
                </p>
              </div>
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#22d3ee'
                }}
              >
                4 Practical Steps
              </div>
            </div>

            {/* Understanding Sample Application Source Code Box */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid rgba(6, 182, 212, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                marginBottom: '32px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 800, color: '#22d3ee', marginBottom: '16px' }}>
                <Code size={18} />
                <span>Understanding the Sample Application Codebase</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                    📄 sample-app/app.py
                  </div>
                  <pre
                    style={{
                      background: 'var(--bg-code)',
                      border: '1px solid var(--border-medium)',
                      padding: '16px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontFamily: 'var(--font-mono)',
                      color: '#e2e8f0',
                      lineHeight: 1.6,
                      overflowX: 'auto'
                    }}
                  >
                    {LAB_DATA.lab3.sampleAppCode.appPy}
                  </pre>
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                    🧪 sample-app/test_app.py
                  </div>
                  <pre
                    style={{
                      background: 'var(--bg-code)',
                      border: '1px solid var(--border-medium)',
                      padding: '16px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontFamily: 'var(--font-mono)',
                      color: '#e2e8f0',
                      lineHeight: 1.6,
                      overflowX: 'auto'
                    }}
                  >
                    {LAB_DATA.lab3.sampleAppCode.testAppPy}
                  </pre>
                </div>
              </div>
            </div>

            {filterSteps(LAB_DATA.lab3.steps).map((step, idx) => (
              <StepCard
                key={step.id}
                step={step}
                index={idx}
                isCompleted={completedSteps.has(step.id)}
                onToggleComplete={toggleStepComplete}
                onOpenLightbox={setLightboxScreenshot}
              />
            ))}
          </section>
        )}

        {/* ========================================================
            LAB 4: CATCHING BUGS AUTOMATICALLY
            ======================================================== */}
        {(activeTab === 'lab4' || searchQuery) && (
          <section id="lab4" style={{ marginBottom: '50px' }}>
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid rgba(244, 63, 94, 0.35)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                marginBottom: '28px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #f43f5e 0%, #e11d48 100%)'
                }}
              />
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                    background: 'rgba(244, 63, 94, 0.18)',
                    color: '#fb7185'
                  }}
                >
                  {LAB_DATA.lab4.badge}
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  {LAB_DATA.lab4.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
                  <strong>Objective:</strong> {LAB_DATA.lab4.objective}
                </p>
              </div>
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#fb7185'
                }}
              >
                7 Practical Steps
              </div>
            </div>

            {/* The Big Classroom Takeaway Callout */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(225, 29, 72, 0.05) 100%)',
                border: '1.5px solid rgba(239, 68, 68, 0.35)',
                borderRadius: 'var(--radius-lg)',
                padding: '22px 28px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <AlertTriangle size={24} color="#f87171" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#f87171', marginBottom: '6px' }}>
                  The Core Takeaway: Automated Protection
                </h4>
                <p style={{ fontSize: '14.5px', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  In the old manual days, this math bug would have slipped into production and silently corrupted user transactions. With Jenkins Continuous Integration, the pipeline breaks instantly on commit, alerting the developer and blocking defective releases.
                </p>
              </div>
            </div>

            {filterSteps(LAB_DATA.lab4.steps).map((step, idx) => (
              <StepCard
                key={step.id}
                step={step}
                index={idx}
                isCompleted={completedSteps.has(step.id)}
                onToggleComplete={toggleStepComplete}
                onOpenLightbox={setLightboxScreenshot}
              />
            ))}
          </section>
        )}

        {/* ========================================================
            LAB 5: DECLARATIVE PIPELINE (JENKINSFILE)
            ======================================================== */}
        {(activeTab === 'lab5' || searchQuery) && (
          <section id="lab5" style={{ marginBottom: '50px' }}>
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1.5px solid rgba(16, 185, 129, 0.35)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                marginBottom: '28px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)'
                }}
              />
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                    background: 'rgba(16, 185, 129, 0.18)',
                    color: '#34d399'
                  }}
                >
                  {LAB_DATA.lab5.badge}
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  {LAB_DATA.lab5.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
                  <strong>Objective:</strong> {LAB_DATA.lab5.objective}
                </p>
              </div>
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#34d399'
                }}
              >
                8 Practical Steps
              </div>
            </div>

            {/* Why Pipelines as Code Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px',
                marginBottom: '32px'
              }}
            >
              {LAB_DATA.lab5.whyPipelines.map((reason, ridx) => {
                const [title, desc] = reason.split(': ');
                return (
                  <div
                    key={ridx}
                    style={{
                      padding: '18px 20px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-medium)',
                      borderLeft: '4px solid #10b981'
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#34d399', marginBottom: '6px' }}>
                      {title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      {desc}
                    </div>
                  </div>
                );
              })}
            </div>

            {filterSteps(LAB_DATA.lab5.steps).map((step, idx) => (
              <StepCard
                key={step.id}
                step={step}
                index={idx}
                isCompleted={completedSteps.has(step.id)}
                onToggleComplete={toggleStepComplete}
                onOpenLightbox={setLightboxScreenshot}
              />
            ))}
          </section>
        )}

        {/* ========================================================
            INTERACTIVE BUILD SIMULATOR
            ======================================================== */}
        {activeTab === 'simulator' && !searchQuery && (
          <section id="simulator">
            <JenkinsSimulator />
          </section>
        )}
      </main>

      {/* Lightbox Modal */}
      <LightboxModal
        screenshot={lightboxScreenshot}
        onClose={() => setLightboxScreenshot(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
