import os
from playwright.sync_api import sync_playwright

IMAGES_DIR = r"c:\Users\SAI PRAVEEN\Downloads\devops lab\public\images"
IMAGES_DIR_LOCAL = r"c:\Users\SAI PRAVEEN\Downloads\devops lab\images"
os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR_LOCAL, exist_ok=True)

HTML_SHELL = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Jenkins [Jenkins]</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    background: #f8fafc;
    color: #1e293b;
    width: 1400px;
    height: 880px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  /* Jenkins Top Navigation Header */
  .jenkins-header {
    background: #1e293b;
    color: #fff;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 2px solid #0f172a;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  }
  .jenkins-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 800;
    font-size: 19px;
    letter-spacing: -0.02em;
  }
  .jenkins-logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 900;
    font-size: 16px;
    box-shadow: 0 2px 8px rgba(59,130,246,0.5);
  }
  .jenkins-search {
    background: #0f172a;
    border: 1px solid rgba(255,255,255,0.15);
    padding: 6px 16px;
    border-radius: 6px;
    color: #94a3b8;
    font-size: 13px;
    width: 280px;
  }
  .jenkins-user {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13.5px;
    font-weight: 600;
    color: #e2e8f0;
  }
  .user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #3b82f6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
  }

  /* Breadcrumb */
  .jenkins-breadcrumb {
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    padding: 10px 24px;
    font-size: 13.5px;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
  }
  .jenkins-breadcrumb a {
    color: #2563eb;
    text-decoration: none;
  }

  /* Main Workspace */
  .jenkins-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .jenkins-sidebar {
    width: 260px;
    background: #ffffff;
    border-right: 1px solid #e2e8f0;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #334155;
    cursor: pointer;
    text-decoration: none;
  }
  .sidebar-item:hover, .sidebar-item.active {
    background: #eff6ff;
    color: #2563eb;
  }
  .jenkins-content {
    flex: 1;
    padding: 28px 36px;
    overflow-y: auto;
    background: #f8fafc;
  }

  /* Visual Callout Badge Overlay */
  .guide-highlight {
    outline: 4px solid #e11d48 !important;
    outline-offset: 4px !important;
    box-shadow: 0 0 0 6px rgba(225, 29, 72, 0.25), 0 8px 24px rgba(225, 29, 72, 0.4) !important;
    position: relative !important;
  }
  .guide-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
    color: #ffffff;
    font-weight: 800;
    font-size: 13px;
    padding: 7px 16px;
    border-radius: 9999px;
    box-shadow: 0 8px 20px rgba(225, 29, 72, 0.45);
    border: 2px solid #ffffff;
    white-space: nowrap;
    position: absolute;
    z-index: 1000;
  }
  .guide-badge-green {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.45) !important;
  }
  .guide-badge-blue {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.45) !important;
  }
  .guide-badge-num {
    background: rgba(255,255,255,0.3);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
  }

  /* Console Output Box */
  .console-box {
    background: #0f172a;
    border-radius: 10px;
    padding: 20px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px;
    line-height: 1.6;
    color: #e2e8f0;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    overflow-x: auto;
  }
  .console-success-badge {
    background: #10b981;
    color: #fff;
    padding: 4px 12px;
    border-radius: 4px;
    font-weight: bold;
    display: inline-block;
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.6);
  }
  .console-fail-badge {
    background: #ef4444;
    color: #fff;
    padding: 4px 12px;
    border-radius: 4px;
    font-weight: bold;
    display: inline-block;
    box-shadow: 0 0 12px rgba(239, 68, 68, 0.6);
  }
  
  /* Stage View Matrix */
  .stage-view-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    margin-top: 20px;
  }
  .stage-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 14px;
  }
  .stage-table th {
    background: #f1f5f9;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: 700;
    color: #334155;
    text-align: center;
    border: 1px solid #e2e8f0;
  }
  .stage-cell {
    background: #ecfdf5;
    border: 1px solid #10b981;
    color: #065f46;
    text-align: center;
    padding: 20px 14px;
    font-weight: 700;
    font-size: 14px;
    box-shadow: inset 0 0 10px rgba(16,185,129,0.1);
  }
  .stage-duration {
    font-size: 12px;
    color: #047857;
    margin-top: 4px;
    font-family: 'JetBrains Mono', monospace;
  }
</style>
</head>
<body>
  <div class="jenkins-header">
    <div class="jenkins-brand">
      <div class="jenkins-logo-icon">J</div>
      <span>Jenkins</span>
    </div>
    <div class="jenkins-search">🔍 Search (Press '/' to focus)</div>
    <div class="jenkins-user">
      <div class="user-avatar">S</div>
      <span>sai</span>
      <span style="color:#64748b">•</span>
      <span style="color:#94a3b8; font-size:12px">log out</span>
    </div>
  </div>

  <div class="jenkins-breadcrumb">
    <a href="#">Dashboard</a>
    <span>&gt;</span>
    <span>{breadcrumb}</span>
  </div>

  <div class="jenkins-main">
    <div class="jenkins-sidebar">
      {sidebar}
    </div>
    <div class="jenkins-content">
      {content}
    </div>
  </div>
</body>
</html>
"""

def generate_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        page = browser.new_page(viewport={"width": 1400, "height": 880})

        def save_both(filename):
            p1 = os.path.join(IMAGES_DIR, filename)
            p2 = os.path.join(IMAGES_DIR_LOCAL, filename)
            page.screenshot(path=p1)
            page.screenshot(path=p2)
            print(f"Captured: {filename}")

        sidebar_clean_job = """
        <a href="#" class="sidebar-item active">📊 Status</a>
        <a href="#" class="sidebar-item">📝 Changes</a>
        <a href="#" class="sidebar-item">▶️ Build Now</a>
        <a href="#" class="sidebar-item">⚙️ Configure</a>
        <a href="#" class="sidebar-item">🗑️ Delete Project</a>
        """

        sidebar_build_highlight = """
        <a href="#" class="sidebar-item">📊 Status</a>
        <a href="#" class="sidebar-item">📝 Changes</a>
        <a href="#" class="sidebar-item guide-highlight" style="background:#eff6ff; color:#2563eb; position:relative;">
          ▶️ Build Now
          <div class="guide-badge" style="right:-150px; top:4px;">
            <span class="guide-badge-num">1</span>
            <span>Click Build Now</span>
          </div>
        </a>
        <a href="#" class="sidebar-item">⚙️ Configure</a>
        <a href="#" class="sidebar-item">🗑️ Delete Project</a>
        """

        sidebar_default = """
        <a href="#" class="sidebar-item active">📁 Dashboard</a>
        <a href="#" class="sidebar-item">➕ New Item</a>
        <a href="#" class="sidebar-item">👥 People</a>
        <a href="#" class="sidebar-item">📊 Build History</a>
        <a href="#" class="sidebar-item">⚙️ Manage Jenkins</a>
        """

        # 1. Lab 3 Step 1: New Item 03-python-app-ci
        content_l3_01 = """
        <div style="position:relative;">
          <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 24px;">Enter an item name</h2>
          <div style="margin-bottom: 24px;">
            <input type="text" value="03-python-app-ci" class="guide-highlight" style="width: 480px; padding: 10px 16px; font-size: 16px; border: 1px solid #cbd5e1; border-radius: 8px; font-family:'JetBrains Mono'; font-weight:700; color:#1e293b;" />
            <div class="guide-badge" style="top: -15px; left: 420px;">
              <span class="guide-badge-num">1</span>
              <span>Name: 03-python-app-ci</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; max-width: 680px;">
            <div class="guide-highlight" style="padding: 16px 20px; border: 2px solid #2563eb; background: #eff6ff; border-radius: 10px; display: flex; align-items: flex-start; gap: 14px; position:relative;">
              <div style="font-size: 28px;">📦</div>
              <div>
                <h3 style="font-size: 16px; font-weight: 800; color: #1e40af;">Freestyle project</h3>
                <p style="font-size: 13.5px; color: #475569; margin-top: 4px;">This is the central feature of Jenkins. Build projects that combine any SCM with any build system.</p>
              </div>
              <div class="guide-badge guide-badge-blue" style="top: 10px; right: -20px;">
                <span class="guide-badge-num">✓</span>
                <span>Selected</span>
              </div>
            </div>

            <div style="padding: 16px 20px; border: 1px solid #e2e8f0; background: #ffffff; border-radius: 10px; display: flex; align-items: flex-start; gap: 14px; opacity: 0.7;">
              <div style="font-size: 28px;">🔀</div>
              <div>
                <h3 style="font-size: 16px; font-weight: 800;">Pipeline</h3>
                <p style="font-size: 13.5px; color: #64748b; margin-top: 4px;">Orchestrates long-running activities that can span multiple build agents.</p>
              </div>
            </div>
          </div>

          <div style="margin-top: 28px; position: relative; width: fit-content;">
            <button class="guide-highlight" style="background: #2563eb; color: #fff; font-weight: 800; font-size: 15px; padding: 12px 36px; border: none; border-radius: 8px; cursor: pointer;">OK</button>
            <div class="guide-badge" style="top: -18px; left: 70px;">
              <span class="guide-badge-num">2</span>
              <span>Click OK</span>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "New Item").replace("{sidebar}", sidebar_default).replace("{content}", content_l3_01)
        page.set_content(html)
        save_both("lab3_01_new_item_python.png")

        # 2. Lab 3 Step 2: Build Steps Configuration
        content_l3_02 = """
        <div>
          <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 20px;">Configure — 03-python-app-ci</h2>
          <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; max-width: 900px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; display:flex; align-items:center; gap:8px;">
              <span>🔨 Build Steps</span>
              <span style="font-size:12px; font-weight:700; background:#dbeafe; color:#1d4ed8; padding:3px 10px; border-radius:9999px;">Step 1 of 1</span>
            </h3>

            <div style="border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
              <div style="background: #f1f5f9; padding: 10px 16px; font-weight: 700; font-size: 13.5px; border-bottom: 1px solid #cbd5e1; display:flex; justify-content:space-between;">
                <span>Execute Windows batch command (Python Test Suite)</span>
                <span style="color:#64748b; font-size:12px;">cmd.exe</span>
              </div>
              <textarea class="guide-highlight" style="width: 100%; height: 210px; padding: 14px 16px; font-family: 'JetBrains Mono', monospace; font-size: 13.5px; line-height: 1.55; border: none; background: #0f172a; color: #f8fafc; outline: none; font-weight: 500;">echo [STEP 1] Checking Python Runtime...
python --version

echo [STEP 2] Checking Syntax and Compilation...
python -m compileall "C:\\Users\\SAI PRAVEEN\\Downloads\\devops\\sample-app"

echo [STEP 3] Running Automated Unit Tests...
cd "C:\\Users\\SAI PRAVEEN\\Downloads\\devops\\sample-app"
python -m unittest test_app.py</textarea>
            </div>

            <div style="position: relative; width: fit-content; margin-top: 16px;">
              <button class="guide-highlight" style="background: #2563eb; color: #fff; font-weight: 800; font-size: 15px; padding: 10px 32px; border: none; border-radius: 8px; cursor: pointer;">Save</button>
              <div class="guide-badge" style="top: -18px; left: 80px;">
                <span class="guide-badge-num">3</span>
                <span>Click Save to Apply</span>
              </div>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "03-python-app-ci > Configure").replace("{sidebar}", sidebar_default).replace("{content}", content_l3_02)
        page.set_content(html)
        save_both("lab3_02_build_steps_python.png")

        # 3. Lab 3 Step 3: Job Page -> Click Build Now
        content_l3_03 = """
        <div>
          <h1 style="font-size: 26px; font-weight: 900; margin-bottom: 8px;">Project 03-python-app-ci</h1>
          <p style="color: #64748b; font-size: 14.5px; margin-bottom: 24px;">Automated Continuous Integration Project for Python unit testing.</p>

          <div style="display:flex; gap:24px;">
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:20px; width:340px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <h3 style="font-size:15px; font-weight:800; color:#334155; margin-bottom:12px;">Build History</h3>
              <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:#f8fafc; border-radius:6px; font-size:13px; font-weight:700;">
                <div style="width:12px; height:12px; border-radius:50%; background:#3b82f6; box-shadow:0 0 8px #3b82f6;"></div>
                <a href="#" style="color:#2563eb; text-decoration:none;">#1</a>
                <span style="color:#64748b; font-size:12px; margin-left:auto;">just now</span>
              </div>
            </div>

            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:20px; flex:1; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <h3 style="font-size:15px; font-weight:800; color:#334155; margin-bottom:12px;">Permalinks</h3>
              <ul style="font-size:13.5px; color:#475569; padding-left:20px; display:flex; flex-direction:column; gap:6px;">
                <li>Last build (<a href="#" style="color:#2563eb">#1</a>), just now</li>
                <li>Last stable build (<a href="#" style="color:#2563eb">#1</a>), just now</li>
                <li>Last successful build (<a href="#" style="color:#2563eb">#1</a>), just now</li>
              </ul>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "03-python-app-ci").replace("{sidebar}", sidebar_build_highlight).replace("{content}", content_l3_03)
        page.set_content(html)
        save_both("lab3_03_job_page_build_now.png")

        # 4. Lab 3 Step 4: Console Output Verification (Success)
        content_l3_04 = """
        <div>
          <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 16px;">Console Output — 03-python-app-ci #1</h2>
          <div class="console-box" style="position:relative;">
            <div style="color: #94a3b8; margin-bottom: 10px;">Started by user sai<br>Running as SYSTEM<br>Building in workspace C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\03-python-app-ci</div>
            <div style="color: #38bdf8; font-weight: 700;">[03-python-app-ci] $ cmd /c call C:\\Users\\TEMP\\jenkins123.bat</div>
            <div style="margin: 10px 0;">[STEP 1] Checking Python Runtime...<br><span style="color:#4ade80;">Python 3.11.4</span></div>
            <div style="margin: 10px 0;">[STEP 2] Checking Syntax and Compilation...<br>Listing 'sample-app'...<br>Compiling 'sample-app\\app.py'...<br>Compiling 'sample-app\\test_app.py'...</div>
            <div style="margin: 10px 0;">[STEP 3] Running Automated Unit Tests...<br>.....<br>----------------------------------------------------------------------<br><span style="color:#4ade80; font-weight:bold; font-size:15px;">Ran 5 tests in 0.002s</span><br><br><span style="color:#4ade80; font-weight:bold; font-size:16px;">OK</span></div>
            <div style="margin-top: 14px; position:relative; width:fit-content;">
              <span class="console-success-badge guide-highlight">Finished: SUCCESS</span>
              <div class="guide-badge guide-badge-green" style="top:-25px; left:160px;">
                <span class="guide-badge-num">✓</span>
                <span>Unit Tests Passed: Exit Code 0 = SUCCESS!</span>
              </div>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "03-python-app-ci > #1 > Console Output").replace("{sidebar}", sidebar_clean_job).replace("{content}", content_l3_04)
        page.set_content(html)
        save_both("lab3_04_console_output_success.png")

        # 5. Lab 4 Step 1: Bug Injected in Editor
        content_l4_01 = """
        <div style="background:#1e1e1e; border-radius:12px; padding:20px; box-shadow:0 8px 30px rgba(0,0,0,0.4); max-width:960px;">
          <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #333; padding-bottom:12px; margin-bottom:16px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="width:10px; height:10px; border-radius:50%; background:#ef4444"></div>
              <div style="width:10px; height:10px; border-radius:50%; background:#eab308"></div>
              <div style="width:10px; height:10px; border-radius:50%; background:#22c55e"></div>
              <span style="color:#cbd5e1; font-family:'JetBrains Mono'; font-size:13px; margin-left:12px;">sample-app/app.py — Code Editor</span>
            </div>
            <span style="color:#f87171; font-size:12px; font-weight:bold; background:rgba(239,68,68,0.2); padding:3px 10px; border-radius:4px;">MODIFIED (BUG INJECTED)</span>
          </div>

          <div style="font-family:'JetBrains Mono', monospace; font-size:14px; line-height:1.7; color:#f8fafc; position:relative;">
            <span style="color:#6b7280;">1 </span><span style="color:#f43f5e; font-weight:bold;">def</span> <span style="color:#60a5fa;">add</span>(a, b):<br>
            <div class="guide-highlight" style="display:inline-block; padding:4px 10px; background:rgba(244,63,94,0.15); border-radius:4px; margin:4px 0;">
              <span style="color:#6b7280;">2 </span>    <span style="color:#f43f5e; font-weight:bold;">return</span> a + b + <span style="color:#fbbf24; font-weight:bold;">999</span>  <span style="color:#ef4444; font-weight:bold;"># &lt;-- DELIBERATE MATH BUG INTRODUCED!</span>
            </div>
            <div class="guide-badge" style="top:18px; left:480px;">
              <span class="guide-badge-num">1</span>
              <span>Developer commits math bug (+ 999)</span>
            </div>
            <br>
            <span style="color:#6b7280;">3 </span><span style="color:#f43f5e; font-weight:bold;">def</span> <span style="color:#60a5fa;">subtract</span>(a, b): <span style="color:#f43f5e; font-weight:bold;">return</span> a - b<br>
            <span style="color:#6b7280;">4 </span><span style="color:#f43f5e; font-weight:bold;">def</span> <span style="color:#60a5fa;">multiply</span>(a, b): <span style="color:#f43f5e; font-weight:bold;">return</span> a * b<br>
            <span style="color:#6b7280;">5 </span><span style="color:#f43f5e; font-weight:bold;">def</span> <span style="color:#60a5fa;">divide</span>(a, b):<br>
            <span style="color:#6b7280;">6 </span>    <span style="color:#f43f5e; font-weight:bold;">if</span> b == <span style="color:#fbbf24;">0</span>: <span style="color:#f43f5e; font-weight:bold;">raise</span> <span style="color:#f472b6;">ValueError</span>(<span style="color:#a78bfa;">"Cannot divide by zero"</span>)<br>
            <span style="color:#6b7280;">7 </span>    <span style="color:#f43f5e; font-weight:bold;">return</span> a / b
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "sample-app > app.py").replace("{sidebar}", sidebar_default).replace("{content}", content_l4_01)
        page.set_content(html)
        save_both("lab4_01_bug_injected_editor.png")

        # 6. Lab 4 Step 4: Build History Failure (Red Ball)
        content_l4_02 = """
        <div>
          <h1 style="font-size: 26px; font-weight: 900; margin-bottom: 8px;">Project 03-python-app-ci</h1>
          <p style="color: #64748b; font-size: 14.5px; margin-bottom: 24px;">Automated Continuous Integration Project for Python unit testing.</p>

          <div style="display:flex; gap:24px;">
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:20px; width:360px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <h3 style="font-size:15px; font-weight:800; color:#334155; margin-bottom:12px;">Build History</h3>
              <div style="display:flex; flex-direction:column; gap:10px;">
                <div class="guide-highlight" style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:#fef2f2; border-radius:8px; border:1px solid #fecaca; position:relative;">
                  <div style="width:14px; height:14px; border-radius:50%; background:#ef4444; box-shadow:0 0 10px #ef4444;"></div>
                  <a href="#" style="color:#dc2626; font-weight:800; text-decoration:none; font-size:14px;">#2</a>
                  <span style="color:#991b1b; font-size:12px; font-weight:bold;">FAILED</span>
                  <span style="color:#64748b; font-size:12px; margin-left:auto;">just now</span>
                  <div class="guide-badge" style="right:-190px; top:2px;">
                    <span class="guide-badge-num">!</span>
                    <span>Build #2 Turns RED (FAILURE!)</span>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:#f8fafc; border-radius:6px; font-size:13px; font-weight:700;">
                  <div style="width:12px; height:12px; border-radius:50%; background:#3b82f6;"></div>
                  <a href="#" style="color:#2563eb; text-decoration:none;">#1</a>
                  <span style="color:#16a34a; font-size:12px; font-weight:bold;">SUCCESS</span>
                  <span style="color:#64748b; font-size:12px; margin-left:auto;">10 mins ago</span>
                </div>
              </div>
            </div>

            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:20px; flex:1; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <div style="padding:16px; background:#fff1f2; border:1px solid #fecdd3; border-radius:8px;">
                <h4 style="font-size:15px; font-weight:800; color:#be123c; margin-bottom:6px;">⚠️ Pipeline Broken: Code Regression Detected</h4>
                <p style="font-size:13.5px; color:#4c0519; line-height:1.5;">Jenkins automated unit test suite failed on build #2. Defective build blocked from staging and production deployment.</p>
              </div>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "03-python-app-ci").replace("{sidebar}", sidebar_clean_job).replace("{content}", content_l4_02)
        page.set_content(html)
        save_both("lab4_02_build_history_failure_red.png")

        # 7. Lab 4 Step 5: Console Failure Logs
        content_l4_03 = """
        <div>
          <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 16px;">Console Output — 03-python-app-ci #2 (FAIL)</h2>
          <div class="console-box" style="position:relative;">
            <div style="color: #94a3b8; margin-bottom: 10px;">Started by user sai<br>Building in workspace C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\03-python-app-ci</div>
            <div style="margin: 10px 0;">[STEP 3] Running Automated Unit Tests...<br>
              <div class="guide-highlight" style="background:rgba(239,68,68,0.15); border:1px solid #ef4444; border-radius:6px; padding:12px; margin:8px 0; color:#fca5a5;">
                <span style="color:#ef4444; font-weight:bold; font-size:15px;">FAIL: test_add (test_app.TestApp)</span><br>
                ----------------------------------------------------------------------<br>
                Traceback (most recent call last):<br>
                &nbsp;&nbsp;File "test_app.py", line 6, in test_add<br>
                &nbsp;&nbsp;&nbsp;&nbsp;self.assertEqual(add(2, 3), 5)<br>
                <span style="color:#fff; font-weight:bold; background:#b91c1c; padding:2px 6px; border-radius:3px;">AssertionError: 1004 != 5</span><br>
                ----------------------------------------------------------------------<br>
                Ran 5 tests in 0.001s<br><br>
                <span style="color:#f87171; font-weight:bold; font-size:16px;">FAILED (failures=1)</span>
              </div>
              <div class="guide-badge" style="top:70px; right:40px;">
                <span class="guide-badge-num">!</span>
                <span>Unit Test Caught Math Bug: 1004 != 5</span>
              </div>
            </div>
            <div style="color:#ef4444; margin-top:10px;">Build step 'Execute Windows batch command' marked build as failure</div>
            <div style="margin-top: 14px; position:relative; width:fit-content;">
              <span class="console-fail-badge guide-highlight">Finished: FAILURE</span>
              <div class="guide-badge" style="top:-25px; left:160px;">
                <span class="guide-badge-num">❌</span>
                <span>Non-Zero Exit Code: Build Aborted</span>
              </div>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "03-python-app-ci > #2 > Console Output").replace("{sidebar}", sidebar_clean_job).replace("{content}", content_l4_03)
        page.set_content(html)
        save_both("lab4_03_console_output_failure.png")

        # 8. Lab 4 Step 7: Build History Recovery (Blue Ball #3)
        content_l4_04 = """
        <div>
          <h1 style="font-size: 26px; font-weight: 900; margin-bottom: 8px;">Project 03-python-app-ci</h1>
          <p style="color: #64748b; font-size: 14.5px; margin-bottom: 24px;">Bug Reverted to 'return a + b' — Build Re-executed Successfully.</p>

          <div style="display:flex; gap:24px;">
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:20px; width:360px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <h3 style="font-size:15px; font-weight:800; color:#334155; margin-bottom:12px;">Build History</h3>
              <div style="display:flex; flex-direction:column; gap:10px;">
                <div class="guide-highlight" style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:#eff6ff; border-radius:8px; border:1px solid #bfdbfe; position:relative;">
                  <div style="width:14px; height:14px; border-radius:50%; background:#3b82f6; box-shadow:0 0 10px #3b82f6;"></div>
                  <a href="#" style="color:#1d4ed8; font-weight:800; text-decoration:none; font-size:14px;">#3</a>
                  <span style="color:#15803d; font-size:12px; font-weight:bold;">SUCCESS</span>
                  <span style="color:#64748b; font-size:12px; margin-left:auto;">just now</span>
                  <div class="guide-badge guide-badge-green" style="right:-200px; top:2px;">
                    <span class="guide-badge-num">✓</span>
                    <span>Build #3 Recovered: SOLID BLUE!</span>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:#fef2f2; border-radius:6px; font-size:13px; font-weight:700;">
                  <div style="width:12px; height:12px; border-radius:50%; background:#ef4444;"></div>
                  <a href="#" style="color:#dc2626; text-decoration:none;">#2</a>
                  <span style="color:#b91c1c; font-size:12px; font-weight:bold;">FAILED</span>
                  <span style="color:#64748b; font-size:12px; margin-left:auto;">5 mins ago</span>
                </div>

                <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:#f8fafc; border-radius:6px; font-size:13px; font-weight:700;">
                  <div style="width:12px; height:12px; border-radius:50%; background:#3b82f6;"></div>
                  <a href="#" style="color:#2563eb; text-decoration:none;">#1</a>
                  <span style="color:#15803d; font-size:12px; font-weight:bold;">SUCCESS</span>
                  <span style="color:#64748b; font-size:12px; margin-left:auto;">15 mins ago</span>
                </div>
              </div>
            </div>

            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:20px; flex:1; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <div style="padding:16px; background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px;">
                <h4 style="font-size:15px; font-weight:800; color:#065f46; margin-bottom:6px;">🎉 CI Verification Passed: Regression Cleared</h4>
                <p style="font-size:13.5px; color:#064e3b; line-height:1.5;">Code reverted to 'return a + b'. All 5 unit tests passed cleanly. System is ready for safe release.</p>
              </div>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "03-python-app-ci").replace("{sidebar}", sidebar_clean_job).replace("{content}", content_l4_04)
        page.set_content(html)
        save_both("lab4_04_build_history_recovery_blue.png")

        # 9. Lab 5 Step 1: New Item -> Pipeline
        content_l5_01 = """
        <div style="position:relative;">
          <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 24px;">Enter an item name</h2>
          <div style="margin-bottom: 24px;">
            <input type="text" value="04-declarative-pipeline" class="guide-highlight" style="width: 480px; padding: 10px 16px; font-size: 16px; border: 1px solid #cbd5e1; border-radius: 8px; font-family:'JetBrains Mono'; font-weight:700; color:#1e293b;" />
            <div class="guide-badge" style="top: -15px; left: 420px;">
              <span class="guide-badge-num">1</span>
              <span>Name: 04-declarative-pipeline</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; max-width: 680px;">
            <div style="padding: 16px 20px; border: 1px solid #e2e8f0; background: #ffffff; border-radius: 10px; display: flex; align-items: flex-start; gap: 14px; opacity: 0.7;">
              <div style="font-size: 28px;">📦</div>
              <div>
                <h3 style="font-size: 16px; font-weight: 800;">Freestyle project</h3>
              </div>
            </div>

            <div class="guide-highlight" style="padding: 16px 20px; border: 2px solid #10b981; background: #ecfdf5; border-radius: 10px; display: flex; align-items: flex-start; gap: 14px; position:relative;">
              <div style="font-size: 28px;">🔀</div>
              <div>
                <h3 style="font-size: 16px; font-weight: 800; color: #065f46;">Pipeline (Select this!)</h3>
                <p style="font-size: 13.5px; color: #047857; margin-top: 4px;">Orchestrates long-running activities that can span multiple build agents. Suitable for building pipelines as code.</p>
              </div>
              <div class="guide-badge guide-badge-green" style="top: 10px; right: -20px;">
                <span class="guide-badge-num">✓</span>
                <span>Select 'Pipeline'</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 28px; position: relative; width: fit-content;">
            <button class="guide-highlight" style="background: #2563eb; color: #fff; font-weight: 800; font-size: 15px; padding: 12px 36px; border: none; border-radius: 8px; cursor: pointer;">OK</button>
            <div class="guide-badge" style="top: -18px; left: 70px;">
              <span class="guide-badge-num">2</span>
              <span>Click OK</span>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "New Item").replace("{sidebar}", sidebar_default).replace("{content}", content_l5_01)
        page.set_content(html)
        save_both("lab5_01_new_item_pipeline.png")

        # 10. Lab 5 Step 4: Pipeline Script Editor
        content_l5_02 = """
        <div>
          <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 20px;">Configure — 04-declarative-pipeline</h2>
          <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; max-width: 960px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
            <h3 style="font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 14px;">Pipeline Definition</h3>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 13px; font-weight: 700; color: #475569; display:block; margin-bottom:6px;">Definition</label>
              <select class="guide-highlight" style="padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-weight: 700; font-size: 14px;">
                <option selected>Pipeline script</option>
                <option>Pipeline script from SCM</option>
              </select>
            </div>

            <div style="border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
              <div style="background: #f1f5f9; padding: 10px 16px; font-weight: 700; font-size: 13px; border-bottom: 1px solid #cbd5e1;">
                <span>Script (Declarative Jenkinsfile)</span>
              </div>
              <textarea class="guide-highlight" style="width: 100%; height: 260px; padding: 14px 16px; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.5; border: none; background: #0f172a; color: #f8fafc; outline: none;">pipeline {
    agent any
    stages {
        stage('Environment Check') {
            steps { echo '=== Stage 1: Inspecting Runtime Environment ===' }
        }
        stage('Code Compilation') {
            steps { echo '=== Stage 2: Compiling Python Bytecode ===' }
        }
        stage('Automated Tests') {
            steps { echo '=== Stage 3: Executing Unit Test Suite ===' }
        }
        stage('Simulated Deployment') {
            steps { echo '=== Stage 4: Deploying to Staging Environment ===' }
        }
    }
    post {
        success { echo 'PIPELINE SUCCESS: All stages completed!' }
    }
}</textarea>
            </div>

            <div style="position: relative; width: fit-content;">
              <button class="guide-highlight" style="background: #2563eb; color: #fff; font-weight: 800; font-size: 15px; padding: 10px 32px; border: none; border-radius: 8px; cursor: pointer;">Save</button>
              <div class="guide-badge" style="top: -18px; left: 80px;">
                <span class="guide-badge-num">5</span>
                <span>Click Save to Store Pipeline</span>
              </div>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "04-declarative-pipeline > Configure").replace("{sidebar}", sidebar_default).replace("{content}", content_l5_02)
        page.set_content(html)
        save_both("lab5_02_pipeline_script_editor.png")

        # 11. Lab 5 Step 7: Graphical Stage View (4 Green Columns)
        content_l5_03 = """
        <div>
          <h1 style="font-size: 26px; font-weight: 900; margin-bottom: 8px;">Pipeline 04-declarative-pipeline</h1>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Continuous Delivery Declarative Pipeline as Code.</p>

          <div class="stage-view-card guide-highlight" style="position:relative;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
              <h3 style="font-size:17px; font-weight:800; color:#1e293b;">Stage View</h3>
              <span style="font-size:12px; font-weight:700; color:#10b981; background:#ecfdf5; border:1px solid #10b981; padding:4px 10px; border-radius:9999px;">Build #1 Completed Successfully</span>
            </div>

            <table class="stage-table">
              <thead>
                <tr>
                  <th style="width:100px;">Build</th>
                  <th>Environment Check</th>
                  <th>Code Compilation</th>
                  <th>Automated Tests</th>
                  <th>Simulated Deployment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:16px; font-weight:bold; font-size:14px; text-align:center; border:1px solid #e2e8f0; background:#f8fafc;">
                    <a href="#" style="color:#2563eb;">#1</a><br>
                    <span style="font-size:11px; color:#64748b;">12s total</span>
                  </td>
                  <td class="stage-cell">
                    <div>✓ SUCCESS</div>
                    <div class="stage-duration">1s</div>
                  </td>
                  <td class="stage-cell">
                    <div>✓ SUCCESS</div>
                    <div class="stage-duration">2s</div>
                  </td>
                  <td class="stage-cell">
                    <div>✓ SUCCESS</div>
                    <div class="stage-duration">3s</div>
                  </td>
                  <td class="stage-cell">
                    <div>✓ SUCCESS</div>
                    <div class="stage-duration">1s</div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="guide-badge guide-badge-green" style="top:-18px; right:40px;">
              <span class="guide-badge-num">7</span>
              <span>4 Green Graphical Stage Columns with Execution Times!</span>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "04-declarative-pipeline").replace("{sidebar}", sidebar_clean_job).replace("{content}", content_l5_03)
        page.set_content(html)
        save_both("lab5_03_stage_view_green.png")

        # 12. Lab 5 Step 8: Stage View Log Modal
        content_l5_04 = """
        <div>
          <h1 style="font-size: 26px; font-weight: 900; margin-bottom: 8px;">Pipeline 04-declarative-pipeline</h1>
          
          <div style="background:#fff; border:1px solid #cbd5e1; border-radius:12px; padding:24px; max-width:980px; box-shadow:0 12px 36px rgba(0,0,0,0.12); position:relative;">
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #e2e8f0; padding-bottom:14px; margin-bottom:16px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="background:#10b981; color:#fff; font-weight:bold; font-size:12px; padding:3px 8px; border-radius:4px;">STAGE LOGS</span>
                <h3 style="font-size:17px; font-weight:800; color:#1e293b;">Stage: Automated Tests (#1)</h3>
              </div>
              <span style="font-size:13px; color:#64748b; font-family:'JetBrains Mono';">Duration: 3s</span>
            </div>

            <div class="console-box guide-highlight" style="position:relative;">
              <div style="color:#38bdf8; font-weight:bold;">[Pipeline] { (Automated Tests)</div>
              <div>[Pipeline] echo<br>=== Stage 3: Executing Unit Test Suite ===</div>
              <div>[Pipeline] sh<br>+ python -m unittest discover sample-app</div>
              <div style="color:#4ade80; margin:10px 0;">.....<br>----------------------------------------------------------------------<br>Ran 5 tests in 0.002s<br><br>OK</div>
              <div style="color:#38bdf8; font-weight:bold;">[Pipeline] } // stage</div>
              <div style="color:#10b981; font-weight:bold; margin-top:8px;">[Pipeline] Post stage validation: PASSED</div>

              <div class="guide-badge guide-badge-blue" style="top:-18px; right:40px;">
                <span class="guide-badge-num">8</span>
                <span>Stage-Specific Isolated Command Logs</span>
              </div>
            </div>
          </div>
        </div>
        """
        html = HTML_SHELL.replace("{breadcrumb}", "04-declarative-pipeline > Stage Logs").replace("{sidebar}", sidebar_clean_job).replace("{content}", content_l5_04)
        page.set_content(html)
        save_both("lab5_04_stage_logs_inspection.png")

        browser.close()
        print("ALL LAB 3, LAB 4, AND LAB 5 SCREENSHOTS GENERATED CLEANLY!")

if __name__ == "__main__":
    generate_screenshots()
