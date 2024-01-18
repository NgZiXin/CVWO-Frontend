import ThreadItemProps from "../types/ThreadItemProps";
import ThreadItemTheme from "../themes/ThreadItemTheme";
import { Card, CardContent, CardActionArea, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import LanguageIcon from "@mui/icons-material/Language";
import { ReactCountryFlag } from "react-country-flag";
import React from "react";

const ThreadItem: React.FC<ThreadItemProps> = (props) => {
    /* This component renders a thread card for display in the Home page. */

    const { thread } = props;

    return (
        <>
            <ThemeProvider theme={ThreadItemTheme}>
                <Card
                    sx={{
                        height: "8rem",
                        margin: "1rem",
                        textAlign: "justify",
                        display: "flex",
                        border: "1px solid #ccc",
                    }}
                >
                    <CardActionArea component={Link} to={`/thread/${thread.id}`}>
                        <CardContent>
                            <Grid
                                container
                                sx={{
                                    wordWrap: "break-word",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    width: "95%",
                                }}
                            >
                                <Typography variant="h5" component="h5">
                                    {thread.title}
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                sx={{
                                    alignItems: "center",
                                }}
                            >
                                {thread.user.country === "--" ? (
                                    <LanguageIcon style={{ width: "1rem", height: "1rem" }} />
                                ) : (
                                    <ReactCountryFlag
                                        countryCode={thread.user.country}
                                        svg
                                        style={{ width: "1rem", height: "1rem" }}
                                    />
                                )}
                                <Typography color="textSecondary" variant="body2" sx={{ ml: "0.5rem" }}>
                                    {`${thread.user.username}, created at ${thread.created_at.toLocaleString()}.`}
                                    {thread.created_at != thread.updated_at ? " [Edited]" : ""}
                                </Typography>
                            </Grid>
                            <Grid container sx={{ height: "2rem" }}>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{
                                        mt: "0.2rem",
                                        wordWrap: "break-word",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {thread.body}
                                </Typography>
                            </Grid>
                            <Grid container sx={{ justifyContent: "flex-end" }}>
                                <Typography color="textSecondary" variant="body2">
                                    {`Likes: ${thread.numLikes}`}
                                </Typography>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </ThemeProvider>
        </>
    );
};

export default ThreadItem;
