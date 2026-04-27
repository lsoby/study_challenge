# StudySync v2.0

## What's new
- **Subjects** — add colour-coded subjects, track hours per subject, select before starting timer
- **Background-safe timer** — uses real timestamps so the clock never drifts when you minimize/switch tabs
- **Pause button** — pause and resume sessions mid-way
- **Auto-save on close** — if you accidentally close the tab, the running timer is saved and restored
- **Daily goal** — shows today's target (defaults to weekly/7, fully editable)
- **Session history** — full log of all sessions with subject filter
- **Global leaderboard** — see all users ranked by weekly hours with live sync

## Setup (Firebase)
1. Go to https://console.firebase.google.com and create a project
2. Enable Realtime Database (start in test mode)
3. Register a Web App and copy the config
4. Replace the `firebaseConfig` object in `index.html` with your config

## Run locally
```
npx serve .
# or
python3 -m http.server 8080
```

## Deploy
Upload all files to any static host (Netlify, Vercel, GitHub Pages, Firebase Hosting).
The app is a PWA — users can install it from the browser.
