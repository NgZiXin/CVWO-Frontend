import SignupFormFields from "../types/SignupFormFields";
import countries from "../data/countries";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import { Typography, Button, TextField, Container, Grid, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { ReactCountryFlag } from "react-country-flag";
import React from "react";

const signupUrl: string = `${apiUrl}/users/signup`;

const defaultFields: SignupFormFields = {
    username: "",
    password: "",
    bio: "",
    country: "--",
};

const Signup: React.FC = () => {
    const navigate = useNavigate();

    // Logic for form
    const [fields, setFields] = React.useState<SignupFormFields>(defaultFields);
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields((prevState) => {
            return { ...prevState, username: event.target.value };
        });
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields((prevState) => {
            return { ...prevState, password: event.target.value };
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

    // Logic for buttons
    const handleBack = () => navigate(-1);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const FormElement = event.target as HTMLFormElement;
        const data: FormData = new FormData(FormElement);
        const signup = async () => {
            try {
                const response: Response = await fetch(signupUrl, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${getJWT()}`,
                    },
                    body: data,
                });
                if (response.ok) {
                    const response_items = await response.json();
                    document.cookie = `user_id=${response_items.user.id}; Secure`;
                    document.cookie = `JWT=${response_items.token}; Secure`;
                    window.location.href = "/successfulsignup";
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
        signup();
    };

    // Logic for error display text
    const [message, setMessage] = React.useState<string>("");

    return (
        <>
            <Container sx={{ textAlign: "left" }}>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Typography variant="h5">{"Signup Form"}</Typography>
                    <TextField
                        id="username"
                        required
                        label="username"
                        helperText="Maximum 25 characters."
                        margin="normal"
                        fullWidth
                        name="user[username]"
                        value={fields.username}
                        onChange={handleUsernameChange}
                        InputProps={{
                            inputProps: { maxLength: 25 },
                        }}
                    />
                    <TextField
                        id="password"
                        required
                        label="password"
                        helperText="Minimum 5 characters."
                        margin="normal"
                        fullWidth
                        name="user[password]"
                        value={fields.password}
                        onChange={handlePasswordChange}
                        InputProps={{
                            inputProps: { minLength: 5 },
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
                    />
                    <TextField
                        id="country"
                        required
                        select
                        label="Country"
                        defaultValue="--"
                        helperText="Share where you are from!"
                        margin="normal"
                        name="user[country]"
                        value={fields.country}
                        onChange={handleCountryChange}
                    >
                        {countries.map((option) => (
                            <MenuItem key={option.id} value={option.countryCode}>
                                {option.country}
                            </MenuItem>
                        ))}
                    </TextField>
                    {fields.country === "--" ? (
                        <LanguageIcon
                            style={{ marginLeft: "2rem", marginTop: "2rem", width: "1rem", height: "1rem" }}
                        />
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
                    <Typography variant="body2" sx={{ color: "red" }}>
                        {message}
                    </Typography>
                    <Grid container justifyContent="flex-end">
                        <Button onClick={handleBack}>{"Back"}</Button>
                        <Button type="submit">{"Submit"}</Button>
                    </Grid>
                </form>
            </Container>
        </>
    );
};

export default Signup;
