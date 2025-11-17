# Troubleshooting: Data Not Saving to Google Sheets

## ✅ You mentioned: testFunction() works but local form doesn't

This means your script is working correctly, but the web deployment needs to be fixed.

---

## 🔧 Fix: Create a NEW Deployment (Important!)

### The Problem
You might be using a "Test deployment" URL instead of a proper deployment URL.

### The Solution

#### Step 1: Check Your Current URL

Look at your `.env.local` file:
```
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbx.../exec
```

#### Step 2: Create a NEW Deployment (Not Test!)

1. **Open Apps Script editor** (Extensions > Apps Script)

2. **Click "Deploy" button** (top right) > **"New deployment"**

3. **IMPORTANT**: Click the gear icon ⚙️ next to "Select type"

4. **Choose "Web app"**

5. **Configure these settings**:
   ```
   Description: RESET Club Form API v1
   Execute as: Me (your-email@gmail.com)
   Who has access: Anyone
   ```

6. **Click "Deploy"** (not "Test deployments"!)

7. **Authorize the app**:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced"
   - Click "Go to [Project Name] (unsafe)" - it's safe, it's your script
   - Click "Allow"

8. **Copy the NEW Web App URL**
   - It should look like: `https://script.google.com/macros/s/AKfycby.../exec`
   - This is different from test URLs!

#### Step 3: Update .env.local

1. Open `.env.local` in your project
2. Replace the URL:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_URL=YOUR_NEW_DEPLOYMENT_URL
   ```

#### Step 4: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

---

## 🔍 Verify Your Deployment

### Check if you're using the CORRECT deployment URL:

**❌ WRONG - Test Deployment URL:**
```
https://script.google.com/macros/s/.../dev
                                        ^^^
                                      (ends with /dev)
```

**✅ CORRECT - Production Deployment URL:**
```
https://script.google.com/macros/s/.../exec
                                        ^^^^
                                      (ends with /exec)
```

---

## 📝 Step-by-Step Testing

### Test 1: Verify Script Works
```javascript
// In Apps Script editor
// Select testFunction from dropdown
// Click Run ▶️
// Check your sheet - data should appear
```
✅ **You confirmed this works!**

### Test 2: Verify Deployment
1. Open your deployment URL in a browser
2. You should see a message (even an error is okay)
3. If you get "Not Found" - your URL is wrong

### Test 3: Test from Website
```bash
npm run dev
# Fill and submit form
# Check Google Sheet
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Authorization required" in Apps Script logs

**Solution:**
```
1. Apps Script > Deploy > Manage deployments
2. Click pencil icon ✏️ next to your deployment
3. Click "Deploy"
4. Authorize again when prompted
```

### Issue 2: "Access denied" errors

**Solution:**
```
1. Make sure "Who has access" is set to "Anyone"
2. Make sure "Execute as" is set to "Me"
3. Create a NEW deployment
```

### Issue 3: Script works in editor but not from website

**Solution:**
```
1. You're probably using Test Deployment URL
2. Create a NEW deployment as shown above
3. Make sure URL ends with /exec not /dev
```

### Issue 4: Data appears but in wrong format

**Solution:**
```
1. Clear the sheet: Run clearAllData() function
2. Submit form again
3. Headers will be recreated automatically
```

---

## 🔎 Debugging Steps

### 1. Check Apps Script Logs

```
Apps Script Editor > Left sidebar > Executions (⚡)
Look for recent POST requests
Check if there are any errors
```

### 2. Check Browser Console

```
Press F12 in your browser
Go to Console tab
Look for errors when submitting form
```

### 3. Verify Environment Variable

```bash
# In your terminal
echo $NEXT_PUBLIC_GOOGLE_SHEETS_URL
# Should show your URL
```

Or check in your code:
```javascript
console.log(process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL);
```

### 4. Test with Network Tab

```
1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit the form
4. Look for request to script.google.com
5. Check if request was sent
```

---

## ✅ Final Checklist

- [ ] Used "New deployment" (not Test deployment)
- [ ] URL ends with `/exec` (not `/dev`)
- [ ] "Who has access" set to "Anyone"
- [ ] "Execute as" set to "Me"
- [ ] Script authorized properly
- [ ] `.env.local` updated with correct URL
- [ ] Development server restarted
- [ ] testFunction() works in Apps Script ✅ (You confirmed!)
- [ ] Form submission from website saves to sheet

---

## 🆘 Still Not Working?

Try this alternative approach:

### Option 1: Check if data is being sent

Add this to your form component temporarily:

```javascript
console.log('Sending to:', googleSheetsUrl);
console.log('Data:', Object.fromEntries(params));
```

### Option 2: Create a completely NEW deployment

1. **Archive old deployment**:
   - Deploy > Manage deployments
   - Click archive icon 🗄️

2. **Create fresh deployment**:
   - Deploy > New deployment
   - Follow steps above

3. **Use the new URL**

### Option 3: Test with a simple HTML form

Create a test file:

```html
<form method="POST" action="YOUR_GOOGLE_SCRIPT_URL" target="_blank">
  <input name="firstName" value="Test">
  <input name="email" value="test@test.com">
  <button type="submit">Test</button>
</form>
```

If this works, the issue is with your React code.
If this doesn't work, the issue is with the deployment.

---

## 📞 Quick Check

Run these commands:

```bash
# 1. Check environment variable
cat .env.local

# 2. Restart server
npm run dev

# 3. Check logs while submitting
# (Open Console in browser F12)
```

---

## 💡 Most Likely Solution

Based on your description (testFunction works but website doesn't):

**You're using a Test Deployment URL!**

1. Go to Apps Script
2. Click Deploy > NEW deployment (not manage)
3. Set "Who has access" to "Anyone"
4. Copy the URL ending in `/exec`
5. Update `.env.local`
6. Restart dev server
7. Try again

**This should fix it!** 🎉
