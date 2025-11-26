# Frontend Routing Fix Summary

## Problem

- Frontend routes were using `/api/v1/*` paths which collided with API endpoints
- Navigating to `/api/v1/transactions` in the browser would return raw JSON instead of the React app
- The application had mixed concerns between frontend routes and API endpoints

## Solution

### 1. Separated Frontend Routes from API Routes

**Frontend Routes (React Router):**

- `/properties`
- `/landlords`
- `/addresses`
- `/map`
- `/keywords`
- `/transactions`
- `/memos`
- `/memos/:memoId`

**API Routes (Rails):**

- `/api/v1/properties`
- `/api/v1/landlords`
- `/api/v1/addresses`
- `/api/v1/transactions`
- `/api/v1/memos`
- etc.

### 2. Updated Files

#### Frontend (TypeScript/React):

- `app/javascript/entrypoints/index.tsx` - Removed ROUTER_PREFIX, updated all routes
- `app/javascript/components/NavBar.tsx` - Updated tab values and links
- `app/javascript/components/Auth/ProtectedRoute.tsx` - Fixed redirect paths
- `app/javascript/components/Auth/LoginForm.tsx` - Fixed navigation
- `app/javascript/components/Auth/RegistrationForm.tsx` - Fixed navigation
- `app/javascript/components/Home.tsx` - Fixed navigation
- `app/javascript/components/Memo/Memo.tsx` - Fixed back button navigation
- `app/javascript/components/Transactions/TransactionsTable.tsx` - Fixed memo navigation
- `app/javascript/components/Transactions/selects/MemoSelect.tsx` - Fixed navigation
- `app/javascript/components/Transactions/selects/DaySelect.tsx` - Fixed navigation
- `app/javascript/components/Transactions/selects/MonthSelect.tsx` - Fixed navigation

#### Backend (Ruby/Rails):

- `app/controllers/application_controller.rb` - Added redirect for HTML requests to API endpoints
- `app/controllers/api/v1/transactions_controller.rb` - Removed handle_browser_request
- `app/controllers/api/v1/memos_controller.rb` - Cleaned up and fixed syntax errors

### 3. How It Works Now

1. **User clicks a link in the navbar** → Navigates to `/transactions` → React Router renders TransactionsTable
   component
2. **TransactionsTable component loads** → Makes API call to `/api/v1/transactions` → Receives JSON data
3. **User types `/api/v1/transactions` in browser** → Rails detects HTML request → Redirects to `/transactions` → React
   Router handles it

### 4. Benefits

- Clean separation of concerns
- No more 500 errors when navigating to routes
- Browser refresh works correctly on any route
- API endpoints still work for JSON requests
- Frontend routes are cleaner and more RESTful

### 5. Testing

To verify everything works:

1. Navigate to http://localhost:3000/transactions - Should show the React component
2. Refresh the page - Should still show the React component
3. Type http://localhost:3000/api/v1/transactions in browser - Should redirect to /transactions
4. API calls from React components should still work (check Network tab)

## Authentication Fix (Follow-up Issue)

### Problem

After implementing the redirect logic, login was failing because the redirect was being applied to ALL HTML requests,
including POST requests for authentication.

### Solution

Updated `redirect_html_requests_to_frontend` to only redirect GET requests:

- GET requests with HTML format → Redirected to frontend routes
- POST/PUT/DELETE requests → Processed normally by API controllers

Also added explicit `Accept: application/json` header to axios client to ensure Rails knows we expect JSON responses.

### Files Updated

- `app/controllers/application_controller.rb` - Added `request.get?` check to redirect logic
- `app/javascript/api/httpClient.ts` - Added `Accept: application/json` header

### Result

- Login/Register now work correctly ✓
- Browser navigation to API endpoints still redirects ✓
- API calls return JSON as expected ✓

