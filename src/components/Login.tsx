import LoginFormFields from "../types/LoginFormFields";
import LoginProps from "../types/LoginProps";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link, useOutletContext } from "react-router-dom";

const loginUrl: string = `${apiUrl}/login`;

const defaultFields: LoginFormFields = {
    username: "",
    password: "",
};

const Login: React.FC<LoginProps> = (props) => {
    const { callback } = props;
    const setAlertMessage: (message: string | null) => void = useOutletContext();

    // Logic for opening dialog
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(() => true);
    const handleClose = () => {
        setFields(() => defaultFields);
        setOpen(() => false);
    };

    // Logic for dialog's form
    const [fields, setFields] = React.useState<LoginFormFields>(defaultFields);
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
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const FormElement = event.target as HTMLFormElement;
        const data: FormData = new FormData(FormElement);
        const login = async () => {
            try {
                const response: Response = await fetch(loginUrl, {
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
                    handleClose();
                    callback();
                    setAlertMessage("Successfully Logged In!");
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
        login();
    };

    // Logic for error display text
    const [message, setMessage] = React.useState<string>("");

    return (
        <>
            <Button variant="outlined" onClick={handleOpen}>
                {"Login"}
            </Button>
            <Dialog open={open} maxWidth="xs" fullWidth>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <DialogTitle>{"Login"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText display={"flex"} alignItems={"center"}>
                            <span>
                                {"No account? Sign up "} <Link to="/signup">{"here"}</Link>
                                {". "}
                            </span>
                        </DialogContentText>
                        <TextField
                            id="username"
                            required
                            label="username"
                            margin="normal"
                            fullWidth
                            name="username"
                            value={fields.username}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            id="password"
                            required
                            label="password"
                            margin="normal"
                            fullWidth
                            name="password"
                            value={fields.password}
                            onChange={handlePasswordChange}
                        />
                        <DialogContentText sx={{ color: "red" }}>{message}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{"Cancel"}</Button>
                        <Button type="submit">{"Submit"}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default Login;
