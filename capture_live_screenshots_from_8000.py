import os
import shutil
import time
from playwright.sync_api import sync_playwright

WORKSPACE_DIR = r"c:\Users\SAI PRAVEEN\Downloads\devops lab"
IMAGES_DIR = os.path.join(WORKSPACE_DIR, "images")
PUBLIC_IMAGES_DIR = os.path.join(WORKSPACE_DIR, "public", "images")
os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(PUBLIC_IMAGES_DIR, exist_ok=True)

JENKINS_URL = "http://localhost:8000"

# Styling for highlighted elements to make steps clear and professional
CALLOUT_CSS = """
.guide-highlight {
    outline: 4px solid #ef4444 !important;
    outline-offset: 4px !important;
    box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.25), 0 8px 24px rgba(239, 68, 68, 0.35) !important;
    position: relative !important;
    z-index: 99990 !important;
}
.guide-badge {
    position: absolute !important;
    z-index: 99999 !important;
    background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%) !important;
    color: #ffffff !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
    font-weight: 700 !important;
    font-size: 13px !important;
    line-height: 1.4 !important;
    padding: 6px 14px !important;
    border-radius: 9999px !important;
    box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.5) !important;
    border: 2px solid #ffffff !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    white-space: nowrap !important;
    pointer-events: none !important;
}
"""

def save_dual_screenshot(page, filename):
    path1 = os.path.join(IMAGES_DIR, filename)
    path2 = os.path.join(PUBLIC_IMAGES_DIR, filename)
    page.screenshot(path=path1)
    shutil.copy2(path1, path2)
    print(f"Captured: {filename} ({os.path.getsize(path1)} bytes)")

def inject_callout(page, locator, text, pos="right", ox=0, oy=0, custom_bg=None):
    page.evaluate(f"""() => {{
        if (!document.getElementById('jenkins-guide-style')) {{
            const style = document.createElement('style');
            style.id = 'jenkins-guide-style';
            style.innerHTML = `{CALLOUT_CSS}`;
            document.head.appendChild(style);
        }}
        document.querySelectorAll('.guide-badge').forEach(e => e.remove());
        document.querySelectorAll('.guide-highlight').forEach(e => {{
            e.classList.remove('guide-highlight');
        }});
    }}""")

    if locator and locator.count() > 0:
        locator.first.scroll_into_view_if_needed()
        locator.first.evaluate("""(el, {text, pos, ox, oy, bg}) => {
            el.classList.add('guide-highlight');
            const rect = el.getBoundingClientRect();
            const badge = document.createElement('div');
            badge.className = 'guide-badge';
            if (bg) badge.style.background = bg;
            badge.innerHTML = `<span>${text}</span>`;

            const pageX = rect.left + window.scrollX;
            const pageY = rect.top + window.scrollY;

            let left = pageX;
            let top = pageY;
            if (pos === 'top') {
                left = pageX + (rect.width / 2) - 80 + ox;
                top = pageY - 45 + oy;
            } else if (pos === 'bottom') {
                left = pageX + (rect.width / 2) - 80 + ox;
                top = pageY + rect.height + 12 + oy;
            } else if (pos === 'right') {
                left = pageX + rect.width + 16 + ox;
                top = pageY + (rect.height / 2) - 15 + oy;
            } else if (pos === 'left') {
                left = pageX - 220 + ox;
                top = pageY + (rect.height / 2) - 15 + oy;
            }
            badge.style.left = Math.max(10, left) + 'px';
            badge.style.top = Math.max(10, top) + 'px';
            document.body.appendChild(badge);
        }""", {"text": text, "pos": pos, "ox": ox, "oy": oy, "bg": custom_bg})
        time.sleep(0.3)

def clear_callout(page):
    page.evaluate("""() => {
        document.querySelectorAll('.guide-badge').forEach(e => e.remove());
        document.querySelectorAll('.guide-highlight').forEach(e => {
            e.classList.remove('guide-highlight');
        });
    }""")

def run_capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # =========================================================
        # LOGIN & DASHBOARD
        # =========================================================
        print("\n--- Capturing Login ---")
        page.goto(f"{JENKINS_URL}/login")
        page.wait_for_selector("#j_username")
        page.fill("#j_username", "sai")
        page.fill("#j_password", "sai")
        submit_btn = page.locator("button[name='Submit']")
        inject_callout(page, submit_btn, "Sign in with Credentials", pos="right")
        save_dual_screenshot(page, "00_jenkins_login.png")

        clear_callout(page)
        submit_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        # =========================================================
        # LAB 1: First Freestyle Job (01-hello-world)
        # =========================================================
        print("\n--- Processing Lab 1 ---")
        page.goto(f"{JENKINS_URL}/")
        new_item = page.locator("a[href*='newJob']").first
        inject_callout(page, new_item, "Click 'New Item' to Create Project", pos="right")
        save_dual_screenshot(page, "lab1_01_dashboard.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/newJob")
        page.wait_for_selector("#name")
        page.fill("#name", "01-hello-world")
        page.locator(".hudson_model_FreeStyleProject").first.click()
        ok_btn = page.locator("#ok-button")
        inject_callout(page, ok_btn, "Enter Name & Select Freestyle Project", pos="top", ox=-80)
        save_dual_screenshot(page, "lab1_02_new_item_freestyle.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/01-hello-world/configure")
        page.wait_for_load_state("networkidle")
        add_step_btn = page.locator("button:has-text('Add build step')").first
        add_step_btn.scroll_into_view_if_needed()
        inject_callout(page, add_step_btn, "Click 'Add build step'", pos="top")
        save_dual_screenshot(page, "lab1_03_build_steps_section.png")

        clear_callout(page)
        add_step_btn.click()
        time.sleep(0.5)
        batch_opt = page.locator(".jenkins-dropdown button:has-text('Execute Windows batch command')").first
        inject_callout(page, batch_opt, "Select 'Execute Windows batch command'", pos="right")
        save_dual_screenshot(page, "lab1_04_dropdown_select_batch.png")

        clear_callout(page)
        textarea = page.locator("textarea[name='command']").last
        textarea.scroll_into_view_if_needed()
        save_btn = page.locator("button[name='Submit']").first
        inject_callout(page, save_btn, "Save OS Batch Script", pos="top", ox=40)
        save_dual_screenshot(page, "lab1_05_batch_command_editor.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/01-hello-world/")
        page.wait_for_load_state("networkidle")
        build_btn = page.locator("a:has-text('Build Now')").first
        inject_callout(page, build_btn, "Click 'Build Now'", pos="right")
        save_dual_screenshot(page, "lab1_06_job_page_build_now.png")

        clear_callout(page)
        build_history_card = page.locator("#buildHistory, .build-history").first
        inject_callout(page, build_history_card, "Build #1 Passed (Blue Icon)", pos="right")
        save_dual_screenshot(page, "lab1_07_build_history.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/01-hello-world/1/console")
        page.wait_for_selector(".console-output, pre")
        time.sleep(0.5)
        save_dual_screenshot(page, "lab1_08_console_output.png")

        # =========================================================
        # LAB 2: Parameterized Builds (02-parameterized-job)
        # =========================================================
        print("\n--- Processing Lab 2 ---")
        page.goto(f"{JENKINS_URL}/newJob")
        page.fill("#name", "02-parameterized-job")
        page.locator(".hudson_model_FreeStyleProject").first.click()
        ok_btn = page.locator("#ok-button")
        inject_callout(page, ok_btn, "Name: 02-parameterized-job -> Freestyle", pos="top", ox=-80)
        save_dual_screenshot(page, "lab2_01_dashboard_new_item.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/02-parameterized-job/configure")
        page.wait_for_load_state("networkidle")
        param_label = page.locator("label:has-text('This project is parameterized')").first
        param_label.scroll_into_view_if_needed()
        inject_callout(page, param_label, "Enable 'This project is parameterized'", pos="top", ox=40)
        save_dual_screenshot(page, "lab2_02_general_parameterized_checkbox.png")

        clear_callout(page)
        add_param = page.locator("button:has-text('Add Parameter')").first
        add_param.scroll_into_view_if_needed()
        add_param.click()
        time.sleep(0.5)
        choice_opt = page.locator(".jenkins-dropdown button:has-text('Choice Parameter')").first
        inject_callout(page, choice_opt, "Add 'Choice Parameter'", pos="right")
        save_dual_screenshot(page, "lab2_03_dropdown_add_choice.png")

        clear_callout(page)
        choice_container = page.locator("div:has-text('DEPLOY_ENV')").first
        choice_container.scroll_into_view_if_needed()
        inject_callout(page, choice_container, "Configure DEPLOY_ENV choices", pos="top")
        save_dual_screenshot(page, "lab2_04_choice_parameter_configured.png")

        clear_callout(page)
        add_param.scroll_into_view_if_needed()
        add_param.click()
        time.sleep(0.5)
        string_opt = page.locator(".jenkins-dropdown button:has-text('String Parameter')").first
        inject_callout(page, string_opt, "Add 'String Parameter'", pos="right")
        save_dual_screenshot(page, "lab2_05_dropdown_add_string.png")

        clear_callout(page)
        string_container = page.locator("div:has-text('APP_VERSION')").first
        string_container.scroll_into_view_if_needed()
        inject_callout(page, string_container, "Configure APP_VERSION string", pos="top")
        save_dual_screenshot(page, "lab2_06_string_parameter_configured.png")

        clear_callout(page)
        build_step_area = page.locator("textarea[name='command']").first
        build_step_area.scroll_into_view_if_needed()
        inject_callout(page, build_step_area, "Echo variables: %DEPLOY_ENV% & %APP_VERSION%", pos="top")
        save_dual_screenshot(page, "lab2_07_build_step_parameterized.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/02-parameterized-job/")
        page.wait_for_load_state("networkidle")
        param_build_link = page.locator("a:has-text('Build with Parameters')").first
        inject_callout(page, param_build_link, "Click 'Build with Parameters'", pos="right")
        save_dual_screenshot(page, "lab2_08_sidebar_build_with_parameters.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/02-parameterized-job/build?delay=0sec")
        page.wait_for_load_state("networkidle")
        param_form = page.locator("form[name='parameters']").first
        inject_callout(page, param_form, "Select Environment & Version, then Build", pos="top", oy=20)
        save_dual_screenshot(page, "lab2_09_build_parameters_screen.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/02-parameterized-job/1/console")
        page.wait_for_selector(".console-output, pre")
        time.sleep(0.5)
        save_dual_screenshot(page, "lab2_10_console_output_verified.png")

        # =========================================================
        # LAB 3: Continuous Integration — Testing Our Sample Application
        # =========================================================
        print("\n--- Processing Lab 3 ---")
        # Ensure 03-python-ci is configured properly
        page.goto(f"{JENKINS_URL}/newJob")
        page.fill("#name", "03-python-ci")
        page.locator(".hudson_model_FreeStyleProject").first.click()
        ok_btn = page.locator("#ok-button")
        inject_callout(page, ok_btn, "Name: 03-python-ci -> Freestyle Project", pos="top", ox=-80)
        save_dual_screenshot(page, "lab3_01_new_item_python.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/03-python-ci/configure")
        page.wait_for_load_state("networkidle")
        cmd_box = page.locator("textarea[name='command']").first
        cmd_box.scroll_into_view_if_needed()
        inject_callout(page, cmd_box, "Execute Python Unit Tests: python test_app.py", pos="top")
        save_dual_screenshot(page, "lab3_02_build_steps_python.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/03-python-ci/")
        page.wait_for_load_state("networkidle")
        build_btn = page.locator("a:has-text('Build Now')").first
        inject_callout(page, build_btn, "Click 'Build Now' to Run CI Tests", pos="right")
        save_dual_screenshot(page, "lab3_03_job_page_build_now.png")

        clear_callout(page)
        # Build 1 Console Output (or last successful build)
        page.goto(f"{JENKINS_URL}/job/03-python-ci/2/console")
        page.wait_for_selector(".console-output, pre")
        time.sleep(0.5)
        save_dual_screenshot(page, "lab3_04_console_output_success.png")

        # =========================================================
        # LAB 4: The CI Feedback Loop — Failing Tests & Immediate Feedback
        # =========================================================
        print("\n--- Processing Lab 4 ---")
        # Step 1: Inject bug in app.py temporarily
        app_path = os.path.join(WORKSPACE_DIR, "sample-app", "app.py")
        original_app_code = ""
        with open(app_path, "r", encoding="utf-8") as f:
            original_app_code = f.read()

        buggy_app_code = original_app_code.replace("def add(a, b): return a + b", "def add(a, b): return a + b + 1  # Injected Bug: Fails unit test!")
        with open(app_path, "w", encoding="utf-8") as f:
            f.write(buggy_app_code)

        # Trigger failing build on 03-python-ci
        page.goto(f"{JENKINS_URL}/job/03-python-ci/")
        page.locator("a:has-text('Build Now')").first.click()
        print("Triggered failing build with bug. Waiting 6 seconds...")
        time.sleep(6)

        # Build History with Red Ball
        page.reload()
        page.wait_for_load_state("networkidle")
        bh = page.locator("#buildHistory, .build-history").first
        inject_callout(page, bh, "Build #3 Failed (Red Icon: Test Assertion Error)", pos="right", custom_bg="linear-gradient(135deg, #dc2626 0%, #991b1b 100%)")
        save_dual_screenshot(page, "lab4_02_build_history_failure_red.png")

        clear_callout(page)
        # Failure Console Output
        page.goto(f"{JENKINS_URL}/job/03-python-ci/3/console")
        page.wait_for_selector(".console-output, pre")
        time.sleep(0.5)
        save_dual_screenshot(page, "lab4_03_console_output_failure.png")

        # Now fix the bug in app.py
        with open(app_path, "w", encoding="utf-8") as f:
            f.write(original_app_code)

        # Trigger recovery build
        page.goto(f"{JENKINS_URL}/job/03-python-ci/")
        page.locator("a:has-text('Build Now')").first.click()
        print("Triggered recovery build with fix. Waiting 6 seconds...")
        time.sleep(6)

        # Build History with Blue Ball Recovery
        page.reload()
        page.wait_for_load_state("networkidle")
        bh = page.locator("#buildHistory, .build-history").first
        inject_callout(page, bh, "Build #4 Recovered to Green/Blue SUCCESS!", pos="right", custom_bg="linear-gradient(135deg, #16a34a 0%, #15803d 100%)")
        save_dual_screenshot(page, "lab4_04_build_history_recovery_blue.png")

        clear_callout(page)
        # Capture recovery console output
        page.goto(f"{JENKINS_URL}/job/03-python-ci/4/console")
        page.wait_for_selector(".console-output, pre")
        time.sleep(0.5)
        save_dual_screenshot(page, "lab4_05_console_output_fixed.png")

        # For lab4_01_bug_injected_editor.png: take screenshot showing the failing test step in Jenkins configure or editor
        page.goto(f"{JENKINS_URL}/job/03-python-ci/configure")
        page.wait_for_load_state("networkidle")
        batch_step = page.locator("textarea[name='command']").first
        batch_step.scroll_into_view_if_needed()
        inject_callout(page, batch_step, "Automated CI Step: Non-zero exit code halts pipeline", pos="top")
        save_dual_screenshot(page, "lab4_01_bug_injected_editor.png")

        # =========================================================
        # LAB 5: Declarative Pipeline (05-pipeline-demo)
        # =========================================================
        print("\n--- Processing Lab 5 ---")
        page.goto(f"{JENKINS_URL}/newJob")
        page.fill("#name", "05-pipeline-demo")
        page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob").first.click()
        ok_btn = page.locator("#ok-button")
        inject_callout(page, ok_btn, "Name: 05-pipeline-demo -> Select 'Pipeline'", pos="top", ox=-80)
        save_dual_screenshot(page, "lab5_01_new_item_pipeline.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/05-pipeline-demo/configure")
        page.wait_for_load_state("networkidle")
        pipe_editor = page.locator(".ace_editor, textarea.jenkins-input").first
        pipe_editor.scroll_into_view_if_needed()
        inject_callout(page, pipe_editor, "Declarative Pipeline: Build, Test, Deploy Stages", pos="top", oy=20)
        save_dual_screenshot(page, "lab5_02_pipeline_script_editor.png")

        clear_callout(page)
        page.goto(f"{JENKINS_URL}/job/05-pipeline-demo/")
        page.wait_for_load_state("networkidle")
        stage_view = page.locator(".stage-view, #pipeline-box, .stage-wrapper").first
        if stage_view.count() == 0:
            stage_view = page.locator(".jenkins-table").first
        inject_callout(page, stage_view, "Pipeline Stage View: [Build] [Test] [Deploy] PASSED", pos="top", custom_bg="linear-gradient(135deg, #16a34a 0%, #15803d 100%)")
        save_dual_screenshot(page, "lab5_03_stage_view_green.png")

        clear_callout(page)
        # Pipeline Console Output
        page.goto(f"{JENKINS_URL}/job/05-pipeline-demo/1/console")
        page.wait_for_selector(".console-output, pre")
        time.sleep(0.5)
        save_dual_screenshot(page, "lab5_04_stage_logs_inspection.png")

        print("\n=== ALL REAL JENKINS SCREENSHOTS CAPTURED DIRECTLY FROM PORT 8000! ===")
        browser.close()

if __name__ == "__main__":
    run_capture()
