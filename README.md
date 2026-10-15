# Profile & Settings — Python Flask app

A mobile-style web demo based on the eight supplied screenshots. It runs as a Python Flask application and can be shared as a public website.

## Included screens
- My Profile navigation and avatar selection
- Edit Profile with validation and browser-local saving
- Settings and delete-demo-data confirmation
- Notification Setting with switches saved automatically
- Password Manager with show/hide and confirmation validation
- Help Center with searchable FAQs and category filtering
- Contact Us with expandable placeholder channels
- Privacy Policy with sample demo-specific text
- Logout confirmation and welcome page

The supplied profile portrait is included as a cropped avatar. Fonts and some icons use local system alternatives, so appearance can vary slightly from the mockups. FAQ and privacy placeholder copy has been replaced with readable demo text.

## Run locally on Windows
Install Python 3.11 or newer from https://www.python.org/downloads/ and select “Add Python to PATH” during installation.

1. Extract this ZIP.
2. Open the extracted settings_app folder containing app.py and requirements.txt. Open Command Prompt in that folder.
3. Run:

```bat
py -m venv .venv
.venv\Scripts\activate
python -m pip install -r requirements.txt
python app.py
```

4. Open http://127.0.0.1:5000 in your browser.
5. Stop the app with Ctrl+C.

If using PowerShell and activation is blocked, avoid changing execution policy and run:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

If `py` is unavailable, use `python` for creating the virtual environment.

## Run locally on macOS/Linux

```sh
cd settings_app
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python app.py
```

Open http://127.0.0.1:5000. If port 5000 is already in use, run `python -m flask --app app run --port 5001` and open http://127.0.0.1:5001.

## Host online using GitHub + Render

1. Create an empty GitHub repository, for example `profile-settings-demo`.
2. Upload the CONTENTS of settings_app into the repository root. app.py, requirements.txt, render.yaml, templates/, and static/ must be at the root. Do not upload .venv or __pycache__.
3. Open https://render.com and sign in.
4. Select New > Web Service, connect GitHub, and select your repository.
5. Use the Python runtime, with these exact values:
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app --bind 0.0.0.0:$PORT`
   - Health check path: `/health`
   - Root directory: leave blank when app.py is at the repository root.
6. Select an available instance plan. Free is suitable for a demonstration if available for your account.
7. Deploy and wait for a successful build.
8. Render gives you an HTTPS address such as https://your-service-name.onrender.com. Share YOUR actual address with others.

If you uploaded the settings_app folder itself instead of its contents, set Root Directory to `settings_app`.

The included render.yaml can also be used through Render’s Blueprint workflow.

Official instructions: https://render.com/docs/deploy-flask
Free service limits: https://render.com/docs/free

Render’s free services sleep after 15 minutes without traffic; waking can take about a minute. Plan availability and limits can change. Check the displayed plan before deploying.

## What the demo does and does not do

Each browser saves its own profile, avatar and notification settings using localStorage. They are not stored centrally and do not sync between devices. Browser storage can be cleared or blocked. Notifications do not send real messages.

Password Manager validates input only; it never stores, sends, or changes a real password. Logout navigates to a welcome screen and is not authentication. Delete Account clears this demo’s own local data. Contact channels are placeholders. Favourite and Payment Method display an informational message because their designs were not supplied.

To turn this into a real account application, add server-side authentication, password hashing, a database, authorization, CSRF protection, password reset delivery and actual support links. Replace the sample privacy/terms text before a customer launch.

## Customize

- Python routes: app.py
- Screen markup and text: templates/screen.html
- Colors, dimensions and typography: static/style.css
- Browser interactions: static/app.js
- Default avatar: static/avatar.png

## Troubleshooting

- requirements.txt not found: your terminal is in the wrong folder. Open the folder containing BOTH app.py and requirements.txt.
- ModuleNotFoundError: install requirements using the same Python interpreter that runs app.py.
- 404: open `/`, `/profile`, `/settings`, `/notifications`, `/password`, `/help`, `/help/contact`, `/privacy`, `/logout` or `/welcome`.
- Render cannot find app:app: check the repository root or Root Directory setting.
