# StudySync 📚

Study together. Stay accountable. Real-time progress tracking with friends.

## Features
- ✅ Accounts — sign up / sign in with username + password
- ✅ Custom weekly goal (any number of hours)
- ✅ Customizable week reset day (any day of the week)
- ✅ Study timer with session labels
- ✅ Daily bar chart showing progress through the week
- ✅ Rooms — create shared rooms, invite friends by username
- ✅ Real-time sync — see everyone's progress update live
- ✅ PWA — installable as an app on iOS, Android, and desktop
- ✅ Offline fallback — works without internet using localStorage

---

## 🚀 Setup (5 minutes)

### 1. Create a Firebase project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → give it a name (e.g. "StudySync")
3. Disable Google Analytics (optional) → **Create project**

### 2. Add a Web App

1. In your project dashboard, click the **</>** (Web) icon
2. Register your app (any nickname)
3. Copy the `firebaseConfig` object shown

### 3. Enable Realtime Database

1. In the left sidebar → **Build → Realtime Database**
2. Click **Create Database**
3. Choose a region close to you
4. Start in **test mode** (you can add security rules later)

### 4. Paste your config into index.html

Open `index.html` and find this section (around line 200):

```js
const firebaseConfig = {
  apiKey: "AIzaSyDEMO_REPLACE_WITH_YOUR_KEY",
  authDomain: "studysync-demo.firebaseapp.com",
  databaseURL: "https://studysync-demo-default-rtdb.firebaseio.com",
  ...
};
```

Replace it with your actual config from the Firebase console.

### 5. Host it (free options)

**Option A — Firebase Hosting (recommended)**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # select your project, set public dir to "."
firebase deploy
```

**Option B — Netlify**
- Drag & drop the whole folder at [https://app.netlify.com/drop](https://app.netlify.com/drop)

**Option C — GitHub Pages**
- Push the folder to a GitHub repo → Settings → Pages → Deploy from main branch

---

## 📱 Install as an App

### iOS (Safari)
1. Open the hosted URL in Safari
2. Tap the **Share** button → **Add to Home Screen**

### Android (Chrome)
1. Open the hosted URL in Chrome
2. Tap the menu (⋮) → **Add to Home screen** or look for the install banner

### Desktop (Chrome / Edge)
1. Open the hosted URL
2. Click the install icon in the address bar (or menu → Install StudySync)

---

## 🔒 Firebase Security Rules (recommended after testing)

In your Firebase console → Realtime Database → Rules, paste:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "rooms": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "sessions": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```

> Note: The app currently uses simple username/password stored in the database (no Firebase Auth). For a production app, consider adding Firebase Authentication.

---

## 📁 File Structure

```
studysync/
├── index.html      ← Main app (all HTML/CSS/JS)
├── manifest.json   ← PWA manifest
├── sw.js           ← Service worker (offline support)
├── icon-192.svg    ← App icon (small)
├── icon-512.svg    ← App icon (large)
└── README.md       ← This file
```

---

## 🛠 Offline Mode

If Firebase isn't configured or the user is offline, the app automatically falls back to `localStorage`. Data will sync to Firebase the next time the user is online.
