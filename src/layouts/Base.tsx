import { Alert, Snackbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import React from "react";

const Base: React.FC = () => {
    // Logic for Success Alert
    const [alertMessage, setAlertMessage] = React.useState<null | string>(null);
    const closeSuccessAlert = () => setAlertMessage(null);

    return (
        <>
            <Outlet context={setAlertMessage} />
            {alertMessage && (
                <>
                    <Snackbar
                        open={alertMessage ? true : false}
                        autoHideDuration={6000}
                        onClose={closeSuccessAlert}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Alert severity="success">{`${alertMessage}`}</Alert>
                    </Snackbar>
                </>
            )}
        </>
    );
};

export default Base;
