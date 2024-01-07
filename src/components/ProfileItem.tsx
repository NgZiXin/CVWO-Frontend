import ProfileItemProps from "../types/ProfileItemProps";
import ProfileItemFields from "../types/ProfileItemFields";
import apiUrl from "../data/apiUrl";
import countries from "../data/countries";
import { Grid, Button, MenuItem, Typography, TextField, Snackbar, Alert } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { ReactCountryFlag } from "react-country-flag";
import React from "react";

const ProfileItem: React.FC<ProfileItemProps> = (props) => {
    // Logic for displaying user's data
    const defaultFields: ProfileItemFields = {
        username: props.user.username,
        bio: props.user.bio,
        country: props.user.country,
    };
    const [fields, setFields] = React.useState<ProfileItemFields>(defaultFields);

    // Logic for update button
    const [update, setUpdate] = React.useState<boolean>(false);
    const openUpdate = (): void => setUpdate(true);
    const closeUpdate = (): void => setUpdate(false);

    // Logic for updating user data
    const patchUrl = `${apiUrl}/users/${props.user.id}`;
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
        const data = new FormData(FormElement);
        const updateProfile = async () => {
            try {
                const response = await fetch(patchUrl, {
                    method: "PATCH",
                    mode: "cors",
                    body: data,
                    credentials: "include",
                });
                if (response.ok) {
                    openSuccessAlert();
                    closeUpdate();
                    props.reRender();
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

    // Logic for Successful Update Alert
    const [successAlert, setSuccessAlert] = React.useState<boolean>(false);
    const openSuccessAlert = () => setSuccessAlert(true);
    const closeSuccessAlert = () => setSuccessAlert(false);

    return (
        <>
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
                        <Alert severity="success">{"Successfully updated profile."}</Alert>
                    </Snackbar>
                </>
            )}
        </>
    );
};

export default ProfileItem;
