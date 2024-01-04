import React from "react";
import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const SuccessfulSignup: React.FC = () => {
    return (
        <>
            <Container>
                <Typography variant="h5"> Thank you for signing up.</Typography>
                <br />
                <Typography color="textSecondary" variant="body2">
                    Please go back to home page and login
                </Typography>
                <Link to="/">
                    <Button variant="contained" style={{ marginTop: "0.5rem" }}>
                        Home
                    </Button>
                </Link>
            </Container>
        </>
    );
};

export default SuccessfulSignup;
