import ThreadDeleteProp from "../types/ThreadDeleteProps";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useOutletContext, useNavigate } from "react-router-dom";
import React from "react";

const ThreadDelete: React.FC<ThreadDeleteProp> = (props) => {
    const { main_thread_id } = props;
    const deleteUrl: string = `${apiUrl}/main_threads/${main_thread_id}`;
    const navigate = useNavigate();
    const setAlertMessage: (message: string | null) => void = useOutletContext();

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
                const response: Response = await fetch(deleteUrl, {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${getJWT()}`,
                    },
                });
                if (response.ok) {
                    navigate(-1);
                    setAlertMessage("Thread Deleted Successfully!");
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
