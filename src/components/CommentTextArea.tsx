import CommentTextAreaProps from "../types/CommentTextAreaProps";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import { TextareaAutosize, Button, Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import React from "react";

const commonStyle: React.CSSProperties = {
    width: "100%",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    resize: "none",
};

const commentDisplay: React.CSSProperties = {
    ...commonStyle,
    outline: "none",
    wordWrap: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
};

const commentUpdate: React.CSSProperties = {
    ...commonStyle,
    outline: "2px solid #ccc",
};

const CommentTextArea: React.FC<CommentTextAreaProps> = (props) => {
    /* This component handles the display of text within the comment card itself.
    Users editing their comments will interact directly with this textarea. */

    const { id, body, maxRows, update, closeUpdate } = props;
    const patchUrl: string = `${apiUrl}/comments/${id}`;
    const setAlertMessage: (message: string | null) => void = useOutletContext();

    // Logic for Text Area Form
    const [textBody, setTextBody] = React.useState<string>(body);
    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextBody(() => event.target.value);
    };
    const handleCancel = () => {
        setTextBody(body);
        closeUpdate();
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const FormElement = event.target as HTMLFormElement;
        const data: FormData = new FormData(FormElement);
        const updateComment = async () => {
            try {
                const response: Response = await fetch(patchUrl, {
                    method: "PATCH",
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${getJWT()}`,
                    },
                    body: data,
                });
                if (response.ok) {
                    closeUpdate();
                    setAlertMessage("Comment Updated Successfully!");
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

    return (
        <>
            <Box>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <TextareaAutosize
                        id="comment_body"
                        name="comment[body]"
                        value={textBody}
                        maxRows={update ? undefined : maxRows}
                        style={update ? commentUpdate : commentDisplay}
                        readOnly={!update}
                        onChange={handleBodyChange}
                    />
                    {update && (
                        <>
                            <Button onClick={handleCancel}>{"Cancel"}</Button>
                            <Button type="submit">{"Save"}</Button>
                        </>
                    )}
                </form>
            </Box>
        </>
    );
};

export default CommentTextArea;
