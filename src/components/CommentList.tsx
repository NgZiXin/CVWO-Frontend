import CommentItem from "./CommentItem";
import Comment from "../types/Comment";
import CommentListProp from "../types/CommentListProps";
import url from "../data/url";
import { Typography, Grid } from "@mui/material";
import React from "react";

const CommentList: React.FC<CommentListProp> = (props) => {
    // Logic to query for comments
    const commentsUrl = `${url}/main_threads/${props.main_thread_id}/comments`;
    const [comments, setComments] = React.useState<Comment[]>([]);
    const getComments = () => {
        fetch(commentsUrl, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((response_items) => setComments(response_items))
            .catch((err) => console.log(`Error:${err.message}`));
    };
    React.useEffect(() => getComments(), [props.toggle]);

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
