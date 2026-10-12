import os
import time
from playwright.sync_api import sync_playwright

IMAGES_DIR = r"C:\Users\SAI PRAVEEN\Downloads\devops lab\images"
os.makedirs(IMAGES_DIR, exist_ok=True)

CALLOUT_CSS = """
.guide-highlight {
    outline: 4px solid #e11d48 !important;
    outline-offset: 4px !important;
    box-shadow: 0 0 0 6px rgba(225, 29, 72, 0.25), 0 8px 24px rgba(225, 29, 72, 0.35) !important;
    position: relative !important;
    z-index: 99990 !important;
}
.guide-badge {
    position: absolute !important;
    z-index: 99999 !important;
    background: linear-gradient(135deg, #e11d48 0%, #be123c 100%) !important;
    color: #ffffff !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    font-weight: 700 !important;
    font-size: 14px !important;
    line-height: 1.4 !important;
    padding: 8px 18px !important;
    border-radius: 9999px !important;
    box-shadow: 0 10px 25px -5px rgba(225, 29, 72, 0.5), 0 8px 10px -6px rgba(225, 29, 72, 0.3) !important;
    border: 2px solid #ffffff !important;
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    white-space: nowrap !important;
    pointer-events: none !important;
}
.guide-badge-number {
    background: rgba(255, 255, 255, 0.3) !important;
    border-radius: 50% !important;
    width: 24px !important;
    height: 24px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 13px !important;
    font-weight: 800 !important;
}
"""

def inject_callout_loc(page, locator, text, step="1", pos="top", ox=0, oy=0, custom_bg=None):
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

    locator.scroll_into_view_if_needed()
    locator.evaluate("""(el, {text, step, pos, ox, oy, bg}) => {
        el.classList.add('guide-highlight');
        const rect = el.getBoundingClientRect();
        const badge = document.createElement('div');
        badge.className = 'guide-badge';
        if (bg) {
            badge.style.background = bg;
        }
        badge.innerHTML = `<span class="guide-badge-number">${step}</span><span>${text}</span>`;

        const pageX = rect.left + window.scrollX;
        const pageY = rect.top + window.scrollY;

        let left = pageX;
        let top = pageY;

        if (pos === 'top') {
            left = pageX + (rect.width / 2) - 100 + ox;
            top = pageY - 50 + oy;
        } else if (pos === 'bottom') {
            left = pageX + (rect.width / 2) - 100 + ox;
            top = pageY + rect.height + 14 + oy;
        } else if (pos === 'right') {
            left = pageX + rect.width + 16 + ox;
            top = pageY + (rect.height / 2) - 18 + oy;
        } else if (pos === 'left') {
            left = pageX - 240 + ox;
            top = pageY + (rect.height / 2) - 18 + oy;
        }

        badge.style.left = Math.max(10, left) + 'px';
        badge.style.top = Math.max(10, top) + 'px';
        document.body.appendChild(badge);
    }""", {"text": text, "step": step, "pos": pos, "ox": ox, "oy": oy, "bg": custom_bg})
    time.sleep(0.3)

def clear_callout(page):
    page.evaluate("""() => {
        document.querySelectorAll('.guide-badge').forEach(e => e.remove());
        document.querySelectorAll('.guide-highlight').forEach(e => {
            e.classList.remove('guide-highlight');
        });
    }""")

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={"width": 1400, "height": 880})
        page = context.new_page()

        # Step 0: Login Page
        print("Capturing 00_jenkins_login.png...")
        page.goto("http://localhost:8000/login")
        page.wait_for_selector("#j_username")
        page.fill("#j_username", "sai")
        page.fill("#j_password", "sai")
        submit_btn = page.locator("button[name='Submit']")
        inject_callout_loc(page, submit_btn, "Enter Username & Password, then click Sign in", step="0", pos="right")
        page.screenshot(path=os.path.join(IMAGES_DIR, "00_jenkins_login.png"))

        # Log in
        clear_callout(page)
        submit_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        # ----------------- LAB 1 -----------------
        print("\n=== Processing Lab 1 ===")
        # Delete job 01-hello-world if exists to start fresh
        try:
            page.goto("http://localhost:8000/job/01-hello-world/delete")
            time.sleep(1)
            del_btn = page.locator("button[name='Submit'], button:has-text('Yes')").first
            if del_btn.count() > 0:
                del_btn.click()
                page.wait_for_load_state("networkidle")
                print("Cleaned previous 01-hello-world job.")
        except Exception:
            pass

        # Step 1: Dashboard -> New Item
        print("Capturing lab1_01_dashboard.png...")
        page.goto("http://localhost:8000/")
        new_item_link = page.locator("a[href*='newJob']").first
        new_item_link.wait_for()
        inject_callout_loc(page, new_item_link, "Click 'New Item' to create a project", step="1", pos="right")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab1_01_dashboard.png"))

        # Step 2: New Item page
        print("Capturing lab1_02_new_item_freestyle.png...")
        clear_callout(page)
        new_item_link.click()
        page.wait_for_selector("#name")
        page.fill("#name", "01-hello-world")
        time.sleep(0.3)
        freestyle_opt = page.locator("text=Freestyle project").first
        freestyle_opt.click()
        time.sleep(0.3)

        ok_btn = page.locator("#ok-button")
        inject_callout_loc(page, ok_btn, "Enter Name '01-hello-world' -> Choose 'Freestyle project' -> Click OK", step="2", pos="top", ox=-80)
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab1_02_new_item_freestyle.png"))

        clear_callout(page)
        ok_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        # Step 3: Scroll down to 'Build Steps' section
        print("Capturing lab1_03_build_steps_section.png...")
        add_step_btn = page.locator("button:has-text('Add build step')").first
        add_step_btn.scroll_into_view_if_needed()
        time.sleep(0.3)
        inject_callout_loc(page, add_step_btn, "Scroll down to 'Build Steps' & click 'Add build step'", step="3 & 4", pos="top")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab1_03_build_steps_section.png"))

        # Step 4: Dropdown menu open
        print("Capturing lab1_04_dropdown_select_batch.png...")
        clear_callout(page)
        add_step_btn.click()
        time.sleep(0.6)
        batch_opt = page.locator(".jenkins-dropdown button:has-text('Execute Windows batch command')").first
        inject_callout_loc(page, batch_opt, "Windows: Click 'Execute Windows batch command' (Linux: 'Execute shell')", step="4", pos="right")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab1_04_dropdown_select_batch.png"))

        # Click Execute Windows batch command
        clear_callout(page)
        batch_opt.click()
        time.sleep(0.6)

        # Step 5: Fill Batch Command & Save
        print("Capturing lab1_05_batch_command_editor.png...")
        cmd_script = (
            "echo ==============================================\n"
            "echo Hello from Jenkins running on Windows!\n"
            "echo Machine Name: %COMPUTERNAME%\n"
            "echo Current Date and Time: %DATE% %TIME%\n"
            "echo Current Working Directory: %CD%\n"
            "echo =============================================="
        )
        textarea = page.locator("textarea[name='command']").last
        textarea.scroll_into_view_if_needed()
        textarea.fill(cmd_script)
        time.sleep(0.5)

        save_btn = page.locator("button[name='Submit'], button:has-text('Save')").first
        inject_callout_loc(page, save_btn, "Paste commands into the box, then click 'Save'", step="5", pos="top", ox=50)
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab1_05_batch_command_editor.png"))

        clear_callout(page)
        save_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        # Step 6: Job Page -> Click 'Build Now'
        print("Capturing lab1_06_job_page_build_now.png...")
        build_now_btn = page.locator("a[href*='build?delay=0sec'], a:has-text('Build Now')").first
        inject_callout_loc(page, build_now_btn, "Click 'Build Now' in the left menu", step="6", pos="right")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab1_06_job_page_build_now.png"))

        clear_callout(page)
        build_now_btn.click()
        print("Waiting for build to finish...")
        time.sleep(4)
        page.reload()
        page.wait_for_load_state("networkidle")

        # Step 7: Build History widget
        print("Capturing lab1_07_build_history.png...")
        build1_link = page.locator("a[href*='/1/']").first
        inject_callout_loc(page, build1_link, "Build #1 finished with blue status (SUCCESS)! Click '#1'", step="7", pos="right")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab1_07_build_history.png"))

        # Step 8: Console Output
        print("Capturing lab1_08_console_output.png...")
        clear_callout(page)
        page.goto("http://localhost:8000/job/01-hello-world/1/console")
        page.wait_for_selector(".console-output, pre")
        time.sleep(1)

        page.evaluate("""() => {
            const pre = document.querySelector('pre');
            if (pre) {
                let html = pre.innerHTML;
                html = html.replace(/Finished: SUCCESS/g, '<span id="success-target" style="background: #16a34a; color: white; padding: 3px 10px; border-radius: 4px; font-weight: bold; font-size: 16px; box-shadow: 0 0 14px rgba(22,163,74,0.6);">Finished: SUCCESS</span>');
                pre.innerHTML = html;
            }
        }""")
        success_target = page.locator("#success-target")
        if success_target.count() > 0:
            inject_callout_loc(page, success_target, "Instructor Teaching Moment: Exit Code 0 = SUCCESS!", step="✓", pos="top", ox=50, custom_bg="linear-gradient(135deg, #16a34a 0%, #15803d 100%)")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab1_08_console_output.png"))

        # ----------------- LAB 2 -----------------
        print("\n=== Processing Lab 2 ===")
        clear_callout(page)
        # Delete job 02-parameterized-job if exists to start fresh
        try:
            page.goto("http://localhost:8000/job/02-parameterized-job/delete")
            time.sleep(1)
            del_btn = page.locator("button[name='Submit'], button:has-text('Yes')").first
            if del_btn.count() > 0:
                del_btn.click()
                page.wait_for_load_state("networkidle")
                print("Cleaned previous 02-parameterized-job.")
        except Exception:
            pass

        # Step 1: New Item -> 02-parameterized-job
        print("Capturing lab2_01_dashboard_new_item.png...")
        page.goto("http://localhost:8000/newJob")
        page.wait_for_selector("#name")
        page.fill("#name", "02-parameterized-job")
        freestyle_opt = page.locator("text=Freestyle project").first
        freestyle_opt.click()
        time.sleep(0.3)

        ok_btn = page.locator("#ok-button")
        inject_callout_loc(page, ok_btn, "Name: '02-parameterized-job' -> Select 'Freestyle project' -> Click OK", step="1", pos="top", ox=-80)
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab2_01_dashboard_new_item.png"))

        clear_callout(page)
        ok_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        # Step 2: In General tab, check 'This project is parameterized'
        print("Capturing lab2_02_general_parameterized_checkbox.png...")
        param_label = page.locator("label:has-text('This project is parameterized')").first
        param_label.scroll_into_view_if_needed()
        chk = param_label.locator("..").locator("input[type='checkbox']").first
        if not chk.is_checked():
            param_label.click()
        time.sleep(0.8)

        inject_callout_loc(page, param_label, "Check 'This project is parameterized'", step="2", pos="top", ox=40)
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab2_02_general_parameterized_checkbox.png"))

        # Step 3: Click 'Add Parameter' -> Select 'Choice Parameter'
        print("Capturing lab2_03_dropdown_add_choice.png...")
        clear_callout(page)
        add_param_btn = page.locator("button:has-text('Add Parameter')").first
        add_param_btn.scroll_into_view_if_needed()
        add_param_btn.click()
        time.sleep(0.6)

        choice_opt = page.locator(".jenkins-dropdown button:has-text('Choice Parameter')").first
        inject_callout_loc(page, choice_opt, "Click 'Add Parameter' -> Select 'Choice Parameter'", step="3", pos="right")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab2_03_dropdown_add_choice.png"))

        # Fill Choice Parameter:
        clear_callout(page)
        choice_opt.click()
        time.sleep(0.8)

        name_input = page.locator("[name='parameter.name']:visible").last
        name_input.fill("DEPLOY_ENV")
        choices_input = page.locator("textarea[name='parameter.choices']:visible").last
        choices_input.fill("DEVELOPMENT\nSTAGING\nPRODUCTION")
        desc_input = page.locator("textarea[name='parameter.description']:visible").last
        desc_input.fill("Select deployment target")
        time.sleep(0.5)

        print("Capturing lab2_04_choice_parameter_configured.png...")
        inject_callout_loc(page, choices_input, "Name: DEPLOY_ENV | Choices: DEVELOPMENT, STAGING, PRODUCTION", step="3", pos="top")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab2_04_choice_parameter_configured.png"))

        # Step 4: Click 'Add Parameter' -> Select 'String Parameter'
        print("Capturing lab2_05_dropdown_add_string.png...")
        clear_callout(page)
        add_param_btn.scroll_into_view_if_needed()
        add_param_btn.click()
        time.sleep(0.6)

        string_opt = page.locator(".jenkins-dropdown button:has-text('String Parameter')").first
        inject_callout_loc(page, string_opt, "Click 'Add Parameter' -> Select 'String Parameter'", step="4", pos="right")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab2_05_dropdown_add_string.png"))

        clear_callout(page)
        string_opt.click()
        time.sleep(0.8)

        page.locator("[name='parameter.name']:visible").last.fill("APP_VERSION")
        default_val = page.locator("[name='parameter.defaultValue']:visible").last
        default_val.fill("1.0.0")
        page.locator("textarea[name='parameter.description']:visible").last.fill("Release version number")
        time.sleep(0.5)

        print("Capturing lab2_06_string_parameter_configured.png...")
        inject_callout_loc(page, default_val, "Name: APP_VERSION | Default Value: 1.0.0", step="4", pos="top")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab2_06_string_parameter_configured.png"))

        # Step 5: Under Build Steps -> Add build step -> Execute Windows batch command
        clear_callout(page)
        add_build_btn = page.locator("button:has-text('Add build step')").first
        add_build_btn.scroll_into_view_if_needed()
        add_build_btn.click()
        time.sleep(0.6)

        page.locator(".jenkins-dropdown button:has-text('Execute Windows batch command')").first.click()
        time.sleep(0.8)

        cmd_textarea = page.locator("textarea[name='command']:visible").last
        cmd_textarea.scroll_into_view_if_needed()
        cmd_textarea.fill("echo Deploying Version %APP_VERSION% to %DEPLOY_ENV% Environment...")
        time.sleep(0.5)

        print("Capturing lab2_07_build_step_parameterized.png...")
        save_btn = page.locator("button[name='Submit'], button:has-text('Save')").first
        inject_callout_loc(page, save_btn, "Add script with %APP_VERSION% and %DEPLOY_ENV% -> Click 'Save'", step="5 & 6", pos="top", ox=50)
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab2_07_build_step_parameterized.png"))

        # Step 6: Save
        clear_callout(page)
        save_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        # Step 7: Left sidebar button now says 'Build with Parameters'!
        print("Capturing lab2_08_sidebar_build_with_parameters.png...")
        build_param_btn = page.locator("a[href*='build?delay=0sec'], a:has-text('Build with Parameters')").first
        inject_callout_loc(page, build_param_btn, "Notice new menu item: 'Build with Parameters'! Click it", step="7", pos="right")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab2_08_sidebar_build_with_parameters.png"))

        # Click Build with Parameters
        clear_callout(page)
        build_param_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(0.5)

        # Select STAGING, enter v2.0.0
        select_env = page.locator("select[name='value']").first
        select_env.select_option("STAGING")
        version_input = page.locator("textarea[name='value'], input[name='value']").first
        version_input.fill("v2.0.0")
        time.sleep(0.5)

        print("Capturing lab2_09_build_parameters_screen.png...")
        build_submit_btn = page.locator("button.jenkins-button--primary:has-text('Build')").first
        inject_callout_loc(page, build_submit_btn, "Pick DEPLOY_ENV='STAGING', APP_VERSION='v2.0.0' -> Click 'Build'", step="7", pos="top")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab2_09_build_parameters_screen.png"))

        # Trigger build
        clear_callout(page)
        build_submit_btn.click()
        print("Waiting for parameterized build to complete...")
        time.sleep(4)
        page.reload()
        page.wait_for_load_state("networkidle")

        # Step 8: Check Console Output
        print("Capturing lab2_10_console_output_verified.png...")
        page.goto("http://localhost:8000/job/02-parameterized-job/1/console")
        page.wait_for_selector(".console-output, pre")
        time.sleep(1)

        page.evaluate("""() => {
            const pre = document.querySelector('pre');
            if (pre) {
                let html = pre.innerHTML;
                html = html.replace(/Deploying Version v2\.0\.0 to STAGING Environment\.\.\./g, 
                    '<span id="deploy-target" style="background: #0284c7; color: white; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 15px; box-shadow: 0 0 14px rgba(2,132,199,0.6);">Deploying Version v2.0.0 to STAGING Environment...</span>');
                html = html.replace(/Finished: SUCCESS/g, 
                    '<span id="success-target" style="background: #16a34a; color: white; padding: 3px 10px; border-radius: 4px; font-weight: bold; font-size: 16px; box-shadow: 0 0 14px rgba(22,163,74,0.6);">Finished: SUCCESS</span>');
                pre.innerHTML = html;
            }
        }""")
        deploy_target = page.locator("#deploy-target").last
        if deploy_target.count() > 0:
            inject_callout_loc(page, deploy_target, "Dynamic Inputs Injected: Version=v2.0.0, Env=STAGING", step="✓", pos="top", ox=50, custom_bg="linear-gradient(135deg, #0284c7 0%, #0369a1 100%)")
        page.screenshot(path=os.path.join(IMAGES_DIR, "lab2_10_console_output_verified.png"))

        browser.close()
        print("\nSUCCESS! ALL LAB 1 & LAB 2 PHOTOS CAPTURED WITH EXACT VISUAL INDICATORS!")

if __name__ == "__main__":
    run()
