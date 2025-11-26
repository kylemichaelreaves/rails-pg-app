# Frontend Routing Fix - Blank Page Issue

## Problem

When navigating to `/` (root path), a blank page was being rendered instead of the React components. The Rails server
was successfully loading the HTML template, but no React content appeared.

## Root Cause

The React Router configuration was missing an index route for the root path (`/`). The `App` component rendered the
`NavBar` and `<Outlet/>`, but since there was no route defined for `/`, the outlet remained empty, resulting in a blank
page below the navbar.

## Solution

### 1. Created Home Component (`app/javascript/components/Home.tsx`)

A new component that:

- Checks authentication state using `useAuth()` hook
- Redirects authenticated users to `/api/v1/properties`
- Redirects unauthenticated users to `/login`
- Shows a loading spinner while checking auth state

```typescript
export default function Home() {
    const {user, loading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (user) {
                navigate('/api/v1/properties');
            } else {
                navigate('/login');
            }
        }
    }, [user, loading, navigate]);

    return <LoadingSpinner / >;
}
```

### 2. Added Index Route (`app/javascript/entrypoints/index.tsx`)

Added an index route to the root path that renders the Home component:

```typescript
{
    path: '/',
        element
:
    <App / >,
        children
:
    [
        {
            index: true,  // NEW: Handles root path
            element: <Home / >,
        },
        // ...other routes
    ]
}
```

### 3. Enhanced NavBar (`app/javascript/components/NavBar.tsx`)

Updated the navigation bar to be authentication-aware:

**For Unauthenticated Users:**

- Hides navigation tabs
- Shows "Login" and "Register" buttons

**For Authenticated Users:**

- Shows all navigation tabs (Properties, Landlords, etc.)
- Displays user email
- Shows account menu with logout option

```typescript
{
    user ? (
        <>
            <Tabs>
...
    </Tabs>
    < UserMenu
    email = {user.email}
    onLogout = {handleLogout}
    />
    < />
) :
    (
        <>
            <Button to = "/login" > Login < /Button>
            < Button
    to = "/register" > Register < /Button>
        < />
)
}
```

## User Flow

### Scenario 1: Unauthenticated User visits `/`

1. Home component checks auth state
2. User is not logged in
3. Redirects to `/login`
4. NavBar shows Login/Register buttons
5. User can log in or register

### Scenario 2: Authenticated User visits `/`

1. Home component checks auth state
2. User is logged in
3. Redirects to `/api/v1/properties`
4. NavBar shows navigation tabs and user menu
5. User can navigate the app

### Scenario 3: User logs out

1. User clicks account icon → Logout
2. `logout()` function called
3. Session cleared on backend
4. User state cleared in frontend
5. Redirected to `/login`
6. NavBar switches to showing Login/Register buttons

## Files Modified

1. **`app/javascript/components/Home.tsx`** (NEW)
    - Created landing page component
    - Handles authentication-based redirects

2. **`app/javascript/entrypoints/index.tsx`**
    - Added index route for root path
    - Imported Home component

3. **`app/javascript/components/NavBar.tsx`**
    - Added authentication state awareness
    - Conditional rendering of tabs vs auth buttons
    - Added user menu with logout
    - Added Material-UI icons import

## Testing

### Test the Fix:

1. **Navigate to root** (`http://localhost:3000/`)
    - Should automatically redirect to login (if not authenticated)
    - Or redirect to properties (if authenticated)

2. **Register a new user**
    - Should redirect to properties page after registration
    - NavBar should show tabs and user email

3. **Refresh the page**
    - Should stay logged in
    - Should still see authenticated UI

4. **Logout**
    - Click account icon → Logout
    - Should redirect to login page
    - NavBar should show Login/Register buttons

5. **Try to access protected route directly**
    - Navigate to `/api/v1/properties` while logged out
    - Should be redirected to login by ProtectedRoute

## Benefits

1. **No More Blank Pages**: Root path now has a proper handler
2. **Smart Redirects**: Users land on appropriate pages based on auth state
3. **Better UX**: Clear indication of login state in navbar
4. **Easy Logout**: One-click logout from any page
5. **Consistent Navigation**: Auth state controls what users can see/access

## Additional Improvements Made

- Used Material-UI `AccountCircle` icon for user menu
- Added user email display in navbar
- Improved button styling with variants
- Used React Router `Link` components for client-side navigation
- Added loading state while checking authentication

## Next Steps

Consider adding:

1. **Dashboard/Welcome page** instead of immediate redirect
2. **User profile page** accessible from account menu
3. **Admin-only UI elements** for admin users
4. **Breadcrumb navigation** for better orientation
5. **Toast notifications** for login/logout feedback
6. **Remember me** functionality
7. **Session timeout warning** before auto-logout

