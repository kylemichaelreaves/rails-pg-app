import React, {useEffect} from 'react';
import {Alert, Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';

import {useTransactionsContext} from '@/contexts/TransactionsContext';
import useSumAmountDebitByDate from "~/hooks/useSumAmountDebitByDate";

const MonthlyAmountDebitTotal: React.FC = () => {
    const {state} = useTransactionsContext();
    const selectedMonth = state.selectedMonth; // You'll need to add this to your context

    const {
        data,
        isLoading,
        isFetching,
        isRefetching,
        isError,
        error,
        refetch,
    } = useSumAmountDebitByDate('month', selectedMonth);

    const statisticValue = React.useMemo(() => {
        if (!data) {
            return 0;
        }
        return data[0]?.total_amount_debit ?? 0;
    }, [data]);

    useEffect(() => {
        if (selectedMonth) {
            refetch();
        }
    }, [selectedMonth, refetch]);

    const isLoadingState = isLoading || isFetching || isRefetching;

    return (
        <Box>
            {isError && error && (
                <Alert
                    severity="error"
                    sx={{mb: 2}}
                    data-testid="monthly-amount-debit-total-error"
                >
                    <strong>{error.name}:</strong> {error.message}
                </Alert>
            )}

            {data && (
                <Card
                    data-testid="monthly-amount-debit-total-statistic"
                    sx={{position: 'relative', minHeight: 100}}
                >
                    {isLoadingState && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                zIndex: 1,
                            }}
                        >
                            <CircularProgress/>
                        </Box>
                    )}
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Monthly Total Amount Debit
                        </Typography>
                        <Typography variant="h4" component="div">
                            ${statisticValue.toFixed(2)}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default MonthlyAmountDebitTotal;