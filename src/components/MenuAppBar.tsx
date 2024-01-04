import Logout from "./Logout";
import Login from "./Login";
import getUserId from "../utils/getUserId";
import { AppBar, IconButton, Toolbar, MenuItem, Menu, Box, Alert, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typewriter from "typewriter-effect";
import React from "react";

const MenuAppBar: React.FC = () => {
    // Logic for Successful Login Alert
    const [successAlert, setSuccessAlert] = React.useState<boolean>(false);
    const openSuccessAlert = () => {
        setUserId(getUserId());
        setSuccessAlert(true);
    };
    const closeSuccessAlert = () => setSuccessAlert(false);

    // Logic for Authentication
    const [userId, setUserId] = React.useState<number | null>(getUserId());

    // Logic for Account Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ffffff", color: "#003D7C" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ whiteSpace: "pre", height: "7em", textAlign: "left" }}>
                    <pre>
                        {" _______ _______ _______      _______              __                            "}
                        <br />
                        {"|    |  |   |   |     __|    |    ___|.--.--.----.|  |--.---.-.-----.-----.-----."}
                        <br />
                        {"|       |   |   |__     |    |    ___||_   _|  __||     |  _  |     |  _  |  -__|"}
                        <br />
                        {"|__|____|_______|_______|    |_______||__.__|____||__|__|___._|__|__|___  |_____|"}
                        <br />
                        {"                                                                    |_____|      "}
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .changeDelay(80)
                                    .pauseFor(1000)
                                    .typeString("Welcome to NUS Exchange Net!")
                                    .start();
                            }}
                        />
                    </pre>
                </Box>
                <Box sx={{ width: "5rem" }}>
                    {userId ? (
                        <>
                            <IconButton sx={{ color: "#003D7C" }} onClick={handleMenu}>
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to="/profile">
                                    {"Profile"}
                                </MenuItem>
                                <Logout />
                            </Menu>
                            {successAlert && (
                                <>
                                    <Snackbar
                                        open={successAlert}
                                        autoHideDuration={6000}
                                        onClose={closeSuccessAlert}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                    >
                                        <Alert severity="success">{"Successfully logged in."}</Alert>
                                    </Snackbar>
                                </>
                            )}
                        </>
                    ) : (
                        <Login callback={openSuccessAlert} />
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MenuAppBar;
