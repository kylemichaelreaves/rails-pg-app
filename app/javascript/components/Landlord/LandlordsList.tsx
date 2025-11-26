import * as React from "react";
import {LandlordInterface, LandlordsInterface} from "../../hooks/useLandlord";
import {List, ListItem, ListItemText, Chip, Box} from "@mui/material";

export default function LandlordsList({landlords}: Readonly<{ landlords: LandlordsInterface }>) {
    return (
        <List>
            {landlords.rows && landlords.rows.length > 0 && landlords.rows.map((landlord: LandlordInterface) => (
                // TODO: Add a link to the landlord's show page
                <ListItem key={landlord.id}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Chip label={landlord.id} color="primary" size="small"/>
                        <ListItemText primary={landlord.name}/>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

