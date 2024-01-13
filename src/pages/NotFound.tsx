import React from "react";
import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <>
            <Container sx={{ textAlign: "center" }}>
                <Typography variant="h1">{"404"}</Typography>
                <Typography color="textSecondary" variant="body2">
                    {"Not Found"}
                </Typography>
                <Link to="/">
                    <Button variant="outlined" sx={{ mt: "0.5rem" }}>
                        {"Home"}
                    </Button>
                </Link>
            </Container>
        </>
    );
};

export default NotFound;
