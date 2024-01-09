import CommentDeleteProps from "../types/CommentDelete";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const CommentDelete: React.FC<CommentDeleteProps> = (props) => {
    const deleteUrl = `${apiUrl}/comments/${props.comment_id}`;

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
        const deleteComment = async () => {
            try {
                const response = await fetch(deleteUrl, {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${getJWT()}`,
                    },
                });
                if (response.ok) {
                    window.location.reload();
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
        deleteComment();
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

export default CommentDelete;
