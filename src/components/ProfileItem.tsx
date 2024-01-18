import ProfileItemProps from "../types/ProfileItemProps";
import ProfileItemFields from "../types/ProfileItemFields";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import countries from "../data/countries";
import { Grid, Button, MenuItem, Typography, TextField, Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { ReactCountryFlag } from "react-country-flag";
import React from "react";

const ProfileItem: React.FC<ProfileItemProps> = (props) => {
    /* This component handles the display and updating of user's profile in the profile page */

    const { user, callback } = props;
    const patchUrl: string = `${apiUrl}/users/${user.id}`;
    const setAlertMessage: (message: string | null) => void = useOutletContext();

    // Logic for displaying user's data
    const defaultFields: ProfileItemFields = {
        username: user.username,
        bio: user.bio,
        country: user.country,
    };
    const [fields, setFields] = React.useState<ProfileItemFields>(defaultFields);

    // Logic for update button
    const [update, setUpdate] = React.useState<boolean>(false);
    const openUpdate = (): void => setUpdate(true);
    const closeUpdate = (): void => setUpdate(false);

    // Logic for updating user data
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields((prevState) => {
            return { ...prevState, username: event.target.value };
        });
    };
    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields((prevState) => {
            return { ...prevState, bio: event.target.value };
        });
    };
    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields((prevState) => {
            return { ...prevState, country: event.target.value };
        });
    };
    const handleCancel = () => {
        setFields(defaultFields);
        setMessage("");
        closeUpdate();
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const FormElement = event.target as HTMLFormElement;
        const data: FormData = new FormData(FormElement);
        const updateProfile = async () => {
            try {
                const response: Response = await fetch(patchUrl, {
                    method: "PATCH",
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${getJWT()}`,
                    },
                    body: data,
                });
                if (response.ok) {
                    closeUpdate();
                    callback();
                    setAlertMessage("Profile Updated Successfully!");
                } else {
                    const errorData = await response.json();
                    if (errorData && errorData.message) {
                        console.log(errorData.message);
                        setMessage(errorData.message);
                    }
                }
            } catch (err) {
                console.error(`Error: ${err}`);
            }
        };
        updateProfile();
    };

    // Logic for error display text
    const [message, setMessage] = React.useState<string>("");

    return (
        <>
            <Box>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Typography variant="h5"> {"My Profile"}</Typography>
                    <TextField
                        id="username"
                        required
                        label="username"
                        margin="normal"
                        fullWidth
                        name="user[username]"
                        value={fields.username}
                        onChange={handleUsernameChange}
                        disabled={!update}
                        InputProps={{
                            inputProps: { maxLength: 25 },
                        }}
                    />
                    <TextField
                        id="bio"
                        required
                        label="bio"
                        multiline
                        rows={5}
                        placeholder="Write about yourself!"
                        margin="normal"
                        fullWidth
                        name="user[bio]"
                        value={fields.bio}
                        onChange={handleBioChange}
                        disabled={!update}
                    />
                    <Grid container sx={{ alignItems: "center" }} direction="row" justifyContent="space-between">
                        <Grid item>
                            <TextField
                                id="country"
                                required
                                select
                                label="Country"
                                defaultValue="--"
                                margin="normal"
                                name="user[country]"
                                value={fields.country}
                                onChange={handleCountryChange}
                                disabled={!update}
                            >
                                {countries.map((option) => (
                                    <MenuItem key={option.id} value={option.countryCode}>
                                        {option.country}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {fields.country === "--" ? (
                                <LanguageIcon style={{ marginLeft: "2rem", marginTop: "2rem" }} />
                            ) : (
                                <ReactCountryFlag
                                    countryCode={fields.country}
                                    svg
                                    style={{
                                        width: "1rem",
                                        height: "1rem",
                                        marginLeft: "2rem",
                                        marginTop: "2rem",
                                    }}
                                />
                            )}
                        </Grid>
                        <Grid item>
                            {update ? (
                                <>
                                    <Button onClick={handleCancel}>{"Cancel"}</Button>
                                    <Button type="submit" key="submitUpdate">
                                        {"Save"}
                                    </Button>
                                </>
                            ) : (
                                <Button type="button" onClick={openUpdate} key="openUpdate" sx={{ color: "#A8ADBD" }}>
                                    {"Edit"}
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    <Typography variant="body2" component="div" sx={{ color: "red", textAlign: "right" }}>
                        {message}
                    </Typography>
                </form>
            </Box>
        </>
    );
};

export default ProfileItem;
