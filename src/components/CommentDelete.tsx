import CommentDeleteProps from "../types/CommentDelete";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import React from "react";

const CommentDelete: React.FC<CommentDeleteProps> = (props) => {
    const { comment_id, callback } = props;
    const deleteUrl: string = `${apiUrl}/comments/${comment_id}`;
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
        const deleteComment = async () => {
            try {
                const response: Response = await fetch(deleteUrl, {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${getJWT()}`,
                    },
                });
                if (response.ok) {
                    callback();
                    setAlertMessage("Comment Deleted Successfully!");
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
