import LoginAlertProps from "../types/LoginAlertProps";
import React from "react";
import { Alert, Snackbar } from "@mui/material";

const LoginAlert: React.FC<LoginAlertProps> = (props) => {
    return (
        <>
            {props.loginAlert && (
                <>
                    <Snackbar
                        open={props.loginAlert}
                        autoHideDuration={6000}
                        onClose={props.closeLoginAlert}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Alert severity="error">{"Error: Log in first"}</Alert>
                    </Snackbar>
                </>
            )}
        </>
    );
};

export default LoginAlert;
