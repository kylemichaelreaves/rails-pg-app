// app/javascript/components/Auth/LoginForm.tsx
import {useState, FormEvent} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {Box, TextField, Button, Typography, Alert, Paper} from '@mui/material';
import {useAuth} from '~/contexts/AuthContext';
import {FormField} from "~/types";


const LOGIN_FIELDS: FormField[] = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        autoComplete: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        autoComplete: 'current-password',
    },
];

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate('/transactions');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Paper elevation={3} sx={{p: 4, maxWidth: 400, width: '100%'}}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    {LOGIN_FIELDS.map((field) => (
                        <TextField
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            required={field.required}
                            autoComplete={field.autoComplete}
                            fullWidth
                            margin="normal"
                            disabled={loading}
                        />
                    ))}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={loading}
                        sx={{mt: 3, mb: 2}}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>

                    <Typography variant="body2" align="center">
                        Don't have an account?{' '}
                        <Link to="/register" style={{textDecoration: 'none'}}>
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}