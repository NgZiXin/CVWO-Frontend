import ThreadDeleteProp from "../types/ThreadDeleteProps";
import url from "../data/url";
import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ThreadDelete: React.FC<ThreadDeleteProp> = (props) => {
    const deleteURL = `${url}/main_threads/${props.main_thread_id}`;

    //Logic for dialog
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const handleDeleteClick = () => {
        setDialogOpen(true);
    };
    const handleCancelDelete = () => {
        setDialogOpen(false);
    };
    const handleConfirmDelete = () => {
        setDialogOpen(false);
        fetch(deleteURL, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    window.history.back();
                } else {
                    return response.json();
                }
            })
            .then((errorData) => {
                if (errorData && errorData.message) {
                    console.log(errorData.message);
                }
            })
            .catch((err) => console.error(`Error: ${err.message}`));
    };

    return (
        <>
            <Button sx={{ color: "#A8ADBD" }} onClick={handleDeleteClick}>
                {"Delete"}
            </Button>

            <Dialog open={isDialogOpen} onClose={handleCancelDelete}>
                <DialogTitle>{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"Are you sure you want to delete? This action cannot be undone."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDelete} sx={{ color: "error" }}>
                        {"Delete"}
                    </Button>
                    <Button onClick={handleCancelDelete}>{"Cancel"}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ThreadDelete;
