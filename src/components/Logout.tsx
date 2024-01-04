import url from "../data/url";
import React from "react";
import { MenuItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const logoutUrl = `${url}/logout`;

const Logout: React.FC = () => {
    const [isDialogOpen, setDialogOpen] = React.useState(false);

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDialogOpen(false);
        fetch(logoutUrl, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
        })
            .then(() => (window.location.href = "/"))
            .catch((err) => console.log(`Error:${err.message}`));
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
                    <Button onClick={handleConfirmDelete} color="error">
                        {"Logout"}
                    </Button>
                    <Button onClick={handleCancelDelete}>{"Cancel"}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Logout;
