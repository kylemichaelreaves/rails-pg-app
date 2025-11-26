import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Button,
    Grid,
    Chip,
    Card,
    CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {httpClient} from '@/api/httpClient';
import type {Memo as MemoType} from '@/types';

interface MemoWithDetails extends MemoType {
    transactions?: Array<{
        id: number;
        date: string;
        description: string;
        amount_debit: string;
        amount_credit: string;
    }>;
}

const Memo: React.FC = () => {
    const {memoId} = useParams<{ memoId: string }>();
    const navigate = useNavigate();

    const {data: memo, isLoading, error} = useQuery<MemoWithDetails>({
        queryKey: ['memo', memoId],
        queryFn: async () => {
            const response = await httpClient.get(`/memos/${memoId}`);
            return response.data;
        },
        enabled: !!memoId,
    });

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px'}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error || !memo) {
        return (
            <Box sx={{p: 3}}>
                <Typography color="error">
                    Error loading memo details
                </Typography>
                <Button
                    startIcon={<ArrowBackIcon/>}
                    onClick={() => navigate(-1)}
                    sx={{mt: 2}}
                >
                    Go Back
                </Button>
            </Box>
        );
    }

    const formatCurrency = (value: string | number | undefined): string => {
        if (!value) return '$0.00';
        const num = typeof value === 'string' ? Number.parseFloat(value) : value;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(num);
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    return (
        <Box sx={{p: 3}}>
            <Button
                startIcon={<ArrowBackIcon/>}
                onClick={() => navigate('/transactions')}
                sx={{mb: 2}}
            >
                Back to Transactions
            </Button>

            <Paper sx={{p: 3, mb: 3}}>
                <Typography variant="h4" gutterBottom>
                    {memo.name}
                </Typography>

                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid size={{xs: 12, sm: 6, md: 3}}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Recurring
                        </Typography>
                        <Chip
                            label={memo.recurring ? 'Yes' : 'No'}
                            color={memo.recurring ? 'primary' : 'default'}
                            size="small"
                            sx={{mt: 1}}
                        />
                    </Grid>

                    <Grid size={{xs: 12, sm: 6, md: 3}}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Necessary
                        </Typography>
                        <Chip
                            label={memo.necessary ? 'Yes' : 'No'}
                            color={memo.necessary ? 'success' : 'default'}
                            size="small"
                            sx={{mt: 1}}
                        />
                    </Grid>

                    {memo.frequency && (
                        <Grid size={{xs: 12, sm: 6, md: 3}}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Frequency
                            </Typography>
                            <Typography variant="body1" sx={{mt: 1, textTransform: 'capitalize'}}>
                                {memo.frequency}
                            </Typography>
                        </Grid>
                    )}

                    {memo.budget_category && (
                        <Grid size={{xs: 12, sm: 6, md: 3}}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Budget Category
                            </Typography>
                            <Typography variant="body1" sx={{mt: 1}}>
                                {String(memo.budget_category)}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Paper>

            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 4}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Total Debit
                            </Typography>
                            <Typography variant="h4" color="error.main">
                                {formatCurrency(memo.total_amount_debit)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{xs: 12, md: 4}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Total Credit
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {formatCurrency(memo.total_amount_credit)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{xs: 12, md: 4}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Total Transactions
                            </Typography>
                            <Typography variant="h4">
                                {memo.total_transactions || memo.transactions_count || 0}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {memo.transactions && memo.transactions.length > 0 && (
                <Paper sx={{mt: 3, p: 3}}>
                    <Typography variant="h5" gutterBottom>
                        Recent Transactions
                    </Typography>
                    <Box sx={{mt: 2}}>
                        {memo.transactions.map((transaction) => (
                            <Box
                                key={transaction.id}
                                sx={{
                                    p: 2,
                                    mb: 1,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                    },
                                }}
                            >
                                <Grid container spacing={2} alignItems="center">
                                    <Grid size={{xs: 12, sm: 3}}>
                                        <Typography variant="caption" color="text.secondary">
                                            Date
                                        </Typography>
                                        <Typography variant="body2">
                                            {formatDate(transaction.date)}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{xs: 12, sm: 4}}>
                                        <Typography variant="caption" color="text.secondary">
                                            Description
                                        </Typography>
                                        <Typography variant="body2">
                                            {transaction.description || '-'}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{xs: 6, sm: 2}}>
                                        <Typography variant="caption" color="text.secondary">
                                            Debit
                                        </Typography>
                                        <Typography variant="body2" color="error.main">
                                            {formatCurrency(transaction.amount_debit)}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{xs: 6, sm: 3}}>
                                        <Typography variant="caption" color="text.secondary">
                                            Credit
                                        </Typography>
                                        <Typography variant="body2" color="success.main">
                                            {formatCurrency(transaction.amount_credit)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default Memo;

