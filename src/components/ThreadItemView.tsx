import ThreadItemViewProps from "../types/ThreadItemViewProps";
import ThreadItemViewTheme from "../themes/ThreadItemViewTheme";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LanguageIcon from "@mui/icons-material/Language";
import ReactCountryFlag from "react-country-flag";
import React from "react";

const ThreadItemView: React.FC<ThreadItemViewProps> = (props) => {
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
                        <Typography variant="h5" sx={{ wordBreak: "break-word", textAlign: "justify" }}>
                            {props.thread.title}
                        </Typography>
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
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{ mt: "0.2rem", minHeight: "5rem", whiteSpace: "pre-line", textAlign: "justify" }}
                        >
                            {props.thread.body}
                        </Typography>
                    </CardContent>
                </Card>
            </ThemeProvider>
        </>
    );
};

export default ThreadItemView;
