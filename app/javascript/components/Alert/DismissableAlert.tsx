import * as React from "react";
import Alert from "react-bootstrap/Alert";
import {AxiosError} from "axios";


interface DismissableAlertInterface {
    show: boolean;
    setShow: (show: boolean) => void;
    error?: AxiosError
}

export function DismissableAlert(props: DismissableAlertInterface) {

    if (props.show) {
        return (
            <Alert
                variant={props.error ? "danger" : "success"}
                onClose={() => props.setShow(false)}
                dismissible
            >
                <Alert.Heading>{props.error ? props.error.message : ""}</Alert.Heading>
            </Alert>
        );
    }
    return null;
}