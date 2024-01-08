import CommentTextAreaProps from "../types/CommentTextAreaProps";
import apiUrl from "../data/apiUrl";
import React from "react";
import { TextareaAutosize, Button, Alert, Snackbar } from "@mui/material";

const commonStyle = {
    width: "100%",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
};

const commentDisplay = {
        ...commonStyle,
        resize: "none",
        outline: "none",
        wordWrap: "break-word",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

const commentUpdate = {
        ...commonStyle,
        outline: "2px solid #ccc",
    };

const CommentTextArea: React.FC<CommentTextAreaProps> = (props) => {
    const patchUrl = `${apiUrl}/comments/${props.id}`;

    // Logic for Text Area Form
    const [body, setBody] = React.useState<string>(props.body);
    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(() => event.target.value);
    };
    const handleCancel = () => {
        setBody(props.body);
        props.closeUpdate();
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const FormElement = event.target as HTMLFormElement;
        const data = new FormData(FormElement);
        const updateComment = async () => {
            try {
                const response = await fetch(patchUrl, {
                    method: "PATCH",
                    mode: "cors",
                    body: data,
                    credentials: "include",
                });
                if (response.ok) {
                    props.closeUpdate();
                    openSuccessAlert();
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
        updateComment();
    };

    // Logic for Success Alert
    const [successAlert, setSuccessAlert] = React.useState<boolean>(false);
    const openSuccessAlert = () => setSuccessAlert(true);
    const closeSuccessAlert = () => setSuccessAlert(false);

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete="off">
                <TextareaAutosize
                    id="comment_body"
                    name="comment[body]"
                    value={body}
                    maxRows={props.update ? undefined : props.maxRows}
                    style={props.update ? commentUpdate : commentDisplay}
                    readOnly={!props.update}
                    onChange={handleBodyChange}
                />
                {props.update && (
                    <>
                        <Button onClick={handleCancel}>{"Cancel"}</Button>
                        <Button type="submit">{"Save"}</Button>
                    </>
                )}
            </form>
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
                        <Alert severity="success">{"Updated comment successfully!"}</Alert>
                    </Snackbar>
                </>
            )}
        </>
    );
};

export default CommentTextArea;
