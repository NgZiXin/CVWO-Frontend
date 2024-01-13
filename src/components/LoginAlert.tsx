import LoginAlertProps from "../types/LoginAlertProps";
import React from "react";
import { Alert, Snackbar } from "@mui/material";

const LoginAlert: React.FC<LoginAlertProps> = (props) => {
    const { loginAlert, closeLoginAlert } = props;

    return (
        <>
            {loginAlert && (
                <>
                    <Snackbar
                        open={loginAlert}
                        autoHideDuration={6000}
                        onClose={closeLoginAlert}
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
