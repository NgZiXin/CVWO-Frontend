import CommentTextArea from "./CommentTextArea";
import CommentDelete from "./CommentDelete";
import UserInfo from "./UserInfo";
import CommentItemProp from "../types/CommentItemProps";
import CommentItemTheme from "../themes/CommentItemTheme";
import getUserId from "../utils/getUserId";
import { Box, Card, CardContent, Typography, Button, ThemeProvider } from "@mui/material";
import { ReactCountryFlag } from "react-country-flag";
import LanguageIcon from "@mui/icons-material/Language";
import React from "react";

const CommentItem: React.FC<CommentItemProp> = (props) => {
    // Logic for Text Area display
    const [numRows, setNumRows] = React.useState<number>(3);
    const handleShowMore = () => setNumRows(numRows + 3);
    const handleShowLess = () => setNumRows(numRows > 3 ? numRows - 3 : 3);

    // Logic for showing Edit and Delete buttons
    const showButtons: boolean = getUserId() === props.comment.user_id;

    // Logic for opening/closing Comment Update
    const [update, setUpdate] = React.useState<boolean>(false);
    const openUpdate = () => setUpdate(true);
    const closeUpdate = () => {
        props.reRender();
        setUpdate(false);
    };

    return (
        <>
            <ThemeProvider theme={CommentItemTheme}>
                <Card sx={{ mb: "1em", textAlign: "left" }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "auto",
                            }}
                        >
                            {props.comment.user.country === "--" ? (
                                <LanguageIcon style={{ width: "1rem", height: "1rem" }} />
                            ) : (
                                <ReactCountryFlag
                                    countryCode={props.comment.user.country}
                                    svg
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                            )}
                            <Typography color="textSecondary" component="div" variant="body2" sx={{ ml: "0.5rem" }}>
                                <UserInfo user={props.comment.user} />
                                {`, created at ${props.comment.created_at.toLocaleString()}.`}
                                {props.comment.created_at != props.comment.updated_at ? " [Edited]" : ""}
                            </Typography>
                        </Box>
                        <CommentTextArea
                            id={props.comment.id}
                            body={props.comment.body}
                            update={update}
                            closeUpdate={closeUpdate}
                            maxRows={numRows}
                        />
                        {showButtons && !update && (
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box>
                                    {props.comment.body.length > numRows * 73 ? (
                                        <Button onClick={handleShowMore}>{"Show More"}</Button>
                                    ) : (
                                        <></>
                                    )}
                                    {numRows > 3 ? <Button onClick={handleShowLess}>{"Show Less"}</Button> : <></>}
                                </Box>
                                <Box>
                                    <Button onClick={openUpdate} sx={{ color: "#A8ADBD" }}>
                                        {"Edit"}
                                    </Button>
                                    <CommentDelete comment_id={props.comment.id} />
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </ThemeProvider>
        </>
    );
};

export default CommentItem;
