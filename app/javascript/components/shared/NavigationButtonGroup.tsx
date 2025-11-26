import React from 'react';
import {ButtonGroup, Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

interface NavigationButtonGroupProps {
    goToPrevious: (event: React.MouseEvent<HTMLButtonElement>) => void;
    goToNext: (event: React.MouseEvent<HTMLButtonElement>) => void;
    reset?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isFirst: boolean;
    isLast: boolean;
    label: string;
    'data-testid'?: string;
}

const NavigationButtonGroup: React.FC<NavigationButtonGroupProps> = ({
                                                                         goToPrevious,
                                                                         goToNext,
                                                                         reset,
                                                                         isFirst,
                                                                         isLast,
                                                                         label,
                                                                         'data-testid': dataTestId = '',
                                                                     }) => {
    return (
        <ButtonGroup data-testid={dataTestId} variant="contained">
            <Button
                color="primary"
                startIcon={<ArrowBackIcon/>}
                onClick={goToPrevious}
                disabled={isLast}
            >
                Previous {label}
            </Button>
            <Button
                color="primary"
                startIcon={<ArrowForwardIcon/>}
                onClick={goToNext}
                disabled={isFirst}
            >
                Next {label}
            </Button>
            {reset && (
                <Button
                    color="info"
                    startIcon={<CloseIcon/>}
                    onClick={reset}
                >
                    Reset {label}
                </Button>
            )}
        </ButtonGroup>
    );
};

export default NavigationButtonGroup;