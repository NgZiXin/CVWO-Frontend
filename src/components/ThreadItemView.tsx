import UserInfo from "./UserInfo";
import ThreadItemViewProps from "../types/ThreadItemViewProps";
import ThreadItemViewTheme from "../themes/ThreadItemViewTheme";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LanguageIcon from "@mui/icons-material/Language";
import { ReactCountryFlag } from "react-country-flag";
import React from "react";

const ThreadItemView: React.FC<ThreadItemViewProps> = (props) => {
    const { thread } = props;

    return (
        <>
            <ThemeProvider theme={ThreadItemViewTheme}>
                <Card
                    sx={{
                        textAlign: "justify",
                        display: "flex",
                        border: "1px solid #ccc",
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h5"
                            sx={{ wordBreak: "break-word", overflowWrap: "break-word", textAlign: "justify" }}
                        >
                            {thread.title}
                        </Typography>
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
                            <Typography color="textSecondary" variant="body2" component="div" sx={{ ml: "0.5rem" }}>
                                <UserInfo user={thread.user} />
                                {` created at ${thread.created_at.toLocaleString()}.`}
                                {thread.created_at != thread.updated_at ? " [Edited]" : ""}
                            </Typography>
                        </Grid>
                        <Grid container>
                            <Typography
                                variant="body1"
                                component="p"
                                sx={{
                                    mt: "0.2rem",
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    minHeight: "5rem",
                                    whiteSpace: "pre-line",
                                    textAlign: "justify",
                                }}
                            >
                                {thread.body}
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </ThemeProvider>
        </>
    );
};

export default ThreadItemView;
