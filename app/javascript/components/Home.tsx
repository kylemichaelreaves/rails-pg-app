import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, CircularProgress, Typography} from '@mui/material';
import {useAuth} from '~/contexts/AuthContext';

export default function Home() {
    const {user, loading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (user) {
                // User is logged in, redirect to transactions
                navigate('/transactions');
            } else {
                // User is not logged in, redirect to login
                navigate('/login');
            }
        }
    }, [user, loading, navigate]);

    // Show loading state while checking authentication
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                gap: 2,
            }}
        >
            <CircularProgress/>
            <Typography variant="body1" color="text.secondary">
                Loading...
            </Typography>
        </Box>
    );
}

