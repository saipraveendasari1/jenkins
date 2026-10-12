export const LAB_DATA = {
  lab1: {
    id: "lab1",
    badge: "Lab 1",
    title: "Lab 1: Your First Jenkins Job (Freestyle Project)",
    steps: [
      {
        id: "lab1-step0",
        number: "0",
        title: "Access Jenkins & Sign In",
        subtitle: "Open browser to http://localhost:8000 and sign into your Jenkins account.",
        colorTheme: {
          primary: "#6366f1",
          gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          glow: "rgba(99, 102, 241, 0.4)",
          text: "#a5b4fc",
          cardBorder: "rgba(99, 102, 241, 0.35)",
          bgAccent: "rgba(99, 102, 241, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Open your web browser and navigate to",
            link: "http://localhost:8000",
            afterLink: "Enter your username and password, then click",
            target: "Sign in"
          }
        ],
        screenshot: {
          src: "/images/00_jenkins_login.png",
          alt: "Jenkins Login Screen",
          url: "http://localhost:8000/login",
          title: "Jenkins Sign In Page",
          caption: "Sign-in form with username and password credential input fields."
        }
      },
      {
        id: "lab1-step1",
        number: "1",
        title: "Click 'New Item' on Jenkins Dashboard",
        subtitle: "Initiate the creation of a new build project from the main left-hand sidebar.",
        colorTheme: {
          primary: "#0ea5e9",
          gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
          glow: "rgba(14, 165, 233, 0.4)",
          text: "#38bdf8",
          cardBorder: "rgba(14, 165, 233, 0.35)",
          bgAccent: "rgba(14, 165, 233, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "From the Jenkins main dashboard, look at the top-left sidebar menu and click",
            target: "New Item"
          }
        ],
        screenshot: {
          src: "/images/lab1_01_dashboard.png",
          alt: "Jenkins Dashboard New Item",
          url: "http://localhost:8000/",
          title: "Jenkins Dashboard",
          caption: "Highlighted red callout pointing directly to 'New Item' on the left menu."
        }
      },
      {
        id: "lab1-step2",
        number: "2",
        title: "Enter Item Name & Select 'Freestyle project'",
        subtitle: "Name your project and select the Freestyle archetype.",
        colorTheme: {
          primary: "#8b5cf6",
          gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
          glow: "rgba(139, 92, 246, 0.4)",
          text: "#c084fc",
          cardBorder: "rgba(139, 92, 246, 0.35)",
          bgAccent: "rgba(139, 92, 246, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "In the 'Enter an item name' text field, type",
            badge: "01-hello-world"
          },
          {
            type: "item",
            text: "From the project card list, select",
            target: "Freestyle project"
          },
          {
            type: "item",
            text: "Scroll down to the bottom and click",
            target: "OK"
          }
        ],
        screenshot: {
          src: "/images/lab1_02_new_item_freestyle.png",
          alt: "New Item Freestyle Project",
          url: "http://localhost:8000/newJob",
          title: "New Item Configuration",
          caption: "'01-hello-world' entered in name box, Freestyle project highlighted, and OK clicked."
        }
      },
      {
        id: "lab1-step3-4",
        number: "3 & 4",
        title: "Scroll to 'Build Steps' & Add Command Runner",
        subtitle: "Configure Jenkins to execute native operating system commands.",
        colorTheme: {
          primary: "#f59e0b",
          gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          glow: "rgba(245, 158, 11, 0.4)",
          text: "#fbbf24",
          cardBorder: "rgba(245, 158, 11, 0.35)",
          bgAccent: "rgba(245, 158, 11, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "In the project configuration page, scroll down to the",
            badge: "Build Steps",
            afterBadge: "section."
          },
          {
            type: "item",
            text: "Click the dropdown button labeled",
            target: "Add build step"
          }
        ],
        screenshot: {
          src: "/images/lab1_03_build_steps_section.png",
          alt: "Add Build Step Button",
          url: "http://localhost:8000/job/01-hello-world/configure",
          title: "Build Steps Section"
        },
        secondaryInstructions: [
          {
            type: "os-choice",
            text: "Select the appropriate command runner for your operating system:",
            windowsTarget: "Execute Windows batch command",
            linuxTarget: "Execute shell"
          }
        ],
        secondaryScreenshot: {
          src: "/images/lab1_04_dropdown_select_batch.png",
          alt: "Dropdown Build Step Options",
          url: "Build Step Options",
          title: "Runner Options",
          caption: "Select 'Execute Windows batch command' on Windows or 'Execute shell' on Linux/Mac."
        }
      },
      {
        id: "lab1-step5",
        number: "5",
        title: "Paste Command Script & Click Save",
        subtitle: "Paste the system diagnostics command block into the command textarea and save.",
        colorTheme: {
          primary: "#ec4899",
          gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
          glow: "rgba(236, 72, 153, 0.4)",
          text: "#f472b6",
          cardBorder: "rgba(236, 72, 153, 0.35)",
          bgAccent: "rgba(236, 72, 153, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Paste the appropriate script below into the Command box, then scroll down and click",
            target: "Save"
          }
        ],
        codeSnippets: {
          windows: {
            title: "Windows Batch Script (cmd.exe)",
            code: `echo ==============================================
echo Hello from Jenkins running on Windows!
echo Machine Name: %COMPUTERNAME%
echo Current Date and Time: %DATE% %TIME%
echo Current Working Directory: %CD%
echo ==============================================`
          },
          linux: {
            title: "Linux / macOS Shell Script (/bin/sh)",
            code: `echo "=============================================="
echo "Hello from Jenkins running on Linux!"
echo "Hostname: $(hostname)"
echo "Current Date: $(date)"
echo "Running as User: $(whoami)"
echo "Current Working Directory: $(pwd)"
echo "=============================================="`
          }
        },
        screenshot: {
          src: "/images/lab1_05_batch_command_editor.png",
          alt: "Batch Command Editor and Save",
          url: "Command Editor",
          title: "Script Editor & Save",
          caption: "Commands pasted into the command textarea, with Save button clicked."
        }
      },
      {
        id: "lab1-step6",
        number: "6",
        title: "Trigger the Build ('Build Now')",
        subtitle: "Request Jenkins to execute the job immediately.",
        colorTheme: {
          primary: "#3b82f6",
          gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          glow: "rgba(59, 130, 246, 0.4)",
          text: "#60a5fa",
          cardBorder: "rgba(59, 130, 246, 0.35)",
          bgAccent: "rgba(59, 130, 246, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "On the project page for 01-hello-world, look at the left navigation sidebar and click",
            target: "Build Now"
          }
        ],
        screenshot: {
          src: "/images/lab1_06_job_page_build_now.png",
          alt: "Click Build Now",
          url: "http://localhost:8000/job/01-hello-world/",
          title: "Job Dashboard"
        }
      },
      {
        id: "lab1-step7",
        number: "7",
        title: "Inspect Build History & Status",
        subtitle: "Observe build queue execution and the blue success indicator ball.",
        colorTheme: {
          primary: "#06b6d4",
          gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
          glow: "rgba(6, 182, 212, 0.4)",
          text: "#22d3ee",
          cardBorder: "rgba(6, 182, 212, 0.35)",
          bgAccent: "rgba(6, 182, 212, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Look at the Build History box in the bottom-left corner. Notice build",
            badge: "#1",
            afterBadge: "appears with a solid blue ball indicating SUCCESS."
          },
          {
            type: "item",
            text: "Click on build",
            target: "#1",
            afterTarget: "to view build details."
          }
        ],
        screenshot: {
          src: "/images/lab1_07_build_history.png",
          alt: "Build History #1",
          url: "Build History Widget",
          title: "Build History #1 View"
        }
      },
      {
        id: "lab1-step8",
        number: "8",
        title: "Verify Console Output (Finished: SUCCESS)",
        subtitle: "Inspect the real-time execution log and confirm exit code 0.",
        colorTheme: {
          primary: "#10b981",
          gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          glow: "rgba(16, 185, 129, 0.5)",
          text: "#34d399",
          cardBorder: "rgba(16, 185, 129, 0.4)",
          bgAccent: "rgba(16, 185, 129, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "From the build page menu, click",
            target: "Console Output"
          },
          {
            type: "item",
            text: "Confirm that the machine name, date, time, and directory were printed, concluding with",
            badge: "Finished: SUCCESS"
          }
        ],
        screenshot: {
          src: "/images/lab1_08_console_output.png",
          alt: "Console Output Finished SUCCESS",
          url: "http://localhost:8000/job/01-hello-world/1/console",
          title: "Console Output Log"
        }
      }
    ]
  },
  lab2: {
    id: "lab2",
    badge: "Lab 2",
    title: "Lab 2: Parameterized Builds (Dynamic Inputs)",
    steps: [
      {
        id: "lab2-step1",
        number: "1",
        title: "Create Project '02-parameterized-job'",
        subtitle: "Start a new Freestyle project designated for runtime parameters.",
        colorTheme: {
          primary: "#0ea5e9",
          gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
          glow: "rgba(14, 165, 233, 0.4)",
          text: "#38bdf8",
          cardBorder: "rgba(14, 165, 233, 0.35)",
          bgAccent: "rgba(14, 165, 233, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "From the Jenkins Dashboard, click",
            target: "New Item"
          },
          {
            type: "item",
            text: "Enter project name:",
            badge: "02-parameterized-job"
          },
          {
            type: "item",
            text: "Select",
            target: "Freestyle project",
            afterTarget: "and click",
            secondTarget: "OK"
          }
        ],
        screenshot: {
          src: "/images/lab2_01_dashboard_new_item.png",
          alt: "Lab 2 New Item",
          url: "http://localhost:8000/newJob",
          title: "Create 02-parameterized-job"
        }
      },
      {
        id: "lab2-step2",
        number: "2",
        title: "Enable 'This project is parameterized'",
        subtitle: "Turn on parameter handling in the General configuration tab.",
        colorTheme: {
          primary: "#f59e0b",
          gradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
          glow: "rgba(245, 158, 11, 0.45)",
          text: "#fbbf24",
          cardBorder: "rgba(245, 158, 11, 0.4)",
          bgAccent: "rgba(245, 158, 11, 0.1)"
        },
        instructions: [
          {
            type: "item",
            text: "In the",
            badge: "General",
            afterBadge: "tab, locate and check the box labeled:",
            target: "This project is parameterized"
          },
          {
            type: "item",
            text: "Notice that the",
            target: "Add Parameter",
            afterTarget: "dropdown button immediately appears below the checkbox."
          }
        ],
        screenshot: {
          src: "/images/lab2_02_general_parameterized_checkbox.png",
          alt: "Parameterized Checkbox Enabled",
          url: "General Settings Tab",
          title: "General Tab Parameterized Checkbox",
          caption: "'This project is parameterized' checked, revealing the Add Parameter button."
        }
      },
      {
        id: "lab2-step3",
        number: "3",
        title: "Add Choice Parameter: DEPLOY_ENV",
        subtitle: "Provide a dropdown selector restricting the operator to preset environments.",
        colorTheme: {
          primary: "#10b981",
          gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          glow: "rgba(16, 185, 129, 0.45)",
          text: "#34d399",
          cardBorder: "rgba(16, 185, 129, 0.4)",
          bgAccent: "rgba(16, 185, 129, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Click",
            target: "Add Parameter",
            afterTarget: "and select",
            secondTarget: "Choice Parameter"
          }
        ],
        screenshot: {
          src: "/images/lab2_03_dropdown_add_choice.png",
          alt: "Add Choice Parameter Dropdown",
          url: "Dropdown Selection",
          title: "Select Choice Parameter"
        },
        table: {
          title: "Choice Parameter Configuration Values:",
          headers: ["Field", "Value to Enter", "Purpose"],
          rows: [
            ["Name", "DEPLOY_ENV", "Environment variable identifier used in scripts"],
            ["Choices (one per line)", "DEVELOPMENT\nSTAGING\nPRODUCTION", "Preset options populated in the build dropdown"],
            ["Description", "Select deployment target", "Help text displayed to the operator"]
          ]
        },
        secondaryScreenshot: {
          src: "/images/lab2_04_choice_parameter_configured.png",
          alt: "Configured Choice Parameter",
          url: "Choice Parameter Form",
          title: "Configured DEPLOY_ENV Choice Parameter"
        }
      },
      {
        id: "lab2-step4",
        number: "4",
        title: "Add String Parameter: APP_VERSION",
        subtitle: "Allow the operator to provide an arbitrary release tag or version number.",
        colorTheme: {
          primary: "#8b5cf6",
          gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
          glow: "rgba(139, 92, 246, 0.45)",
          text: "#c084fc",
          cardBorder: "rgba(139, 92, 246, 0.4)",
          bgAccent: "rgba(139, 92, 246, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Click",
            target: "Add Parameter",
            afterTarget: "again and select",
            secondTarget: "String Parameter"
          }
        ],
        screenshot: {
          src: "/images/lab2_05_dropdown_add_string.png",
          alt: "Add String Parameter Dropdown",
          url: "Dropdown Selection",
          title: "Select String Parameter"
        },
        table: {
          title: "String Parameter Configuration Values:",
          headers: ["Field", "Value to Enter", "Purpose"],
          rows: [
            ["Name", "APP_VERSION", "Variable key accessible by build steps"],
            ["Default Value", "1.0.0", "Fallback value if no custom tag is entered"],
            ["Description", "Release version number", "Help text displayed on the build screen"]
          ]
        },
        secondaryScreenshot: {
          src: "/images/lab2_06_string_parameter_configured.png",
          alt: "Configured String Parameter",
          url: "String Parameter Form",
          title: "Configured APP_VERSION String Parameter"
        }
      },
      {
        id: "lab2-step5-6",
        number: "5 & 6",
        title: "Add Parameterized Command & Save",
        subtitle: "Reference the dynamic variables in your build step script.",
        colorTheme: {
          primary: "#ec4899",
          gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
          glow: "rgba(236, 72, 153, 0.45)",
          text: "#f472b6",
          cardBorder: "rgba(236, 72, 153, 0.4)",
          bgAccent: "rgba(236, 72, 153, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Scroll down to Build Steps -> Click",
            target: "Add build step",
            afterTarget: "-> Select runner for your OS. Paste command and click",
            secondTarget: "Save"
          }
        ],
        codeSnippets: {
          windows: {
            title: "Windows Batch Syntax (%VARIABLE%)",
            code: "echo Deploying Version %APP_VERSION% to %DEPLOY_ENV% Environment..."
          },
          linux: {
            title: "Linux Shell Syntax (${VARIABLE})",
            code: `echo "Deploying Version \${APP_VERSION} to \${DEPLOY_ENV} Environment..."`
          }
        },
        screenshot: {
          src: "/images/lab2_07_build_step_parameterized.png",
          alt: "Parameterized Build Step and Save",
          url: "Parameterized Build Step Editor",
          title: "Build Step Script Editor"
        }
      },
      {
        id: "lab2-step7",
        number: "7",
        title: "Notice 'Build with Parameters' & Trigger",
        subtitle: "Experience how the UI dynamically transforms to prompt for user inputs.",
        colorTheme: {
          primary: "#3b82f6",
          gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          glow: "rgba(59, 130, 246, 0.45)",
          text: "#60a5fa",
          cardBorder: "rgba(59, 130, 246, 0.4)",
          bgAccent: "rgba(59, 130, 246, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Notice that the sidebar button has changed from 'Build Now' to",
            target: "Build with Parameters",
            afterTarget: "! Click it."
          },
          {
            type: "item",
            text: "In the parameters form: Select DEPLOY_ENV:",
            badge: "STAGING",
            afterBadge: "and change APP_VERSION to",
            secondBadge: "v2.0.0"
          },
          {
            type: "item",
            text: "Click the blue button labeled",
            target: "Build"
          }
        ],
        screenshot: {
          src: "/images/lab2_08_sidebar_build_with_parameters.png",
          alt: "Sidebar Build with Parameters",
          url: "Job Status Page",
          title: "Sidebar Changed to 'Build with Parameters'"
        },
        secondaryScreenshot: {
          src: "/images/lab2_09_build_parameters_screen.png",
          alt: "Build Parameters Selection",
          url: "http://localhost:8000/job/02-parameterized-job/build",
          title: "Parameter Selection Form (STAGING & v2.0.0)"
        }
      },
      {
        id: "lab2-step8",
        number: "8",
        title: "Verify Dynamic Value Injection in Console Output",
        subtitle: "Confirm that Jenkins resolved the variables at execution time.",
        colorTheme: {
          primary: "#10b981",
          gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          glow: "rgba(16, 185, 129, 0.5)",
          text: "#34d399",
          cardBorder: "rgba(16, 185, 129, 0.4)",
          bgAccent: "rgba(16, 185, 129, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Look at Build History for",
            badge: "#1",
            afterBadge: "-> Click",
            target: "Console Output"
          },
          {
            type: "item",
            text: "Verify the line reads:",
            badge: "Deploying Version v2.0.0 to STAGING Environment...",
            afterBadge: "and ends with",
            secondBadge: "Finished: SUCCESS"
          }
        ],
        screenshot: {
          src: "/images/lab2_10_console_output_verified.png",
          alt: "Console Output Verified Parameters",
          url: "http://localhost:8000/job/02-parameterized-job/1/console",
          title: "Console Output Verified Log"
        }
      }
    ]
  },
  lab3: {
    id: "lab3",
    badge: "Lab 3",
    title: "Lab 3: Continuous Integration — Testing Our Sample Application",
    objective: "Demonstrate true CI where Jenkins verifies code syntax and runs automated unit tests on our Python project.",
    sampleAppCode: {
      appPy: `# sample-app/app.py
def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0: raise ValueError("Cannot divide by zero")
    return a / b

if __name__ == "__main__":
    print("DevOps Student Application Running Successfully!")`,
      testAppPy: `# sample-app/test_app.py
import unittest
from app import add, subtract, multiply, divide

class TestApp(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
    def test_subtract(self):
        self.assertEqual(subtract(10, 4), 6)
    def test_multiply(self):
        self.assertEqual(multiply(3, 4), 12)
    def test_divide(self):
        self.assertEqual(divide(10, 2), 5)
        with self.assertRaises(ValueError):
            divide(10, 0)

if __name__ == '__main__':
    unittest.main()`
    },
    steps: [
      {
        id: "lab3-step1",
        number: "1",
        title: "Click 'New Item' -> Create '03-python-app-ci'",
        subtitle: "Initialize a Freestyle project for automated unit testing.",
        colorTheme: {
          primary: "#06b6d4",
          gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
          glow: "rgba(6, 182, 212, 0.4)",
          text: "#22d3ee",
          cardBorder: "rgba(6, 182, 212, 0.35)",
          bgAccent: "rgba(6, 182, 212, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "From Jenkins Dashboard, click",
            target: "New Item"
          },
          {
            type: "item",
            text: "Enter item name:",
            badge: "03-python-app-ci"
          },
          {
            type: "item",
            text: "Select",
            target: "Freestyle project",
            afterTarget: "and click",
            secondTarget: "OK"
          }
        ],
        screenshot: {
          src: "/images/lab3_01_new_item_python.png",
          alt: "New Item Python CI",
          url: "http://localhost:8000/newJob",
          title: "Create Python CI Project",
          caption: "Live capture from port 8000: Select Freestyle Project for automated Python unit testing."
        }
      },
      {
        id: "lab3-step2",
        number: "2",
        title: "Add Build Steps: Runtime Check, Compile & Unit Tests",
        subtitle: "Execute multi-step verification: Python runtime, byte compilation, and unit tests.",
        colorTheme: {
          primary: "#f59e0b",
          gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          glow: "rgba(245, 158, 11, 0.4)",
          text: "#fbbf24",
          cardBorder: "rgba(245, 158, 11, 0.35)",
          bgAccent: "rgba(245, 158, 11, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Scroll to Build Steps -> Click",
            target: "Add build step",
            afterTarget: "and choose your operating system runner."
          }
        ],
        codeSnippets: {
          windows: {
            title: "Windows Students (Execute Windows batch command)",
            code: `echo [STEP 1] Checking Python Runtime...
python --version

echo [STEP 2] Checking Syntax and Compilation...
python -m compileall "C:\\Users\\SAI PRAVEEN\\Downloads\\devops\\sample-app"

echo [STEP 3] Running Automated Unit Tests...
cd "C:\\Users\\SAI PRAVEEN\\Downloads\\devops\\sample-app"
python -m unittest test_app.py`
          },
          linux: {
            title: "Linux / Mac Students (Execute shell)",
            code: `echo "[STEP 1] Checking Python Runtime..."
python3 --version

echo "[STEP 2] Checking Syntax and Compilation..."
python3 -m compileall /path/to/devops/sample-app

echo "[STEP 3] Running Automated Unit Tests..."
cd /path/to/devops/sample-app
python3 -m unittest test_app.py`
          }
        },
        screenshot: {
          src: "/images/lab3_02_build_steps_python.png",
          alt: "Configure Python CI Build Steps",
          url: "http://localhost:8000/job/03-python-ci/configure",
          title: "Build Steps: Python Unit Tests",
          caption: "Live capture from port 8000: Configured Windows batch command to execute automated unit tests."
        }
      },
      {
        id: "lab3-step3",
        number: "3",
        title: "Click Save and Click 'Build Now'",
        subtitle: "Persist job configuration and trigger Jenkins executor.",
        colorTheme: {
          primary: "#3b82f6",
          gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          glow: "rgba(59, 130, 246, 0.4)",
          text: "#60a5fa",
          cardBorder: "rgba(59, 130, 246, 0.35)",
          bgAccent: "rgba(59, 130, 246, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Click",
            target: "Save",
            afterTarget: "at the bottom of the configuration page."
          },
          {
            type: "item",
            text: "On the job page, click",
            target: "Build Now",
            afterTarget: "from the left sidebar menu."
          }
        ],
        screenshot: {
          src: "/images/lab3_03_job_page_build_now.png",
          alt: "Job Page Build Now",
          url: "http://localhost:8000/job/03-python-ci/",
          title: "Trigger CI Build",
          caption: "Live capture from port 8000: Click 'Build Now' to run automated testing executor."
        }
      },
      {
        id: "lab3-step4",
        number: "4",
        title: "Verify Console Output: Ran 5 tests ... OK",
        subtitle: "Confirm successful automated unit test validation.",
        colorTheme: {
          primary: "#10b981",
          gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          glow: "rgba(16, 185, 129, 0.5)",
          text: "#34d399",
          cardBorder: "rgba(16, 185, 129, 0.4)",
          bgAccent: "rgba(16, 185, 129, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Click",
            target: "Console Output",
            afterTarget: "from build #1."
          },
          {
            type: "item",
            text: "Verify the test summary reads:",
            badge: "Ran 5 tests in 0.002s ... OK",
            afterBadge: "and concludes with",
            secondBadge: "Finished: SUCCESS"
          }
        ],
        codeSnippets: {
          windows: {
            title: "Verified Console Output Log",
            code: `[STEP 1] Checking Python Runtime...
Python 3.11.4
[STEP 2] Checking Syntax and Compilation...
Listing 'sample-app'...
Compiling 'sample-app\\app.py'...
Compiling 'sample-app\\test_app.py'...
[STEP 3] Running Automated Unit Tests...
.....
----------------------------------------------------------------------
Ran 5 tests in 0.002s

OK
Finished: SUCCESS`
          },
          linux: {
            title: "Verified Console Output Log",
            code: `[STEP 1] Checking Python Runtime...
Python 3.11.4
[STEP 2] Checking Syntax and Compilation...
Listing 'sample-app'...
Compiling 'sample-app/app.py'...
Compiling 'sample-app/test_app.py'...
[STEP 3] Running Automated Unit Tests...
.....
----------------------------------------------------------------------
Ran 5 tests in 0.002s

OK
Finished: SUCCESS`
          }
        },
        screenshot: {
          src: "/images/lab3_04_console_output_success.png",
          alt: "Live Console Output SUCCESS",
          url: "http://localhost:8000/job/03-python-ci/2/console",
          title: "Automated Tests Passed - Exit Code 0",
          caption: "Live output captured directly from port 8000 showing unit tests passing and Finished: SUCCESS."
        }
      }
    ]
  },
  lab4: {
    id: "lab4",
    badge: "Lab 4",
    title: "Lab 4: The 'Aha!' Moment — Catching Bugs Automatically (CI in Action)",
    objective: "Experience the core value of CI. Show what happens when a developer commits a bug and how Jenkins instantly catches it.",
    steps: [
      {
        id: "lab4-step1",
        number: "1",
        title: "Intentionally Inject Math Bug into app.py",
        subtitle: "Simulate a broken commit by corrupting the add function.",
        colorTheme: {
          primary: "#f43f5e",
          gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
          glow: "rgba(244, 63, 94, 0.45)",
          text: "#fb7185",
          cardBorder: "rgba(244, 63, 94, 0.4)",
          bgAccent: "rgba(244, 63, 94, 0.1)"
        },
        instructions: [
          {
            type: "item",
            text: "Open sample-app/app.py in an editor and intentionally introduce a math bug into the add function:"
          }
        ],
        codeSnippets: {
          windows: {
            title: "Bug Injected into sample-app/app.py",
            code: `def add(a, b):
    return a + b + 999  # <-- DELIBERATE BUG INTRODUCED!`
          },
          linux: {
            title: "Bug Injected into sample-app/app.py",
            code: `def add(a, b):
    return a + b + 999  # <-- DELIBERATE BUG INTRODUCED!`
          }
        },
        screenshot: {
          src: "/images/lab4_01_bug_injected_editor.png",
          alt: "Deliberate Bug Introduced in CI Step",
          url: "sample-app/app.py",
          title: "Injected Bug in Code",
          caption: "Live capture from port 8000: Modifying code to simulate automated failure detection."
        }
      },
      {
        id: "lab4-step2",
        number: "2",
        title: "Save the Modified File",
        subtitle: "Write the buggy change to sample-app/app.py.",
        colorTheme: {
          primary: "#f97316",
          gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          glow: "rgba(249, 115, 22, 0.4)",
          text: "#fb923c",
          cardBorder: "rgba(249, 115, 22, 0.35)",
          bgAccent: "rgba(249, 115, 22, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Save the file",
            badge: "sample-app/app.py",
            afterBadge: "with the bug in place."
          }
        ],
        screenshot: {
          src: "/images/lab4_01_bug_injected_editor.png",
          alt: "Buggy Code Saved",
          url: "sample-app/app.py",
          title: "Saved Broken Source Code",
          caption: "File saved with bug, ready to be picked up by automated Jenkins build trigger."
        }
      },
      {
        id: "lab4-step3",
        number: "3",
        title: "Click 'Build Now' on 03-python-app-ci",
        subtitle: "Trigger the pipeline against the buggy codebase.",
        colorTheme: {
          primary: "#8b5cf6",
          gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
          glow: "rgba(139, 92, 246, 0.4)",
          text: "#c084fc",
          cardBorder: "rgba(139, 92, 246, 0.35)",
          bgAccent: "rgba(139, 92, 246, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Return to Jenkins and click",
            target: "Build Now",
            afterTarget: "on",
            badge: "03-python-app-ci"
          }
        ],
        screenshot: {
          src: "/images/lab3_03_job_page_build_now.png",
          alt: "Trigger Broken Build",
          url: "http://localhost:8000/job/03-python-ci/",
          title: "Trigger Build Now",
          caption: "Live capture from port 8000: Triggering build against codebase containing broken logic."
        }
      },
      {
        id: "lab4-step4",
        number: "4",
        title: "OBSERVE: Build Status Turns RED (FAILURE!)",
        subtitle: "Jenkins immediately catches the failure and aborts.",
        colorTheme: {
          primary: "#ef4444",
          gradient: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
          glow: "rgba(239, 68, 68, 0.5)",
          text: "#f87171",
          cardBorder: "rgba(239, 68, 68, 0.45)",
          bgAccent: "rgba(239, 68, 68, 0.1)"
        },
        instructions: [
          {
            type: "item",
            text: "Look at Build History. Build status indicator immediately turns",
            badge: "RED BALL (FAILED)"
          }
        ],
        screenshot: {
          src: "/images/lab4_02_build_history_failure_red.png",
          alt: "Build Status RED (FAILURE)",
          url: "http://localhost:8000/job/03-python-ci/",
          title: "Immediate Failure Feedback (Red Ball)",
          caption: "Live capture from port 8000: Jenkins flags build failure with solid RED indicator in Build History."
        }
      },
      {
        id: "lab4-step5",
        number: "5",
        title: "Inspect Console Failure Logs & Takeaway",
        subtitle: "Analyze the assertion error caught by the automated test runner.",
        colorTheme: {
          primary: "#e11d48",
          gradient: "linear-gradient(135deg, #e11d48 0%, #9f1239 100%)",
          glow: "rgba(225, 29, 72, 0.5)",
          text: "#fb7185",
          cardBorder: "rgba(225, 29, 72, 0.45)",
          bgAccent: "rgba(225, 29, 72, 0.1)"
        },
        instructions: [
          {
            type: "item",
            text: "Open",
            target: "Console Output",
            afterTarget: "and examine the failure log:"
          }
        ],
        codeSnippets: {
          windows: {
            title: "Console Output Failure Log",
            code: `FAIL: test_add (test_app.TestApp)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "test_app.py", line 6, in test_add
    self.assertEqual(add(2, 3), 5)
AssertionError: 6 != 5
----------------------------------------------------------------------
Ran 4 tests in 0.000s

FAILED (failures=1)
Build step 'Execute ...' marked build as failure
Finished: FAILURE`
          },
          linux: {
            title: "Console Output Failure Log",
            code: `FAIL: test_add (test_app.TestApp)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "test_app.py", line 6, in test_add
    self.assertEqual(add(2, 3), 5)
AssertionError: 6 != 5
----------------------------------------------------------------------
Ran 4 tests in 0.000s

FAILED (failures=1)
Build step 'Execute ...' marked build as failure
Finished: FAILURE`
          }
        },
        screenshot: {
          src: "/images/lab4_03_console_output_failure.png",
          alt: "Console Output Failure Log",
          url: "http://localhost:8000/job/03-python-ci/3/console",
          title: "Live Failure Logs from Port 8000",
          caption: "Live capture from port 8000 showing AssertionError in test_add and Finished: FAILURE."
        }
      },
      {
        id: "lab4-step6",
        number: "6",
        title: "Revert the Bug in app.py",
        subtitle: "Restore the add function to 'return a + b' and save.",
        colorTheme: {
          primary: "#0ea5e9",
          gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
          glow: "rgba(14, 165, 233, 0.4)",
          text: "#38bdf8",
          cardBorder: "rgba(14, 165, 233, 0.35)",
          bgAccent: "rgba(14, 165, 233, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Revert the bug in app.py (change back to",
            badge: "return a + b",
            afterBadge: ") and save the file."
          }
        ],
        screenshot: {
          src: "/images/lab3_02_build_steps_python.png",
          alt: "Clean Codebase Restored",
          url: "sample-app/app.py",
          title: "Bug Reverted & Verified",
          caption: "Code restored to return a + b. Ready to re-run pipeline verification."
        }
      },
      {
        id: "lab4-step7",
        number: "7",
        title: "Click 'Build Now' Again -> Verify Blue/Green Recovery",
        subtitle: "Confirm that fixing the bug restores the pipeline to SUCCESS.",
        colorTheme: {
          primary: "#10b981",
          gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          glow: "rgba(16, 185, 129, 0.5)",
          text: "#34d399",
          cardBorder: "rgba(16, 185, 129, 0.4)",
          bgAccent: "rgba(16, 185, 129, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Click",
            target: "Build Now",
            afterTarget: "again. The build status turns",
            badge: "SOLID BLUE (SUCCESS)",
            afterBadge: "once more!"
          }
        ],
        screenshot: {
          src: "/images/lab4_04_build_history_recovery_blue.png",
          alt: "Build Status BLUE (SUCCESS)",
          url: "http://localhost:8000/job/03-python-ci/",
          title: "Build Recovered to SUCCESS",
          caption: "Live capture from port 8000: Build indicator recovers to solid BLUE (SUCCESS) once tests pass."
        }
      }
    ]
  },
  lab5: {
    id: "lab5",
    badge: "Lab 5",
    title: "Lab 5: Modern DevOps — Declarative Pipeline (Jenkinsfile)",
    objective: "Transition students from legacy Freestyle jobs to modern Pipeline as Code (Declarative Pipelines).",
    whyPipelines: [
      "Version Controlled: The pipeline logic is committed in Git right next to application source code.",
      "Stage View Visuals: Jenkins web UI renders colorful visual stages showing exactly where code is building or failing.",
      "Enterprise Grade: Supports automated rollback, parallel stage execution, and deployment approvals."
    ],
    steps: [
      {
        id: "lab5-step1",
        number: "1",
        title: "Click 'New Item' -> Select 'Pipeline'",
        subtitle: "Name project '04-declarative-pipeline' and choose Pipeline archetype.",
        colorTheme: {
          primary: "#6366f1",
          gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          glow: "rgba(99, 102, 241, 0.4)",
          text: "#a5b4fc",
          cardBorder: "rgba(99, 102, 241, 0.35)",
          bgAccent: "rgba(99, 102, 241, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Click",
            target: "New Item",
            afterTarget: "-> Enter Name:",
            badge: "05-pipeline-demo"
          },
          {
            type: "item",
            text: "Select",
            target: "Pipeline",
            afterTarget: "(NOT Freestyle!) and click",
            secondTarget: "OK"
          }
        ],
        screenshot: {
          src: "/images/lab5_01_new_item_pipeline.png",
          alt: "New Item Pipeline Archetype",
          url: "http://localhost:8000/newJob",
          title: "Select Pipeline Archetype",
          caption: "Live capture from port 8000: Select Pipeline project type for Declarative Jenkinsfile automation."
        }
      },
      {
        id: "lab5-step2-3",
        number: "2 & 3",
        title: "Scroll to 'Pipeline' & Set Definition",
        subtitle: "Configure Jenkins to execute a Pipeline script.",
        colorTheme: {
          primary: "#0ea5e9",
          gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
          glow: "rgba(14, 165, 233, 0.4)",
          text: "#38bdf8",
          cardBorder: "rgba(14, 165, 233, 0.35)",
          bgAccent: "rgba(14, 165, 233, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Scroll down to the",
            badge: "Pipeline",
            afterBadge: "section."
          },
          {
            type: "item",
            text: "Set Definition dropdown to",
            target: "Pipeline script"
          }
        ],
        screenshot: {
          src: "/images/lab5_02_pipeline_script_editor.png",
          alt: "Pipeline Definition Section",
          url: "http://localhost:8000/job/05-pipeline-demo/configure",
          title: "Pipeline Script Definition",
          caption: "Live capture from port 8000: Set Definition to Pipeline script to enable in-line Groovy DSL editing."
        }
      },
      {
        id: "lab5-step4",
        number: "4",
        title: "Paste Complete Declarative Pipeline Script",
        subtitle: "Define 4 stages: Environment Check, Code Compilation, Automated Tests, Simulated Deployment.",
        colorTheme: {
          primary: "#8b5cf6",
          gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
          glow: "rgba(139, 92, 246, 0.45)",
          text: "#c084fc",
          cardBorder: "rgba(139, 92, 246, 0.4)",
          bgAccent: "rgba(139, 92, 246, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Paste the complete Declarative Pipeline script into the Script textarea:"
          }
        ],
        codeSnippets: {
          windows: {
            title: "Declarative Pipeline (Jenkinsfile)",
            code: `pipeline {
    agent any

    stages {
        stage('Environment Check') {
            steps {
                echo '=== Stage 1: Inspecting Runtime Environment ==='
                script {
                    if (isUnix()) {
                        sh 'uname -a'
                        sh 'python3 --version || python --version'
                    } else {
                        bat 'ver'
                        bat 'python --version'
                    }
                }
            }
        }

        stage('Code Compilation') {
            steps {
                echo '=== Stage 2: Compiling Python Bytecode ==='
                script {
                    if (isUnix()) {
                        sh 'python3 -m compileall sample-app || python -m compileall .'
                    } else {
                        bat 'python -m compileall .'
                    }
                }
            }
        }

        stage('Automated Tests') {
            steps {
                echo '=== Stage 3: Executing Unit Test Suite ==='
                script {
                    if (isUnix()) {
                        sh 'python3 -m unittest discover sample-app || python -m unittest'
                    } else {
                        bat 'python -m unittest'
                    }
                }
            }
        }

        stage('Simulated Deployment') {
            steps {
                echo '=== Stage 4: Deploying to Staging Environment ==='
                echo 'Application verified. Deployment simulated successfully.'
            }
        }
    }

    post {
        success {
            echo '====================================================='
            echo 'PIPELINE SUCCESS: All stages completed successfully!'
            echo '====================================================='
        }
        failure {
            echo '====================================================='
            echo 'PIPELINE FAILED: Errors encountered. Review logs.'
            echo '====================================================='
        }
    }
}`
          },
          linux: {
            title: "Declarative Pipeline (Jenkinsfile)",
            code: `pipeline {
    agent any

    stages {
        stage('Environment Check') {
            steps {
                echo '=== Stage 1: Inspecting Runtime Environment ==='
                script {
                    if (isUnix()) {
                        sh 'uname -a'
                        sh 'python3 --version || python --version'
                    } else {
                        bat 'ver'
                        bat 'python --version'
                    }
                }
            }
        }

        stage('Code Compilation') {
            steps {
                echo '=== Stage 2: Compiling Python Bytecode ==='
                script {
                    if (isUnix()) {
                        sh 'python3 -m compileall sample-app || python -m compileall .'
                    } else {
                        bat 'python -m compileall .'
                    }
                }
            }
        }

        stage('Automated Tests') {
            steps {
                echo '=== Stage 3: Executing Unit Test Suite ==='
                script {
                    if (isUnix()) {
                        sh 'python3 -m unittest discover sample-app || python -m unittest'
                    } else {
                        bat 'python -m unittest'
                    }
                }
            }
        }

        stage('Simulated Deployment') {
            steps {
                echo '=== Stage 4: Deploying to Staging Environment ==='
                echo 'Application verified. Deployment simulated successfully.'
            }
        }
    }

    post {
        success {
            echo '====================================================='
            echo 'PIPELINE SUCCESS: All stages completed successfully!'
            echo '====================================================='
        }
        failure {
            echo '====================================================='
            echo 'PIPELINE FAILED: Errors encountered. Review logs.'
            echo '====================================================='
        }
    }
}`
          }
        },
        screenshot: {
          src: "/images/lab5_02_pipeline_script_editor.png",
          alt: "Declarative Pipeline Script Editor",
          url: "http://localhost:8000/job/05-pipeline-demo/configure",
          title: "Pipeline Script Editor View",
          caption: "Live capture from port 8000: Declarative pipeline structure with Build, Test, and Deploy stages."
        }
      },
      {
        id: "lab5-step5-6",
        number: "5 & 6",
        title: "Click Save & Click 'Build Now'",
        subtitle: "Trigger the Declarative Pipeline engine.",
        colorTheme: {
          primary: "#ec4899",
          gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
          glow: "rgba(236, 72, 153, 0.45)",
          text: "#f472b6",
          cardBorder: "rgba(236, 72, 153, 0.4)",
          bgAccent: "rgba(236, 72, 153, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Click",
            target: "Save",
            afterTarget: "at the bottom."
          },
          {
            type: "item",
            text: "Click",
            target: "Build Now",
            afterTarget: "from the left menu."
          }
        ],
        screenshot: {
          src: "/images/lab5_03_stage_view_green.png",
          alt: "Trigger Pipeline Build Now",
          url: "http://localhost:8000/job/05-pipeline-demo/",
          title: "Trigger Pipeline Execution",
          caption: "Live capture from port 8000: Click 'Build Now' to run Jenkins Pipeline DSL engine."
        }
      },
      {
        id: "lab5-step7",
        number: "7",
        title: "Observe Graphical Stage View (Green Stages)",
        subtitle: "Watch the visual pipeline columns turn green with duration metrics.",
        colorTheme: {
          primary: "#10b981",
          gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          glow: "rgba(16, 185, 129, 0.5)",
          text: "#34d399",
          cardBorder: "rgba(16, 185, 129, 0.4)",
          bgAccent: "rgba(16, 185, 129, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Observe the Stage View on the dashboard with green columns:",
            badge: "Build -> Test -> Deploy (PASSED)"
          }
        ],
        screenshot: {
          src: "/images/lab5_03_stage_view_green.png",
          alt: "Live Stage View Green Stages",
          url: "http://localhost:8000/job/05-pipeline-demo/",
          title: "Live Graphical Stage View from Port 8000",
          caption: "Live capture from port 8000: Declarative pipeline Stage View rendering green status for all stages."
        }
      },
      {
        id: "lab5-step8",
        number: "8",
        title: "Hover Stage Box & Inspect Stage-Specific Logs",
        subtitle: "Click 'Logs' on any stage box to isolate stage output.",
        colorTheme: {
          primary: "#3b82f6",
          gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          glow: "rgba(59, 130, 246, 0.45)",
          text: "#60a5fa",
          cardBorder: "rgba(59, 130, 246, 0.4)",
          bgAccent: "rgba(59, 130, 246, 0.08)"
        },
        instructions: [
          {
            type: "item",
            text: "Hover over any stage box and click",
            target: "Logs",
            afterTarget: "to view isolated step commands and outputs."
          }
        ],
        screenshot: {
          src: "/images/lab5_04_stage_logs_inspection.png",
          alt: "Live Pipeline Console Output and Logs",
          url: "http://localhost:8000/job/05-pipeline-demo/1/console",
          title: "Live Pipeline Stage Execution Output",
          caption: "Live output captured directly from port 8000 showing full pipeline execution and Finished: SUCCESS."
        }
      }
    ]
  }
};
