import React from 'react';
import {Box, Typography} from '@mui/material';
import NavigationButtonGroup from './NavigationButtonGroup';

interface SummaryHeaderProps {
    timeFrame: 'Month' | 'Week';
    selectedPeriod: string;
    isFirst: boolean;
    isLast: boolean;
    goToNext: () => void;
    goToPrevious: () => void;
    reset: () => void;
    subtitle?: React.ReactNode;
    amountTotal?: React.ReactNode;
}

const SummaryHeader: React.FC<SummaryHeaderProps> = ({
                                                         timeFrame,
                                                         selectedPeriod,
                                                         isFirst,
                                                         isLast,
                                                         goToNext,
                                                         goToPrevious,
                                                         reset,
                                                         subtitle,
                                                         amountTotal,
                                                     }) => {
    const testIdPrefix = timeFrame.toLowerCase();
    const isMonthView = timeFrame === 'Month';

    return (
        <Box
            data-testid={`${testIdPrefix}-summary-header`}
            data-selected-period={selectedPeriod}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Box
                data-testid={`${testIdPrefix}-summary-left-section`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2.5rem',
                    flexDirection: 'row',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMonthView ? 'row' : 'column',
                        gap: isMonthView ? '2.5rem' : '0.005rem',
                        alignItems: isMonthView ? 'center' : 'flex-start',
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h2"
                        data-testid={`${testIdPrefix}-summary-title`}
                    >
                        {timeFrame} Summary for: {selectedPeriod}
                    </Typography>
                    {subtitle}
                </Box>
                {amountTotal}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                }}
            >
                <NavigationButtonGroup
                    label={timeFrame}
                    isLast={isLast}
                    isFirst={isFirst}
                    goToNext={goToNext}
                    goToPrevious={goToPrevious}
                    reset={reset}
                    data-testid={`${testIdPrefix}-summary-navigation-button-group`}
                />
            </Box>
        </Box>
    );
};

export default SummaryHeader;