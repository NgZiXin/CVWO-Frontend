import UserInfoProps from "../types/UserInfoProps";
import countries from "../data/countries";
import React from "react";
import {
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
    Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { ReactCountryFlag } from "react-country-flag";

const UserInfo: React.FC<UserInfoProps> = (props) => {
    /* This component handles the display of one's profile information when the user click on
    the particular username. */

    const { user } = props;

    // Logic for opening dialog
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(() => true);
    const handleClose = () => setOpen(() => false);

    // Logic to obtain country name of user
    const getCountryName = (countryCode: string): string => {
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].countryCode === countryCode) {
                return countries[i].country;
            }
        }
        return "Not Specified";
    };
    const countryName: string = getCountryName(user.country);

    return (
        <>
            <Link component="button" onClick={handleOpen}>
                <Typography variant="inherit" color="textSecondary">{`${user.username}`}</Typography>
            </Link>
            <Dialog open={open} maxWidth="sm" fullWidth>
                <DialogTitle>{"User Info:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography sx={{ color: "black" }}>{"Username:"}</Typography>
                            </Grid>
                            <Grid item>{`${user.username}`}</Grid>
                        </Grid>
                        <br />
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography sx={{ color: "black" }}>{"Country:"}</Typography>
                            </Grid>
                            <Grid item>{countryName}</Grid>
                            <Grid item>
                                {user.country === "--" ? (
                                    <LanguageIcon style={{ marginLeft: "0.5rem", width: "1rem", height: "1rem" }} />
                                ) : (
                                    <ReactCountryFlag
                                        countryCode={user.country}
                                        svg
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                            marginLeft: "0.5rem",
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography sx={{ color: "black" }}>{"Bio:"}</Typography>
                            </Grid>
                            <Grid item>{user.bio}</Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{"Close"}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserInfo;
