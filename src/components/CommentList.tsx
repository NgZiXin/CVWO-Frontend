import CommentItem from "./CommentItem";
import Comment from "../types/Comment";
import CommentListProp from "../types/CommentListProps";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import { Typography, Grid, Box } from "@mui/material";
import React from "react";

const CommentList: React.FC<CommentListProp> = (props) => {
    /* This component formats all the comments of a particular thread nicely in a list. */

    const { main_thread_id } = props;
    const commentsUrl: string = `${apiUrl}/main_threads/${main_thread_id}/comments`;

    // Logic to query for comments
    const [comments, setComments] = React.useState<Comment[]>([]);
    const getComments = async () => {
        try {
            const response: Response = await fetch(commentsUrl, {
                method: "GET",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${getJWT()}`,
                },
            });
            if (response.ok) {
                const comments = await response.json();
                setComments(comments.reverse());
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
    React.useEffect(() => {
        getComments();
    }, [props]);

    return (
        <>
            <Box sx={{ width: "90%", margin: "auto" }}>
                <Grid container sx={{ justifyContent: "flex-start" }}>
                    <Typography variant="body2">{`Total number of comments: ${comments.length}`}</Typography>
                </Grid>
                <ul style={{ paddingInlineStart: "unset" }}>
                    {comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} callback={getComments} />
                    ))}
                </ul>
            </Box>
        </>
    );
};

export default CommentList;
