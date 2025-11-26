# Authentication Setup Fix - Session Configuration

## Problem

The Rails API was throwing a 500 error when trying to register a user:

```
ActionDispatch::Request::Session::DisabledSessionError: 
Your application has sessions disabled. To write to the session you must first configure a session store
```

The user was successfully created in the database, but the application crashed when trying to set `session[:user_id]`.

## Root Cause

Rails API-only mode (`config.api_only = true`) disables session support by default to keep the API lean. However, the
authentication system was trying to use cookie-based sessions for storing the user ID.

## Solution

### 1. Enable Session Middleware (config/application.rb)

Added session and cookie middleware to the Rails application:

```ruby
# Enable sessions and cookies for authentication
config.middleware.use ActionDispatch::Cookies
config.middleware.use ActionDispatch::Session::CookieStore, key: '_rails_pg_app_session'

# Enable CORS for frontend with credentials
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:5173', 'http://127.0.0.1:5173',
            'http://localhost:3000', 'http://127.0.0.1:3000'
    resource '*',
             headers: :any,
             methods: [:get, :post, :put, :patch, :delete, :options, :head],
             credentials: true # Important for cookies!
  end
end
```

### 2. Update ApplicationController

- Kept `ActionController::API` as the base class (correct for API-only apps)
- Added necessary modules for session support:
    - `ActionController::Cookies` - Enables cookie handling
    - `ActionController::RequestForgeryProtection` - CSRF protection
- Removed `helper_method` call (not available in ActionController::API)

```ruby

class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include Pagination

  protect_from_forgery with: :null_session

  # Authentication methods
  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def logged_in?
    current_user.present?
  end
end
```

### 3. Frontend Configuration (httpClient.ts)

The frontend already had the correct configuration:

```typescript
export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,  // Important! Enables sending cookies
})
```

## How It Works

1. **Registration Flow**:
    - User submits email/password via React form
    - Frontend sends POST to `/api/v1/register` with `withCredentials: true`
    - Rails creates user and sets `session[:user_id] = user.id`
    - Rails sends back session cookie in `Set-Cookie` header
    - Browser stores the cookie for future requests

2. **Subsequent Requests**:
    - Browser automatically includes session cookie
    - Rails reads `session[:user_id]` to identify the user
    - `current_user` method loads the user from the database

3. **Logout Flow**:
    - Frontend sends DELETE to `/api/v1/logout`
    - Rails clears the session: `session.delete(:user_id)`
    - Browser discards the session cookie

## Testing

### Manual Test (using test script)

```bash
ruby test_api_registration.rb
```

### Using cURL

```bash
# Register
curl -X POST http://127.0.0.1:3000/api/v1/register \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "user": {
      "email": "test@example.com",
      "password": "password123",
      "password_confirmation": "password123"
    }
  }'

# Check current user (using saved cookies)
curl -X GET http://127.0.0.1:3000/api/v1/me \
  -b cookies.txt
```

### Using Frontend

1. Start Rails server: `bin/dev` or `rails s`
2. Navigate to registration page
3. Fill in email and password
4. Submit form
5. Should redirect to authenticated area with user data

## Key Files Modified

1. **config/application.rb** - Added session middleware and CORS
2. **app/controllers/application_controller.rb** - Added session support modules
3. **app/controllers/api/v1/sessions_controller.rb** - Cleaned up (removed redundant skip_before_action)
4. **app/controllers/api/v1/registrations_controller.rb** - Cleaned up (removed redundant skip_before_action)

## Important Notes

1. **CSRF Protection**: Set to `:null_session` which allows JSON API requests without CSRF tokens
2. **CORS**: Configured to allow credentials from localhost origins (both port 3000 and 5173)
3. **Cookie Security**: In production, ensure:
    - Use HTTPS (cookies should be `secure: true`)
    - Set `SameSite` attribute appropriately
    - Consider using environment-specific session keys

## Production Considerations

For production, update `config/environments/production.rb`:

```ruby
# Use a more secure session store
config.session_store :cookie_store,
                     key: '_app_session',
                     secure: true, # Only send over HTTPS
                     httponly: true, # Prevent JS access
                     same_site: :lax # CSRF protection

# Update CORS origins
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV['FRONTEND_URL'] # Your production frontend URL
    resource '*',
             headers: :any,
             methods: [:get, :post, :put, :patch, :delete, :options, :head],
             credentials: true
  end
end
```

## Alternative: Token-Based Auth

If you prefer token-based authentication (JWT) instead of sessions:

- Pros: Stateless, works better with multiple servers, mobile apps
- Cons: Can't easily invalidate tokens, larger request size
- Consider using gems like `devise-jwt` or `jwt`

For this application, cookie-based sessions are simpler and work well for a web app with a single backend.

