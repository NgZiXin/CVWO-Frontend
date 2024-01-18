import LogoutProps from "../types/LogoutProps";
import { MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import React from "react";

const clearAuthCookies = () => {
    document.cookie = `user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    document.cookie = `JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

const Logout: React.FC<LogoutProps> = (props) => {
    /* This component handles the logging out of users by clearing their cookies 
    storing their user info and JWT. The callback function here re-renders the MenuAppBar component.*/

    const { callback } = props;
    const setAlertMessage: (message: string | null) => void = useOutletContext();

    // Logic for Logout button
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const handleDeleteClick = () => {
        setDialogOpen(true);
    };
    const handleConfirmDelete = () => {
        clearAuthCookies();
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
