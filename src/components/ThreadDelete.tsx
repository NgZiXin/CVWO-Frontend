import ThreadDeleteProp from "../types/ThreadDeleteProps";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ThreadDelete: React.FC<ThreadDeleteProp> = (props) => {
    const deleteUrl = `${apiUrl}/main_threads/${props.main_thread_id}`;

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
        const deleteThread = async () => {
            try {
                const response = await fetch(deleteUrl, {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${getJWT()}`,
                    },
                });
                if (response.ok) {
                    window.history.back();
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
        deleteThread();
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
                    <Button onClick={handleCancelDelete}>{"Cancel"}</Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        {"Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ThreadDelete;
