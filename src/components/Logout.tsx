import React from "react";
import { MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const clearAllCookies = (): void => {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
};

const Logout: React.FC = () => {
    const [isDialogOpen, setDialogOpen] = React.useState(false);

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDialogOpen(false);
        clearAllCookies();
        window.location.reload();
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
