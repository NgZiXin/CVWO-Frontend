import CommentItem from "./CommentItem";
import Comment from "../types/Comment";
import CommentListProp from "../types/CommentListProps";
import apiUrl from "../data/apiUrl";
import { Typography, Grid } from "@mui/material";
import React from "react";

const CommentList: React.FC<CommentListProp> = (props) => {
    // Logic to query for comments
    const commentsUrl = `${apiUrl}/main_threads/${props.main_thread_id}/comments`;
    const [comments, setComments] = React.useState<Comment[]>([]);
    const getComments = async () => {
        try {
            const response = await fetch(commentsUrl, {
                method: "GET",
                mode: "cors",
                credentials: "include",
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
    }, [props.toggle]);

    return (
        <>
            <Grid container sx={{ justifyContent: "flex-start" }}>
                <Typography variant="body2">{`Total number of comments: ${comments.length}`}</Typography>
            </Grid>
            <ul style={{ paddingInlineStart: "unset" }}>
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} reRender={getComments} />
                ))}
            </ul>
        </>
    );
};

export default CommentList;
