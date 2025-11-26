# Authentication Fix Verification Checklist

## ✅ What Was Fixed

### 1. Session Middleware Enabled

- [x] Added `ActionDispatch::Cookies` middleware
- [x] Added `ActionDispatch::Session::CookieStore` middleware
- [x] Configured session cookie key: `_rails_pg_app_session`

### 2. CORS Configuration

- [x] Enabled CORS with `rack-cors` gem
- [x] Allowed localhost origins (ports 3000 and 5173)
- [x] Enabled credentials support (`credentials: true`)
- [x] Allowed all necessary HTTP methods

### 3. ApplicationController Updates

- [x] Kept `ActionController::API` as base class
- [x] Included `ActionController::Cookies` module
- [x] Included `ActionController::RequestForgeryProtection` module
- [x] Set CSRF protection to `:null_session`
- [x] Removed `helper_method` (not available in API mode)
- [x] Added `current_user` and `logged_in?` helper methods
- [x] Added `require_authentication` and `require_admin` filters

### 4. Controller Cleanup

- [x] Removed redundant `skip_before_action` from SessionsController
- [x] Removed redundant `skip_before_action` from RegistrationsController

### 5. Frontend Routing & UI

- [x] Added Home component with authentication-based redirect
- [x] Added index route to handle root path (`/`)
- [x] Updated NavBar to show/hide tabs based on auth state
- [x] Added user menu with logout functionality
- [x] Added Login/Register buttons for unauthenticated users

## 🧪 How to Test

### Option 1: Using the Browser

1. **Start the Rails server** (if not already running):
   ```bash
   bin/dev
   # or
   rails s
   ```

2. **Open your frontend** (should already be running on port 5173)

3. **Try to register**:
    - Navigate to registration page
    - Enter email and password
    - Submit the form
    - Should see success and be logged in

4. **Verify session persistence**:
    - Refresh the page
    - Should still be logged in (session cookie persists)

5. **Check browser DevTools**:
    - Open Network tab
    - Look at registration request
    - Check Response Headers for `Set-Cookie`
    - Should see `_rails_pg_app_session` cookie

### Option 2: Using the Test Script

```bash
ruby test_api_registration.rb
```

Expected output:

```
============================================================
Testing Registration Endpoint
============================================================
Email: test_1234567890@example.com
Sending request to: http://127.0.0.1:3000/api/v1/register

Status: 201 Created
Headers:
  set-cookie: _rails_pg_app_session=...; path=/; HttpOnly

Body:
{
  "user": {
    "id": 1,
    "email": "test_1234567890@example.com",
    "role": "regular",
    "created_at": "...",
    "updated_at": "..."
  }
}
============================================================
✅ Registration successful!
```

### Option 3: Using cURL

```bash
# Register new user
curl -v -X POST http://127.0.0.1:3000/api/v1/register \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "user": {
      "email": "curl_test@example.com",
      "password": "password123",
      "password_confirmation": "password123"
    }
  }'

# Check current user (should work with saved cookies)
curl -X GET http://127.0.0.1:3000/api/v1/me \
  -b cookies.txt

# Logout
curl -X DELETE http://127.0.0.1:3000/api/v1/logout \
  -b cookies.txt

# Check current user again (should get 401)
curl -X GET http://127.0.0.1:3000/api/v1/me \
  -b cookies.txt
```

## 🔍 Troubleshooting

### Issue: Still getting 500 error

**Solution**: Restart the Rails server to pick up the config changes

```bash
# Stop the server (Ctrl+C) and restart
bin/dev
# or
rails s
```

### Issue: Getting CORS errors in browser

**Possible causes**:

1. Frontend not sending `withCredentials: true`
    - Check `app/javascript/api/httpClient.ts`
    - Should have: `withCredentials: true`

2. Origin not in CORS whitelist
    - Check `config/application.rb`
    - Add your frontend URL to origins list

3. Browser blocking third-party cookies
    - Make sure frontend and backend are on same domain (localhost)
    - Or use 127.0.0.1 for both

### Issue: Session not persisting

**Possible causes**:

1. Cookie not being sent by browser
    - Check browser DevTools > Application > Cookies
    - Should see `_rails_pg_app_session`

2. Cookie domain mismatch
    - Frontend: `localhost:5173`
    - Backend: `localhost:3000`
    - Should work (same domain)

3. Secure cookie over HTTP
    - In development, secure should be false (default)
    - Check session store configuration

### Issue: CSRF token errors

**Solution**: Should not happen with `:null_session` strategy

- Verify `protect_from_forgery with: :null_session` in ApplicationController
- This allows JSON API requests without CSRF tokens

## 📝 What Changed

### Files Modified:

1. `config/application.rb` - Added session middleware and CORS
2. `app/controllers/application_controller.rb` - Added session support
3. `app/controllers/api/v1/sessions_controller.rb` - Cleanup
4. `app/controllers/api/v1/registrations_controller.rb` - Cleanup
5. `app/javascript/entrypoints/index.tsx` - Added Home route
6. `app/javascript/components/NavBar.tsx` - Added auth UI and logout
7. `app/javascript/components/Home.tsx` - Created (new file)

### Files Created:

1. `test_api_registration.rb` - Test script for registration endpoint
2. `AUTHENTICATION_SESSION_FIX.md` - Detailed documentation
3. `AUTHENTICATION_FIX_CHECKLIST.md` - This file

## ✅ Success Indicators

You'll know it's working when:

1. ✅ No more 500 errors on registration
2. ✅ User is created in database
3. ✅ Session cookie is set in browser
4. ✅ `/api/v1/me` endpoint returns user data
5. ✅ User stays logged in after page refresh
6. ✅ Logout clears the session

## 🚀 Next Steps

After verifying authentication works:

1. Test login with existing user
2. Test logout functionality
3. Test protected routes (add `before_action :require_authentication`)
4. Test admin-only routes (add `before_action :require_admin`)
5. Add error handling for network failures
6. Consider adding password reset functionality
7. Consider adding email verification

## 📚 Additional Resources

- [Rails API-only documentation](https://guides.rubyonrails.org/api_app.html)
- [ActionController::API documentation](https://api.rubyonrails.org/classes/ActionController/API.html)
- [rack-cors gem](https://github.com/cyu/rack-cors)
- [Rails session store guide](https://guides.rubyonrails.org/action_controller_overview.html#session)

