import ThreadItemProps from "../types/ThreadItemProps";
import ThreadItemTheme from "../themes/ThreadItemTheme";
import { Card, CardContent, CardActionArea, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import LanguageIcon from "@mui/icons-material/Language";
import ReactCountryFlag from "react-country-flag";
import React from "react";

const ThreadItem: React.FC<ThreadItemProps> = (props) => {
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
                    <CardActionArea component={Link} to={`/thread/${props.thread.id}`}>
                        <CardContent>
                            <Box
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
                                    {props.thread.title}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "auto",
                                }}
                            >
                                {props.thread.user.country === "--" ? (
                                    <LanguageIcon />
                                ) : (
                                    <ReactCountryFlag
                                        countryCode={props.thread.user.country}
                                        svg
                                        style={{ width: "1rem", height: "1rem" }}
                                    />
                                )}
                                <Typography color="textSecondary" variant="body2" sx={{ ml: "0.5rem" }}>
                                    {`${
                                        props.thread.user.username
                                    }, created at ${props.thread.created_at.toLocaleString()}.`}
                                    {props.thread.created_at != props.thread.updated_at ? " [Edited]" : ""}
                                </Typography>
                            </Box>
                            <Box sx={{ height: "2rem" }}>
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
                                    }}
                                >
                                    {props.thread.body}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Typography color="textSecondary" variant="body2">
                                    {`Likes: ${props.thread.numLikes}`}
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </ThemeProvider>
        </>
    );
};

export default ThreadItem;
