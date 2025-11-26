import * as React from "react";
import {Alert, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {AxiosError} from "axios";


interface DismissableAlertInterface {
    show: boolean;
    setShow: (show: boolean) => void;
    error?: AxiosError
}

export function DismissableAlert(props: Readonly<DismissableAlertInterface>) {

    if (props.show) {
        return (
            <Alert
                severity={props.error ? "error" : "success"}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => props.setShow(false)}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
            >
                {props.error ? props.error.message : ""}
            </Alert>
        );
    }
    return null;
}