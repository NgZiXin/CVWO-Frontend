import CommentTextAreaProps from "../types/CommentTextAreaProps";
import url from "../data/url";
import React from "react";
import { TextareaAutosize, Button, Alert, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const commonStyle = {
    width: "100%",
    fontSize: "1rem",
    borderRadius: "4px",
};

const useStyles = makeStyles(() => ({
    commentDisplay: {
        ...commonStyle,
        outline: "none",
        border: "none",
        wordWrap: "break-word",
        overflow: "hidden",
        textOverflow: "ellipsis",
        resize: "none",
    },

    commentUpdate: {
        ...commonStyle,
        border: "none",
        outline: "2px solid #ccc",
        resize: "none",
    },
}));

const CommentTextArea: React.FC<CommentTextAreaProps> = (props) => {
    const patchUrl = `${url}/comments/${props.id}`;
    const classes = useStyles();

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
        fetch(patchUrl, {
            method: "PATCH",
            mode: "cors",
            body: data,
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    props.closeUpdate();
                    openSuccessAlert();
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
                    className={props.update ? classes.commentUpdate : classes.commentDisplay}
                    readOnly={!props.update}
                    onChange={handleBodyChange}
                />
                {props.update && (
                    <>
                        <Button type="submit">{"Save"}</Button>
                        <Button onClick={handleCancel}>{"Cancel"}</Button>{" "}
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