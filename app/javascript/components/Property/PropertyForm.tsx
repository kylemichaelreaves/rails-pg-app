import * as React from 'react'
import {PropertyInterface, blankProperty} from '../../hooks/useProperty'
import {TextField, Button, Box, Typography} from '@mui/material'

interface PropertyFormProps {
    readonly onSave: (property: PropertyInterface) => void;
}

export function PropertyForm({onSave}: PropertyFormProps) {
    const [property, setProperty] = React.useState(blankProperty);

    const handleSave = () => {
        onSave(property);
        blankProperty.id++;
        setProperty(blankProperty);
    };

    return (
        <Box component="form" sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            <Box>
                <Typography variant="body2" gutterBottom>Street Address:</Typography>
                <TextField
                    fullWidth
                    id="streetAddress"
                    value={property.street_address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProperty({...property, street_address: e.currentTarget.value})
                    }
                    aria-label="street address"
                />
            </Box>

            <Box>
                <Typography variant="body2" gutterBottom>Owner Name:</Typography>
                <TextField
                    fullWidth
                    id="ownerName"
                    value={property.owner_name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProperty({...property, owner_name: e.currentTarget.value})
                    }
                    aria-label="owner name"
                />
            </Box>

            <Box>
                <Typography variant="body2" gutterBottom>Owner Mailing Address:</Typography>
                <TextField
                    fullWidth
                    id="ownerMailingAddress"
                    value={property.owner_mailing_address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProperty({...property, owner_mailing_address: e.currentTarget.value})
                    }
                    aria-label="owner mailing address"
                />
            </Box>

            <Box>
                <Typography variant="body2" gutterBottom>City/State/Zipcode:</Typography>
                <TextField
                    fullWidth
                    id="cityStateZip"
                    value={property.city_state_zip}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProperty({...property, city_state_zip: e.currentTarget.value})
                    }
                    aria-label="city state zip"
                />
            </Box>

            <Button
                size="large"
                variant="contained"
                onClick={handleSave}
            >
                Save Property
            </Button>
        </Box>
    )
}

