import LoginAlert from "./LoginAlert";
import CommentCreateProps from "../types/CommentCreateProps";
import url from "../data/url";
import getUserId from "../utils/getUserId";
import { Button, Box, Alert, Snackbar, TextField, TextareaAutosize, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

const CommentCreate: React.FC<CommentCreateProps> = (props) => {
    const createUrl = `${url}/comments`;
    const user_id: number | null = getUserId();

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
            const data = new FormData(FormElement);
            fetch(createUrl, {
                method: "POST",
                mode: "cors",
                body: data,
                credentials: "include",
            })
                .then((response) => {
                    if (response.ok) {
                        clearField();
                        props.reRender();
                        openSuccessAlert();
                        setMessage("");
                    } else {
                        return response.json();
                    }
                })
                .then((errorData) => {
                    if (errorData && errorData.message) {
                        console.log(errorData.message);
                        setMessage("Input is missing");
                    }
                })
                .catch((err) => console.log(`Error:${err.message}`));
        } else {
            openLoginAlert();
        }
    };

    // Logic for error display text
    const [message, setMessage] = React.useState<string>("");

    // Logic for Success Alert
    const [successAlert, setSuccessAlert] = React.useState<boolean>(false);
    const openSuccessAlert = () => setSuccessAlert(true);
    const closeSuccessAlert = () => setSuccessAlert(false);

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete="off">
                <Box style={{ display: "flex" }}>
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
                        defaultValue={props.main_thread_id}
                        style={{ display: "none" }}
                    />
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: "1rem", marginTop: "0.5rem" }}
                            type="submit"
                        >
                            <SendIcon />
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2" sx={{ color: "red" }}>
                        {message}
                    </Typography>
                </Box>
            </form>
            <LoginAlert loginAlert={loginAlert} closeLoginAlert={closeLoginAlert} />
            {successAlert && (
                <>
                    <Snackbar
                        open={successAlert}
                        autoHideDuration={6000}
                        onClose={closeSuccessAlert}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Alert severity="success">{"Posted comment successfully!"}</Alert>
                    </Snackbar>
                </>
            )}
        </>
    );
};

export default CommentCreate;