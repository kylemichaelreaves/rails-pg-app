// app/javascript/components/Auth/ProtectedRoute.tsx
import {Navigate} from 'react-router-dom';
import {Box, CircularProgress} from '@mui/material';
import {useAuth} from '~/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({children}: Readonly<ProtectedRouteProps>) {
    const {user, loading} = useAuth();

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress/>
            </Box>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;
}

export function AdminRoute({children}: Readonly<ProtectedRouteProps>) {
    const {user, isAdmin, loading} = useAuth();

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress/>
            </Box>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    if (!isAdmin) {
        return <Navigate to="/properties" replace/>;
    }

    return <>{children}</>;
}