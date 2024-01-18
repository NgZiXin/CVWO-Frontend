import CommentTextArea from "./CommentTextArea";
import CommentDelete from "./CommentDelete";
import UserInfo from "./UserInfo";
import CommentItemProp from "../types/CommentItemProps";
import CommentItemTheme from "../themes/CommentItemTheme";
import getUserId from "../utils/getUserId";
import { Grid, Card, CardContent, Typography, Button, ThemeProvider } from "@mui/material";
import { ReactCountryFlag } from "react-country-flag";
import LanguageIcon from "@mui/icons-material/Language";
import React from "react";

const CommentItem: React.FC<CommentItemProp> = (props) => {
    /* This component renders a comment card for display. Only the user who wrote the comment 
    will be able to see the edit and delete button. If the comment text is too long to fit into 
    the card, users will be able to select "show more" or "show less" to view more or less of the 
    comment. The callback funtion here is triggered only when there is an update made to the comment
    and its purpose is to re-render the CommentList so as to reflect the new changes for the user.*/

    const { comment, callback } = props;

    // Logic for Text Area display
    const [numRows, setNumRows] = React.useState<number>(3);
    const handleShowMore = () => setNumRows(numRows + 3);
    const handleShowLess = () => setNumRows(numRows > 3 ? numRows - 3 : 3);

    // Logic for showing Edit and Delete buttons
    const showButtons: boolean = getUserId() === comment.user_id;

    // Logic for opening/closing Comment Update
    const [update, setUpdate] = React.useState<boolean>(false);
    const openUpdate = () => setUpdate(true);
    const closeUpdate = () => {
        callback();
        setUpdate(false);
    };

    return (
        <>
            <ThemeProvider theme={CommentItemTheme}>
                <Card sx={{ mb: "1em", textAlign: "left" }}>
                    <CardContent>
                        <Grid
                            container
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            {comment.user.country === "--" ? (
                                <LanguageIcon style={{ width: "1rem", height: "1rem" }} />
                            ) : (
                                <ReactCountryFlag
                                    countryCode={comment.user.country}
                                    svg
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                            )}
                            <Typography color="textSecondary" component="div" variant="body2" sx={{ ml: "0.5rem" }}>
                                <UserInfo user={comment.user} />
                                {`, created at ${comment.created_at.toLocaleString()}.`}
                                {comment.created_at != comment.updated_at ? " [Edited]" : ""}
                            </Typography>
                        </Grid>
                        <CommentTextArea
                            id={comment.id}
                            body={comment.body}
                            update={update}
                            closeUpdate={closeUpdate}
                            maxRows={numRows}
                        />
                        {!update && (
                            <>
                                <Grid
                                    container
                                    sx={{ alignItems: "center" }}
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Grid item>
                                        {comment.body.length > numRows * 73 ? (
                                            <Button onClick={handleShowMore}>{"Show More"}</Button>
                                        ) : (
                                            <></>
                                        )}
                                        {numRows > 3 ? <Button onClick={handleShowLess}>{"Show Less"}</Button> : <></>}
                                    </Grid>
                                    {showButtons && (
                                        <>
                                            <Grid item>
                                                <Button onClick={openUpdate} sx={{ color: "#A8ADBD" }}>
                                                    {"Edit"}
                                                </Button>
                                                <CommentDelete comment_id={comment.id} callback={callback} />
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </>
                        )}
                    </CardContent>
                </Card>
            </ThemeProvider>
        </>
    );
};

export default CommentItem;
