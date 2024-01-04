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
        const logout = async () => {
            try {
                const response = await fetch(logoutUrl, {
                    method: "DELETE",
                    mode: "cors",
                    credentials: "include",
                });
                if (response.ok) {
                    window.location.href = "/";
                } else {
                    const errorData = await response.json();
                    if (errorData && errorData.message) {
                        console.log(errorData.message);
                    }
                }
            } catch (err) {
                console.error(`Error: ${err}`);
            }
        };
        logout();
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
