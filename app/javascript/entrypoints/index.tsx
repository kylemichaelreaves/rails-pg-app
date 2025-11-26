import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Properties from '../components/Property/Properties';
import Property from '../components/Property/Property';
import Landlords from '../components/Landlord/Landlords';
import Landlord from '../components/Landlord/Landlord';
import Address from '../components/./address/Address';
import Addresses from '../components/./address/Addresses';
import MapComponent from '../components/MapComponent/MapComponent';
import NotFound from '../components/NotFound';
import App from '../components/App';
import Keywords from '../components/./keywords/Keywords';
import TransactionsTable from '../components/Transactions/TransactionsTable';
import Memo from '../components/Memo/Memo';
import {TransactionsProvider} from "~/contexts/TransactionsContext";
import {AuthProvider} from "~/contexts/AuthContext";
import LoginForm from '../components/./auth/LoginForm';
import RegistrationForm from '../components/./auth/RegistrationForm';
import {ProtectedRoute} from '~/components/auth/ProtectedRoute';
import Home from '../components/Home';


// Create a Material UI theme
const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

// Create a client for React Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const router = createBrowserRouter([
        {
            path: '/',
            element: <App/>,
            errorElement: <NotFound/>,
            children: [
                // Home/Index route
                {
                    index: true,
                    element: <Home/>,
                },
                // Public auth routes
                {
                    path: 'login',
                    element: <LoginForm/>,
                },
                {
                    path: 'register',
                    element: <RegistrationForm/>,
                },
                // Protected routes
                {
                    path: 'properties',
                    element: <ProtectedRoute><Properties/></ProtectedRoute>,
                },
                {
                    path: 'properties/:propertyId',
                    element: <ProtectedRoute><Property/></ProtectedRoute>,
                    loader: async ({params}) => {
                        return fetch(`/api/v1/properties/${params.propertyId}`);
                    },
                },
                {
                    path: 'landlords',
                    element: <ProtectedRoute><Landlords/></ProtectedRoute>,
                },
                {
                    path: 'landlords/:landlordId',
                    element: <ProtectedRoute><Landlord/></ProtectedRoute>,
                },
                {
                    path: 'addresses',
                    element: <ProtectedRoute><Addresses/></ProtectedRoute>,
                },
                {
                    path: 'addresses/:addressId',
                    element: <ProtectedRoute><Address/></ProtectedRoute>,
                },
                {
                    path: 'map',
                    element: <ProtectedRoute><MapComponent/></ProtectedRoute>,
                },
                {
                    path: 'keywords',
                    element: <ProtectedRoute><Keywords/></ProtectedRoute>,
                },
                {
                    path: 'transactions',
                    element: <ProtectedRoute><TransactionsTable/></ProtectedRoute>,
                },
                {
                    path: 'transactions/:timeframe/:date/summary',
                    element: <ProtectedRoute>
                        <div>Transactions Timeframe Summary (TODO)</div>
                    </ProtectedRoute>,
                },
                {
                    path: 'memos',
                    element: <ProtectedRoute>
                        <div>Memos List (TODO)</div>
                    </ProtectedRoute>,
                },
                {
                    path: 'memos/:memoId',
                    element: <ProtectedRoute><Memo/></ProtectedRoute>,
                },
                {
                    path: '*',
                    element: <NotFound/>,
                },
            ],
        },
    ],
);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <TransactionsProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <RouterProvider router={router}/>
                    </ThemeProvider>
                </TransactionsProvider>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);