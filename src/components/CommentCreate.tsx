import LoginAlert from "./LoginAlert";
import CommentCreateProps from "../types/CommentCreateProps";
import apiUrl from "../data/apiUrl";
import getUserId from "../utils/getUserId";
import getJWT from "../utils/getJWT";
import { Button, Box, TextField, TextareaAutosize, Typography, Grid } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

const CommentCreate: React.FC<CommentCreateProps> = (props) => {
    /* This component allows users to create comments. The callback function triggered after the form 
    submission ensures that the CommentList component is re-rendered so as to reflect the newly created 
    comment for the user. */

    const { main_thread_id, callback } = props;
    const createUrl: string = `${apiUrl}/comments`;
    const user_id: number | null = getUserId();
    const setAlertMessage: (message: string | null) => void = useOutletContext();

    // Logic for Login failed Alert
    const [loginAlert, setLoginAlert] = React.useState<boolean>(false);
    const openLoginAlert = () => setLoginAlert(true);
    const closeLoginAlert = () => setLoginAlert(false);

    // Logic for form
    const [field, setField] = React.useState<string>("");
    const clearField = () => {
        setField("");
    };
    const handleFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setField(() => event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user_id) {
            const FormElement = event.target as HTMLFormElement;
            const data: FormData = new FormData(FormElement);
            const createComment = async () => {
                try {
                    const response: Response = await fetch(createUrl, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            Authorization: `Bearer ${getJWT()}`,
                        },
                        body: data,
                    });
                    if (response.ok) {
                        clearField();
                        setMessage("");
                        callback();
                        setAlertMessage("Comment Created Successfully!");
                    } else {
                        const errorData = await response.json();
                        if (errorData && errorData.message) {
                            console.log(errorData.message);
                            setMessage("Input is missing");
                        }
                    }
                } catch (err) {
                    console.error(`Error: ${err}`);
                }
            };
            createComment();
        } else {
            openLoginAlert();
        }
    };

    // Logic for error display text
    const [message, setMessage] = React.useState<string>("");

    return (
        <>
            <Box sx={{ width: "90%", margin: "auto" }}>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Grid container sx={{ alignItems: "center" }}>
                        <Grid item xs={10}>
                            <TextareaAutosize
                                id="comment_body"
                                placeholder="Add Comments"
                                style={{
                                    width: "100%",
                                    resize: "none",
                                    fontSize: "1rem",
                                    border: "none",
                                    outline: "2px solid #ccc",
                                    borderRadius: "4px",
                                }}
                                minRows={3}
                                name="comment[body]"
                                value={field}
                                onChange={handleFieldChange}
                            />
                            <TextField
                                id="comment_thread_id"
                                name="comment[main_thread_id]"
                                defaultValue={main_thread_id}
                                style={{ display: "none" }}
                            />
                        </Grid>
                        <Grid item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="contained" color="primary" type="submit">
                                <SendIcon />
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Typography variant="body2" sx={{ color: "red" }}>
                            {message}
                        </Typography>
                    </Grid>
                </form>
                <LoginAlert loginAlert={loginAlert} closeLoginAlert={closeLoginAlert} />
            </Box>
        </>
    );
};

export default CommentCreate;
