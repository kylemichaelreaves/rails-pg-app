// app/javascript/components/Auth/RegistrationForm.tsx
import React, {useState, FormEvent} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {Box, TextField, Button, Typography, Alert, Paper} from '@mui/material';
import {useAuth} from '~/contexts/AuthContext';
import {FormField} from "~/types";


const REGISTRATION_FIELDS: FormField[] = [
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
        minLength: 8,
        autoComplete: 'new-password',
    },
    {
        name: 'passwordConfirmation',
        label: 'Confirm Password',
        type: 'password',
        required: true,
        minLength: 8,
        autoComplete: 'new-password',
    },
];

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirmation: '',
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const {register} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);

        try {
            await register(formData.email, formData.password, formData.passwordConfirmation);
            navigate('/transactions');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed';
            setErrors([errorMessage]);
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
                    Register
                </Typography>

                {errors.length > 0 && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {errors.map((error) => (
                            <div key={error}>{error}</div>
                        ))}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    {REGISTRATION_FIELDS.map((field) => (
                        <TextField
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            required={field.required}
                            autoComplete={field.autoComplete}
                            slotProps={{
                                htmlInput: {
                                    minLength: field.minLength
                                }
                            }}
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
                        {loading ? 'Creating account...' : 'Register'}
                    </Button>

                    <Typography variant="body2" align="center">
                        Already have an account?{' '}
                        <Link to="/login" style={{textDecoration: 'none'}}>
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}