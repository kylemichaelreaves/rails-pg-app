import React from 'react';
import {Alert as MuiAlert, AlertTitle, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface AlertProps {
    type: 'success' | 'warning' | 'error' | 'info';
    message: string;
    title: string;
    close?: () => void;
    dataTestId?: string;
}

export default function AlertComponent({
                                           type,
                                           message,
                                           title,
                                           close,
                                           dataTestId = 'alert',
                                       }: AlertProps) {
    return (
        <MuiAlert
            severity={type}
            onClose={close}
            data-testid={dataTestId}
            sx={{
                textAlign: 'center',
                '& .MuiAlert-message': {
                    width: '100%',
                },
            }}
            action={
                close && (
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={close}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                )
            }
        >
            <AlertTitle data-testid={`${dataTestId}-title`}>
                {title}
            </AlertTitle>
            <span data-testid={`${dataTestId}-message`}>
        {message}
      </span>
        </MuiAlert>
    );
}