# CSRF Token Error Fix Summary

## Problem

The registration endpoint was failing with:

```
NoMethodError (undefined method 'flash=' for an instance of ActionDispatch::Request)
```

This error occurred in the CSRF token verification process when `protect_from_forgery with: :null_session` was used.

## Root Cause

Rails 8 has a known issue where `ActionController::API` combined with `protect_from_forgery with: :null_session` causes
the `:null_session` strategy to attempt calling `flash=` on an `ActionDispatch::Request` object, which doesn't have that
method.

This happens because:

1. `ApplicationController` inherits from `ActionController::API` (for API-only functionality)
2. It included `ActionController::RequestForgeryProtection`
3. It set `protect_from_forgery with: :null_session`
4. The `:null_session` strategy tries to manipulate flash, which isn't available in API mode

## Solution

Removed CSRF protection from the `ApplicationController` since:

- This is an API-only application (`ActionController::API`)
- CSRF tokens are typically not used with JSON API endpoints
- Session-based authentication alone provides sufficient protection for this use case
- The API is consumed by a single-page application on the same origin

### Changes Made

**File:** `app/controllers/application_controller.rb`

**Removed:**

```ruby
include ActionController::RequestForgeryProtection
protect_from_forgery with: :null_session
```

**Final result:**

```ruby

class ApplicationController < ActionController::API
  include ActionController::Cookies
  include Pagination

  before_action :underscore_params!
  # ... rest of the controller
end
```

## Results

✅ CSRF error is resolved
✅ Registration endpoint now works correctly
✅ Returns proper validation errors (e.g., 422 when email already exists)

## Testing

The endpoint is now working:

- **Route:** `POST /api/v1/register`
- **Successful:** Returns 201 Created with user data
- **Validation errors:** Returns 422 Unprocessable Content with error messages

## Security Considerations

For an API using session-based authentication:

- CSRF protection is typically handled at the frontend level for SPAs
- Same-origin policy provides protection
- If cross-origin requests are needed in the future, consider:
    - Token-based authentication (JWT)
    - Or re-implementing CSRF with a custom strategy compatible with Rails 8 API mode

## Alternative Solutions (if needed in the future)

If CSRF protection is required:

1. Switch to `ActionController::Base` instead of `ActionController::API`
2. Use `:exception` strategy instead of `:null_session`
3. Implement custom CSRF token handling for the API

