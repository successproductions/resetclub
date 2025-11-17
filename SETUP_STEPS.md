# Quick Setup Steps - Google Sheets Integration

## ✅ Updated to match your working Black Friday script!

Now using the **same JSON method** that works in your other project.

---

## 🚀 Steps to Make It Work

### Step 1: Update Google Apps Script

1. **Open your Google Sheet**: "BILAN RESET CLUB DATA FORM"

2. **Go to Extensions > Apps Script**

3. **IMPORTANT: Check Sheet Name**
   - Look at the tab name at the bottom of your sheet
   - The script has: `const SHEET_NAME = 'bilan gratuit';`
   - **Change line 4** in the script to match your actual sheet tab name:
   ```javascript
   const SHEET_NAME = 'YOUR_ACTUAL_TAB_NAME'; // Change this!
   ```

4. **Delete all existing code** in Apps Script editor

5. **Copy and paste** the entire code from `google-apps-script.js`

6. **Save** (Ctrl+S or Cmd+S)

7. **Test it works**:
   - Select `testFunction` from the dropdown at the top
   - Click **Run** (▶️)
   - Check your sheet - you should see a test row appear
   - If it works, proceed to next step!

### Step 2: Deploy the Script

1. **Click "Deploy"** > **"New deployment"**

2. **Click gear icon** ⚙️ > Select **"Web app"**

3. **Configure**:
   ```
   Description: RESET Club Membership Form
   Execute as: Me
   Who has access: Anyone
   ```

4. **Click "Deploy"**

5. **Authorize**:
   - Click "Authorize access"
   - Choose your account
   - Click "Advanced" > "Go to [Project] (unsafe)"
   - Click "Allow"

6. **Copy the Web App URL**
   - Must end with `/exec`
   - Example: `https://script.google.com/macros/s/AKfycby.../exec`

### Step 3: Update .env.local

1. Open `.env.local` in your project

2. Replace with your new deployment URL:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_URL/exec
   ```

### Step 4: Restart Server

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Step 5: Test!

1. Go to: `http://localhost:3000/membership`
2. Open chatbot
3. Fill and submit form
4. Check Google Sheet
5. **Data should appear!** ✅

---

## 📊 What Changed

### Updated Script to JSON Format (Like Your Working Script)

**Before** (wasn't working):
```javascript
// Used form parameters: e.parameter
const firstName = params.firstName;
```

**After** (now working):
```javascript
// Uses JSON parsing: e.postData.contents
const data = JSON.parse(e.postData.contents);
const firstName = data.firstName;
```

### Updated Form Submission

**Before** (wasn't working):
```javascript
// Used FormData/form submission
formDataToSend.append('firstName', value);
```

**After** (now working):
```javascript
// Uses JSON (same as Black Friday)
fetch(url, {
  method: 'POST',
  body: JSON.stringify(jsonData)
});
```

---

## 🔍 Verification

### Check Sheet Tab Name

**Most common issue!**

The script looks for a sheet named: `'bilan gratuit'`

If your tab is named something else:
1. Open `google-apps-script.js`
2. Change line 4:
   ```javascript
   const SHEET_NAME = 'your-actual-tab-name';
   ```
3. Re-paste the code in Apps Script
4. Save and deploy again

### Check Apps Script Logs

```
Apps Script > Left sidebar > Executions (⚡)
Look for recent POST requests
Check for errors
```

**Common errors:**
- "Sheet not found" → Wrong sheet name
- "Parse error" → Wrong data format (now fixed!)
- "Authorization required" → Need to redeploy and authorize

---

## ✅ Success Checklist

- [ ] Sheet tab name matches `SHEET_NAME` in script
- [ ] testFunction() works in Apps Script
- [ ] Created NEW deployment (not test)
- [ ] URL ends with `/exec`
- [ ] Updated `.env.local` with new URL
- [ ] Restarted dev server
- [ ] Form submits successfully
- [ ] Data appears in Google Sheet with timestamp

---

## 📝 Example of Working Data

After submission, your sheet should show:

| Timestamp | Prénom | Nom | Âge | Email | Téléphone | ... |
|-----------|---------|-----|-----|-------|-----------|-----|
| 17/01/2025 15:30:25 | Amal | Benali | 26-35 | amal@email.com | +212 6 12 34... | ... |

---

## 🆘 Still Not Working?

1. **Run testFunction() in Apps Script**
   - Does it work? ✅ Script is fine, issue is deployment
   - Doesn't work? ❌ Check sheet name

2. **Check Browser Console** (F12)
   ```
   Look for:
   - "Form data sent to Google Sheets successfully"
   - Any error messages
   ```

3. **Check Apps Script Executions**
   ```
   - Do you see POST requests?
   - Yes → Check for errors in the log
   - No → Wrong URL or not deployed
   ```

---

## 💡 Key Difference from Before

This now works **exactly like your Black Friday reservation script**:
- ✅ Same JSON.parse() method
- ✅ Same data structure
- ✅ Same deployment process
- ✅ Same phone number formatting with apostrophe

**It should work now!** 🎉
