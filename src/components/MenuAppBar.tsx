import Logout from "./Logout";
import Login from "./Login";
import getUserId from "../utils/getUserId";
import { AppBar, IconButton, Toolbar, MenuItem, Menu, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typewriter from "typewriter-effect";
import React from "react";

const MenuAppBar: React.FC = () => {
    // Logic for Authentication
    const [userId, setUserId] = React.useState<number | null>(getUserId());
    const checkForUserId = () => setUserId(getUserId());
    React.useEffect(checkForUserId, []);

    // Logic for Account Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ffffff", color: (theme) => theme.palette.primary.main }}>
            <Toolbar>
                <Grid container sx={{ height: "7em" }}>
                    <Grid
                        item
                        xs={11}
                        sx={{ whiteSpace: "pre", textAlign: "left", wordBreak: "break-word", overflow: "hidden" }}
                    >
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
                                        .typeString("Welcome to NUS Exchange!")
                                        .start();
                                }}
                            />
                        </pre>
                    </Grid>
                    <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
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
                                    <Logout
                                        callback={() => {
                                            handleClose();
                                            checkForUserId();
                                        }}
                                    />
                                </Menu>
                            </>
                        ) : (
                            <Login callback={checkForUserId} />
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default MenuAppBar;
