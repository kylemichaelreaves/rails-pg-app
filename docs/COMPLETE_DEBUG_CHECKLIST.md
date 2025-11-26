# Complete Debugging Checklist

## Issue: Authentication Still Not Working

Based on the debug script output, here's exactly what to do:

---

## ⚠️ CRITICAL: Server Must Be Restarted

The debug script shows: **"Middleware not loaded - RESTART SERVER REQUIRED"**

### 🔴 Step 1: RESTART THE RAILS SERVER (REQUIRED!)

1. **Find your Rails server terminal window**
2. **Press `Ctrl+C`** to stop it
3. **Wait for it to fully stop** (you should see the command prompt again)
4. **Start it again**:
   ```bash
   bin/dev
   # OR
   rails s
   ```

**This is MANDATORY!** Config changes in `config/application.rb` don't take effect until server restarts.

---

## ✅ Step 2: Verify Middleware Loaded

After restarting, run:

```bash
ruby debug_auth.rb
```

**You should now see:**

```
MIDDLEWARE STACK
ActionDispatch::Cookies: ✅
ActionDispatch::Session: ✅
Rack::Cors: ✅

SESSION TEST
Session functionality: ✅

SUMMARY
✅ All checks passed! ✅
```

**If you still see ❌ for middleware**, the server wasn't fully restarted. Try:

```bash
# Kill any lingering processes
lsof -ti:3000 | xargs kill -9

# Start fresh
bin/dev
```

---

## 🌐 Step 3: Test in Browser

### A. Open Browser DevTools (F12)

1. **Go to Console tab**
2. **Paste and run** the contents of `browser_debug.js`:
   ```javascript
   // Just copy-paste the entire file contents
   ```

3. **Check the output** - should see:
    - ✅ Backend reachable: true
    - ✅ Backend status: 200 or 401 (both OK at this point)

### B. Test Registration

1. **Navigate to** `http://localhost:3000/`
2. **Should redirect to** `/login` automatically
3. **Click "Register"** button in navbar
4. **Fill in the form**:
    - Email: `test@example.com`
    - Password: `password123`
    - Confirm: `password123`
5. **Submit**

### C. Check Network Tab (IMPORTANT!)

While submitting registration:

1. **Open DevTools > Network tab**
2. **Submit the registration form**
3. **Look for the request to** `/api/v1/register`
4. **Check the response**:

**Good Response (201 Created):**

```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "role": "regular"
  }
}
```

- ✅ Should redirect to `/api/v1/properties`
- ✅ Should see navigation tabs
- ✅ Should see user email in navbar

**Bad Response (500 Error):**

```
ActionDispatch::Request::Session::DisabledSessionError
```

- ❌ Server was NOT restarted
- ❌ Go back to Step 1

**Bad Response (401/422):**

- Check the response body for error details
- May be validation error or CORS issue

---

## 🔧 Step 4: Check Browser Cookies

After successful registration:

1. **DevTools > Application tab > Cookies**
2. **Look for** `http://localhost:3000`
3. **Should see cookie:** `_rails_pg_app_session`

If cookie is missing:

- ❌ CORS not configured (but we did this)
- ❌ Server not sending cookie (middleware issue)
- ❌ Browser blocking cookie (unlikely on localhost)

---

## 📊 Step 5: Test API Directly (Optional)

If browser test doesn't work, test the API directly:

```bash
ruby test_api_registration.rb
```

**Expected output:**

```
Status: 201 Created
Headers:
  set-cookie: _rails_pg_app_session=...
Body:
{
  "user": { ... }
}
✅ Registration successful!
```

---

## 🐛 Common Issues & Solutions

### Issue: "Session disabled" error persists after restart

**Solution:**

1. Check you edited the RIGHT file: `config/application.rb`
2. Make sure you saved the file
3. Try a hard restart:
   ```bash
   # Kill everything
   pkill -f puma
   pkill -f rails
   
   # Clear temp files
   rm -rf tmp/cache/*
   
   # Restart
   bin/dev
   ```

### Issue: Blank page in browser

**Solution:**

1. Check if React app is building
2. Look for Vite errors in the terminal
3. Check browser console for JavaScript errors
4. Try force refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Issue: CORS errors in browser console

**Solution:**

1. Verify `config/application.rb` has CORS config
2. Make sure server was restarted
3. Check origins include your frontend URL:
    - `http://localhost:3000`
    - `http://127.0.0.1:3000`

### Issue: Cookie not being set

**Solution:**

1. Check Network tab response headers for `Set-Cookie`
2. If missing, middleware not loaded (restart server)
3. If present but not saved, check browser privacy settings

---

## 📋 Verification Checklist

Before saying "it's not working," verify ALL of these:

- [ ] Server has been stopped and restarted (Ctrl+C then bin/dev)
- [ ] `ruby debug_auth.rb` shows all ✅ checks passed
- [ ] Browser can reach `http://localhost:3000/`
- [ ] Browser DevTools shows no JavaScript errors
- [ ] Network tab shows request to `/api/v1/register` (not `/register`)
- [ ] Response from server is visible in Network tab
- [ ] If 500 error, check Rails server output terminal
- [ ] If 401/422 error, check response body for details

---

## 🆘 If Still Not Working

Run these commands and share output:

```bash
# 1. Debug script
ruby debug_auth.rb > debug_output.txt

# 2. Test API
ruby test_api_registration.rb > api_test.txt

# 3. Recent logs
tail -50 log/development.log > recent_logs.txt

# 4. Share these three files
cat debug_output.txt
cat api_test.txt  
cat recent_logs.txt
```

Also share:

- Any error messages from browser console (F12)
- Screenshots of Network tab showing the failed request
- Terminal output from when server started

---

## 🎯 Expected Working Flow

When everything works correctly:

1. **Start server** → See "Listening on http://127.0.0.1:3000"
2. **Run debug script** → All checks ✅
3. **Open browser** → Auto-redirect to `/login`
4. **Click Register** → Form appears
5. **Submit form** → Network request shows 201 Created
6. **Auto-redirect** → To `/api/v1/properties`
7. **See navbar** → With user email and navigation tabs
8. **Refresh page** → Stay logged in (session persists)

If ANY step fails, that's where the problem is!

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Restart server (REQUIRED!)
# Press Ctrl+C in terminal, then:
bin/dev

# 2. Verify
ruby debug_auth.rb

# 3. Test in browser
open http://localhost:3000/

# 4. If issues, check
tail -50 log/development.log
```

**Remember: CONFIG CHANGES = SERVER RESTART** ⚡

