# 🛡️ T&C Red Flag Scanner

A Chrome Extension that instantly scans **Terms & Conditions / Terms of Service** and highlights **dangerous or risky clauses** in simple language.

This tool helps users understand what they are agreeing to — before clicking **Accept**.

---

## 🚀 Features

- 🔍 Scan pasted Terms & Conditions text  
- ⚡ Auto-detect T&C from the current website  
- 🚨 Highlights red flags like:
  - Data sharing with third parties
  - Forced arbitration (no right to sue)
  - Account termination without notice
  - Content ownership & license issues
- 📊 Safety score (0–100)
- 🎨 Clean, animated, mobile-friendly UI
- 💸 No paid APIs (100% free)
- 🔒 Runs fully in your browser

---

## 🧠 How It Works

1. User pastes Terms & Conditions text  
   **OR**
2. Clicks **Auto-Detect T&C on This Page**
3. The extension:
   - Extracts legal text
   - Matches risky legal patterns
   - Shows up to **3 major red flags**
4. Displays:
   - Safety score
   - Risk level (Safe / Caution / High Risk)
   - Explanation of each clause

---

## 📂 Project Structure

```
T&C-Red-Flag-Extension/
│
├── manifest.json     # Chrome extension configuration
├── popup.html        # Extension UI
├── popup.js          # Scanning & detection logic
├── icon.png          # Extension icon
└── README.md         # Project documentation
```

---

## 🛠️ Technologies Used

- **HTML** – Structure of popup  
- **CSS** – Styling, gradients, animations  
- **JavaScript** – Logic & pattern detection  
- **Chrome Extensions API (Manifest V3)**

---

## 🔧 How to Install the Extension (Developer Mode)

1. Open **Google Chrome**
2. Go to: `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder
6. Extension is installed 🎉

---

## 🔒 Privacy & Security

- ❌ No data sent to servers  
- ❌ No tracking  
- ✅ All analysis happens locally  

---



## 🌱 Future Improvements

- AI-based legal summarization  
- PDF scanning  
- Multi-language support  
- Firefox & Edge versions  

---

## 📄 License

MIT License — free to use, modify, and share.
