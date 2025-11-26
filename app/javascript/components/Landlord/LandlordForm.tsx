import * as React from "react";
import {TextField, Box, Typography} from "@mui/material";

export default function LandlordForm() {
    return (
        <Box component="form" sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <Box>
                <Typography component="label" htmlFor="inputName" variant="body2" gutterBottom>
                    Name
                </Typography>
                <TextField
                    fullWidth
                    type="text"
                    id="ownerNameInput"
                    name="ownerName"
                    aria-describedby="ownerNameHelpBlock"
                />
            </Box>

            <Box>
                <Typography component="label" htmlFor="inputMailingAddress" variant="body2" gutterBottom>
                    Mailing Address
                </Typography>
                <TextField
                    fullWidth
                    type="text"
                    id="ownerMailingAddressInput"
                    name="ownerMailingAddress"
                    aria-describedby="ownerMailingAddressHelpBlock"
                />
            </Box>

            <Box>
                <Typography component="label" htmlFor="inputCityStateZip" variant="body2" gutterBottom>
                    City State Zip
                </Typography>
                <TextField
                    fullWidth
                    type="text"
                    id="ownerCityStateZipInput"
                    name="ownerCityStateZip"
                    aria-describedby="ownerCityStateZipHelpBlock"
                />
            </Box>
            {/* owner_full_mailing_address is a concatenation of the second and third inputs, and should be auto-populated */}
            {/* properties_owned if not in a select/filter list…trigger a PropertyForm */}
        </Box>
    );
}

