import React, {useState, useMemo} from 'react';
import {useMutation} from '@tanstack/react-query';
import {
    Box,
    TextField,
    Button,
    FormControl,
    Switch,
    FormControlLabel,
    Alert,
    CircularProgress,
    Snackbar,
} from '@mui/material';
import {createTransaction} from '@/api/transactions/createTransaction';

interface Transaction {
    date: string;
    description: string;
    memo: string;
    amount_debit: string;
    amount_credit: string;
}

interface FormField {
    component: 'TextField';
    label: string;
    placeholder?: string;
    type?: string;
    props?: Record<string, unknown>;
    computedProps?: () => Record<string, unknown>;
}

const TransactionForm: React.FC = () => {
    const [isDebit, setIsDebit] = useState(true);
    const [formState, setFormState] = useState<Transaction>({
        date: '',
        description: '',
        memo: '',
        amount_debit: '',
        amount_credit: '',
    });

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const {isPending, isError, error, mutate} = useMutation({
        mutationFn: ({transaction}: { transaction: Transaction }) =>
            createTransaction(transaction),
        onSuccess: () => {
            setFormState({
                date: '',
                description: '',
                memo: '',
                amount_debit: '',
                amount_credit: '',
            });
            setSnackbar({
                open: true,
                message: 'Transaction created',
                severity: 'success',
            });
        },
        onError: (error: Error) => {
            setSnackbar({
                open: true,
                message: error.message,
                severity: 'error',
            });
        },
    });

    const saveTransaction = () => {
        if (!formState.date || (!formState.amount_debit && !formState.amount_credit)) {
            setSnackbar({
                open: true,
                message: 'Please fill in all required fields',
                severity: 'error',
            });
            return;
        }

        const transactionData: Transaction = {
            ...formState,
            amount_debit: formState.amount_debit,
            amount_credit: formState.amount_credit,
        };

        mutate({transaction: transactionData});
    };

    const fieldConfig: Record<
        keyof Pick<Transaction, 'date' | 'description' | 'memo' | 'amount_debit' | 'amount_credit'>,
        FormField
    > = {
        date: {
            component: 'TextField',
            label: 'Date',
            placeholder: 'Select a date',
            type: 'date',
            props: {
                InputLabelProps: {shrink: true},
            },
        },
        description: {
            component: 'TextField',
            label: 'Description',
            placeholder: 'Enter description',
        },
        memo: {
            component: 'TextField',
            label: 'Memo',
            placeholder: 'Enter memo',
        },
        amount_debit: {
            component: 'TextField',
            label: 'Amount Debit',
            placeholder: 'Enter debit amount',
            type: 'number',
            computedProps: () => ({
                disabled: !isDebit,
            }),
        },
        amount_credit: {
            component: 'TextField',
            label: 'Amount Credit',
            placeholder: 'Enter credit amount',
            type: 'number',
            computedProps: () => ({
                disabled: isDebit,
            }),
        },
    };

    const fields = useMemo(() => fieldConfig, [isDebit]);

    const getFieldProps = (field: FormField) => {
        const staticProps = field.props || {};
        const computedProps = field.computedProps ? field.computedProps() : {};
        return {...staticProps, ...computedProps};
    };

    const handleInputChange = (key: keyof Transaction, value: string) => {
        setFormState((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({...prev, open: false}));
    };

    return (
        <Box
            component="form"
            sx={{position: 'relative', opacity: isPending ? 0.6 : 1}}
            data-testid="transaction-form"
        >
            {isPending && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                    }}
                >
                    <CircularProgress/>
                </Box>
            )}

            {isError && error && (
                <Alert
                    severity="error"
                    sx={{mb: 2}}
                    data-testid="transaction-form-error-alert"
                >
                    <strong>{error.name}:</strong> {error.message}
                </Alert>
            )}

            <FormControlLabel
                control={
                    <Switch
                        checked={isDebit}
                        onChange={(e) => setIsDebit(e.target.checked)}
                        data-testid="transaction-type-switch"
                    />
                }
                label={isDebit ? 'Debit' : 'Credit'}
                sx={{mb: 2}}
            />

            {(Object.keys(fields) as Array<keyof typeof fields>).map((key) => {
                const field = fields[key];
                const fieldProps = getFieldProps(field);

                return (
                    <FormControl
                        key={key}
                        fullWidth
                        sx={{mb: 2}}
                        data-testid={`transaction-form-item-${key}`}
                    >
                        <TextField
                            label={field.label}
                            type={field.type}
                            value={formState[key]}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            placeholder={field.placeholder}
                            data-testid={`transaction-input-${key}`}
                            fullWidth
                            {...fieldProps}
                        />
                    </FormControl>
                );
            })}

            <Button
                variant="contained"
                onClick={saveTransaction}
                data-testid="transaction-submit-button"
                disabled={isPending}
                fullWidth
            >
                {isPending ? 'Creating...' : 'Create Transaction'}
            </Button>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{width: '100%'}}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TransactionForm;