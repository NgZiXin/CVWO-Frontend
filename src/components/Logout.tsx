import LogoutProps from "../types/LogoutProps";
import { MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import React from "react";

const clearAllCookies = () => {
    const cookies: string[] = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
};

const Logout: React.FC<LogoutProps> = (props) => {
    const { callback } = props;
    const setAlertMessage: (message: string | null) => void = useOutletContext();

    // Logic for Logout button
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const handleDeleteClick = () => {
        setDialogOpen(true);
    };
    const handleConfirmDelete = () => {
        clearAllCookies();
        callback();
        setDialogOpen(false);
        setAlertMessage("Successfully Logged out!");
    };
    const handleCancelDelete = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <MenuItem onClick={handleDeleteClick}>{"Logout"}</MenuItem>
            <Dialog open={isDialogOpen} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"Are you sure you want to logout? You will need to login again to access account."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>{"Cancel"}</Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        {"Logout"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Logout;
