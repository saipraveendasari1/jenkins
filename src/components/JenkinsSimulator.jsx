import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, CheckCircle2, XCircle, RotateCcw, AlertCircle, Check, Bug } from 'lucide-react';

export default function JenkinsSimulator() {
  const [selectedJob, setSelectedJob] = useState('01-hello-world');
  const [runnerOs, setRunnerOs] = useState('windows');
  const [deployEnv, setDeployEnv] = useState('STAGING');
  const [appVersion, setAppVersion] = useState('v2.0.0');
  const [injectMathBug, setInjectMathBug] = useState(false);

  const [isBuilding, setIsBuilding] = useState(false);
  const [buildLogs, setBuildLogs] = useState([]);
  const [buildStatus, setBuildStatus] = useState(null); // 'SUCCESS' | 'FAILURE' | null
  const [buildNumber, setBuildNumber] = useState(1);
  const [activeStageIndex, setActiveStageIndex] = useState(-1);

  const pipelineStages = [
    { name: 'Environment Check', duration: '1s' },
    { name: 'Code Compilation', duration: '2s' },
    { name: 'Automated Tests', duration: '3s' },
    { name: 'Simulated Deployment', duration: '1s' }
  ];

  const runBuild = () => {
    if (isBuilding) return;

    setIsBuilding(true);
    setBuildStatus(null);
    setBuildLogs([]);
    setActiveStageIndex(-1);

    const now = new Date();
    const timeStr = now.toLocaleTimeString();

    let logsSequence = [];

    if (selectedJob === '01-hello-world') {
      logsSequence = [
        `Started by user sai`,
        `Running as SYSTEM`,
        `Building in workspace C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\01-hello-world`,
        `[01-hello-world] $ ${runnerOs === 'windows' ? 'cmd /c call C:\\Users\\TEMP\\jenkins123.bat' : '/bin/sh -xe /tmp/jenkins456.sh'}`,
        `==============================================`,
        `Hello from Jenkins running on ${runnerOs === 'windows' ? 'Windows' : 'Linux'}!`,
        `Machine Name: ${runnerOs === 'windows' ? 'DESKTOP-DEVOPS-LAB' : 'ip-172-31-42-18'}`,
        `Current Time: ${timeStr}`,
        `Current Directory: C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\01-hello-world`,
        `==============================================`,
        `Process exited with code 0 (Success)`,
        `Finished: SUCCESS`
      ];

      logsSequence.forEach((log, index) => {
        setTimeout(() => {
          setBuildLogs((prev) => [...prev, log]);
          if (index === logsSequence.length - 1) {
            setIsBuilding(false);
            setBuildStatus('SUCCESS');
            setBuildNumber((prev) => prev + 1);
          }
        }, (index + 1) * 200);
      });
    } else if (selectedJob === '02-parameterized-job') {
      logsSequence = [
        `Started by user sai`,
        `Running as SYSTEM`,
        `Building in workspace C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\02-parameterized-job`,
        `[EnvInject] - Injecting dynamic runtime parameters:`,
        `  DEPLOY_ENV = ${deployEnv}`,
        `  APP_VERSION = ${appVersion}`,
        `=============================================================`,
        `Deploying Version ${appVersion} to ${deployEnv} Environment...`,
        `Target deployment cluster verified for ${deployEnv.toLowerCase()}.domain.internal`,
        `Release package ${appVersion} deployed successfully!`,
        `=============================================================`,
        `Exit code 0 detected by Jenkins controller`,
        `Finished: SUCCESS`
      ];

      logsSequence.forEach((log, index) => {
        setTimeout(() => {
          setBuildLogs((prev) => [...prev, log]);
          if (index === logsSequence.length - 1) {
            setIsBuilding(false);
            setBuildStatus('SUCCESS');
            setBuildNumber((prev) => prev + 1);
          }
        }, (index + 1) * 200);
      });
    } else if (selectedJob === '03-python-app-ci') {
      if (injectMathBug) {
        logsSequence = [
          `Started by user sai`,
          `Running as SYSTEM`,
          `Building in workspace C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\03-python-app-ci`,
          `[STEP 1] Checking Python Runtime...`,
          `Python 3.11.4`,
          `[STEP 2] Checking Syntax and Compilation...`,
          `Listing 'sample-app'...`,
          `Compiling 'sample-app/app.py'...`,
          `Compiling 'sample-app/test_app.py'...`,
          `[STEP 3] Running Automated Unit Tests...`,
          `======================================================================`,
          `FAIL: test_add (test_app.TestApp)`,
          `----------------------------------------------------------------------`,
          `Traceback (most recent call last):`,
          `  File "test_app.py", line 6, in test_add`,
          `    self.assertEqual(add(2, 3), 5)`,
          `AssertionError: 1004 != 5`,
          `----------------------------------------------------------------------`,
          `Ran 5 tests in 0.001s`,
          `FAILED (failures=1)`,
          `Build step 'Execute batch/shell' marked build as failure`,
          `Finished: FAILURE`
        ];

        logsSequence.forEach((log, index) => {
          setTimeout(() => {
            setBuildLogs((prev) => [...prev, log]);
            if (index === logsSequence.length - 1) {
              setIsBuilding(false);
              setBuildStatus('FAILURE');
              setBuildNumber((prev) => prev + 1);
            }
          }, (index + 1) * 180);
        });
      } else {
        logsSequence = [
          `Started by user sai`,
          `Running as SYSTEM`,
          `Building in workspace C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\03-python-app-ci`,
          `[STEP 1] Checking Python Runtime...`,
          `Python 3.11.4`,
          `[STEP 2] Checking Syntax and Compilation...`,
          `Listing 'sample-app'...`,
          `Compiling 'sample-app/app.py'...`,
          `Compiling 'sample-app/test_app.py'...`,
          `[STEP 3] Running Automated Unit Tests...`,
          `.....`,
          `----------------------------------------------------------------------`,
          `Ran 5 tests in 0.002s`,
          `OK`,
          `Process exited with code 0`,
          `Finished: SUCCESS`
        ];

        logsSequence.forEach((log, index) => {
          setTimeout(() => {
            setBuildLogs((prev) => [...prev, log]);
            if (index === logsSequence.length - 1) {
              setIsBuilding(false);
              setBuildStatus('SUCCESS');
              setBuildNumber((prev) => prev + 1);
            }
          }, (index + 1) * 180);
        });
      }
    } else if (selectedJob === '04-declarative-pipeline') {
      logsSequence = [
        `Started by user sai`,
        `[Pipeline] Start of Pipeline`,
        `[Pipeline] node`,
        `Running on Jenkins in C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\04-declarative-pipeline`,
        `[Pipeline] { (Environment Check)`,
        `=== Stage 1: Inspecting Runtime Environment ===`,
        `Python 3.11.4`,
        `[Pipeline] } // stage`,
        `[Pipeline] { (Code Compilation)`,
        `=== Stage 2: Compiling Python Bytecode ===`,
        `Compiling sample-app bytecode... [OK]`,
        `[Pipeline] } // stage`,
        `[Pipeline] { (Automated Tests)`,
        `=== Stage 3: Executing Unit Test Suite ===`,
        `Ran 5 tests in 0.002s ... OK`,
        `[Pipeline] } // stage`,
        `[Pipeline] { (Simulated Deployment)`,
        `=== Stage 4: Deploying to Staging Environment ===`,
        `Application verified. Deployment simulated successfully.`,
        `[Pipeline] } // stage`,
        `[Pipeline] { (Declarative: Post Actions)`,
        `=====================================================`,
        `PIPELINE SUCCESS: All stages completed successfully!`,
        `=====================================================`,
        `[Pipeline] } // post`,
        `[Pipeline] End of Pipeline`,
        `Finished: SUCCESS`
      ];

      // Progressive stage progression
      const stageIntervals = [0, 1, 2, 3];
      stageIntervals.forEach((stageIdx) => {
        setTimeout(() => {
          setActiveStageIndex(stageIdx);
        }, (stageIdx + 1) * 600);
      });

      logsSequence.forEach((log, index) => {
        setTimeout(() => {
          setBuildLogs((prev) => [...prev, log]);
          if (index === logsSequence.length - 1) {
            setIsBuilding(false);
            setBuildStatus('SUCCESS');
            setBuildNumber((prev) => prev + 1);
          }
        }, (index + 1) * 120);
      });
    }
  };

  const resetTerminal = () => {
    setBuildLogs([]);
    setBuildStatus(null);
    setIsBuilding(false);
    setActiveStageIndex(-1);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto 60px' }}>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 30px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.06) 100%)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)'
              }}
            >
              <Terminal size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
                Interactive Jenkins Build Simulator
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                Test all 4 Jenkins project archetypes with live log streaming and automated validation.
              </p>
            </div>
          </div>

          <div
            style={{
              fontSize: '12px',
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            Live Controller Ready
          </div>
        </div>

        {/* Configuration Toolbar */}
        <div style={{ padding: '24px 30px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
              SELECT JENKINS LAB JOB
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { id: '01-hello-world', label: '01-hello-world (Lab 1)', color: '#3b82f6' },
                { id: '02-parameterized-job', label: '02-parameterized-job (Lab 2)', color: '#8b5cf6' },
                { id: '03-python-app-ci', label: '03-python-app-ci (Lab 3 & 4)', color: '#06b6d4' },
                { id: '04-declarative-pipeline', label: '04-declarative-pipeline (Lab 5)', color: '#10b981' }
              ].map((job) => (
                <button
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job.id);
                    resetTerminal();
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: selectedJob === job.id ? `${job.color}25` : 'var(--bg-surface)',
                    color: selectedJob === job.id ? job.color : 'var(--text-muted)',
                    border: selectedJob === job.id ? `1.5px solid ${job.color}` : '1px solid var(--border-subtle)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {job.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Options */}
          {selectedJob === '01-hello-world' && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button
                onClick={() => setRunnerOs('windows')}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: runnerOs === 'windows' ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-surface)',
                  color: runnerOs === 'windows' ? '#60a5fa' : 'var(--text-muted)',
                  border: runnerOs === 'windows' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)'
                }}
              >
                🪟 Windows Batch
              </button>
              <button
                onClick={() => setRunnerOs('linux')}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: runnerOs === 'linux' ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-surface)',
                  color: runnerOs === 'linux' ? '#60a5fa' : 'var(--text-muted)',
                  border: runnerOs === 'linux' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)'
                }}
              >
                🐧 Linux Shell
              </button>
            </div>
          )}

          {selectedJob === '02-parameterized-job' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-dim)' }}>
                  DEPLOY_ENV (Choice)
                </label>
                <select
                  value={deployEnv}
                  onChange={(e) => setDeployEnv(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-main)',
                    fontSize: '13px',
                    fontWeight: 700
                  }}
                >
                  <option value="DEVELOPMENT">DEVELOPMENT</option>
                  <option value="STAGING">STAGING</option>
                  <option value="PRODUCTION">PRODUCTION</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-dim)' }}>
                  APP_VERSION (String)
                </label>
                <input
                  type="text"
                  value={appVersion}
                  onChange={(e) => setAppVersion(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-main)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
              </div>
            </div>
          )}

          {selectedJob === '03-python-app-ci' && (
            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: injectMathBug ? '#f87171' : 'var(--text-muted)'
                }}
              >
                <input
                  type="checkbox"
                  checked={injectMathBug}
                  onChange={(e) => setInjectMathBug(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <Bug size={16} color={injectMathBug ? '#ef4444' : 'currentColor'} />
                <span>Simulate Injected Math Bug in app.py (+ 999 in add) — Test Lab 4 Failure!</span>
              </label>
            </div>
          )}

          {/* Action Trigger Buttons */}
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
              Ready to trigger build on controller.
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {buildLogs.length > 0 && (
                <button
                  onClick={resetTerminal}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-muted)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <RotateCcw size={14} />
                  <span>Clear</span>
                </button>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={runBuild}
                disabled={isBuilding}
                style={{
                  background: isBuilding
                    ? 'rgba(59, 130, 246, 0.4)'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '9px 22px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: isBuilding ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)'
                }}
              >
                <Play size={15} fill="white" />
                <span>{isBuilding ? 'Building Pipeline...' : `Build Now (#${buildNumber})`}</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Visual Stage View for Declarative Pipeline */}
        {selectedJob === '04-declarative-pipeline' && (
          <div style={{ padding: '20px 28px', background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-dim)', marginBottom: '12px', letterSpacing: '0.05em' }}>
              STAGE VIEW GRAPHICAL METRICS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {pipelineStages.map((stage, sidx) => {
                const isPassed = activeStageIndex >= sidx;
                const isCurrent = activeStageIndex === sidx && isBuilding;

                return (
                  <div
                    key={sidx}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      background: isPassed
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.15) 100%)'
                        : 'var(--bg-surface)',
                      border: isPassed
                        ? '1.5px solid #10b981'
                        : '1px solid var(--border-subtle)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                      {isPassed ? (
                        <Check size={14} color="#10b981" strokeWidth={3} />
                      ) : (
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#64748b' }} />
                      )}
                      <span style={{ fontSize: '12.5px', fontWeight: 800, color: isPassed ? '#34d399' : 'var(--text-muted)' }}>
                        {stage.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      {isPassed ? stage.duration : '--'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Live Terminal Log Viewer */}
        <div style={{ background: '#020617', padding: '20px 24px', minHeight: '260px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px', fontFamily: 'var(--font-mono)' }}>
                Jenkins Console Output - {selectedJob}
              </span>
            </div>

            {buildStatus && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12px',
                  fontWeight: 800,
                  background: buildStatus === 'SUCCESS' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: buildStatus === 'SUCCESS' ? '#34d399' : '#f87171',
                  border: buildStatus === 'SUCCESS' ? '1px solid #10b981' : '1px solid #ef4444'
                }}
              >
                {buildStatus === 'SUCCESS' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                <span>FINISHED: {buildStatus}</span>
              </div>
            )}
          </div>

          {buildLogs.length === 0 ? (
            <div style={{ padding: '36px 0', textAlign: 'center', color: '#475569', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
              &gt; Console idle. Click &quot;Build Now&quot; to execute {selectedJob}.
            </div>
          ) : (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.6, overflowX: 'auto' }}>
              {buildLogs.map((log, i) => {
                const isFail = log.includes('FAILURE') || log.includes('FAIL:') || log.includes('FAILED');
                const isSuccess = log.includes('SUCCESS') || log.includes('OK');
                const isHeader = log.includes('===') || log.includes('---') || log.includes('=== Stage');

                return (
                  <div
                    key={i}
                    style={{
                      color: isFail ? '#f87171' : isSuccess ? '#34d399' : isHeader ? '#38bdf8' : '#cbd5e1',
                      fontWeight: isFail || isSuccess ? 700 : 400
                    }}
                  >
                    {log}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
