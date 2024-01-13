import ThreadFormFields from "../types/ThreadFormFields";
import ThreadUpdateProps from "../types/ThreadUpdateProps";
import categories from "../data/categories";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import { Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import React from "react";

const ThreadUpdate: React.FC<ThreadUpdateProps> = (props) => {
    const { thread, callback } = props;
    const patchUrl: string = `${apiUrl}/main_threads/${thread.id}`;
    const defaultFields: ThreadFormFields = {
        title: thread.title,
        body: thread.body,
        category_id: thread.category_id,
    };
    const setAlertMessage: (message: string | null) => void = useOutletContext();

    // Logic for Button
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Logic for Form Fields
    const [fields, setFields] = React.useState<ThreadFormFields>(defaultFields);
    const handleReset = () => setFields(defaultFields);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const FormElement = event.target as HTMLFormElement;
        const data: FormData = new FormData(FormElement);
        const updateThread = async () => {
            try {
                const response: Response = await fetch(patchUrl, {
                    method: "PATCH",
                    mode: "cors",
                    body: data,
                    headers: {
                        Authorization: `Bearer ${getJWT()}`,
                    },
                });
                if (response.ok) {
                    handleReset();
                    handleClose();
                    callback();
                    setAlertMessage("Thread Updated Successfully!");
                } else {
                    const errorData = await response.json();
                    if (errorData && errorData.message) {
                        console.log(errorData.message);
                    }
                }
            } catch (err) {
                console.error(`Error: ${err}`);
            }
        };
        updateThread();
    };
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields((prevState) => {
            return { ...prevState, title: event.target.value };
        });
    };
    const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields((prevState) => {
            return { ...prevState, body: event.target.value };
        });
    };
    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCategory = event.target.value as unknown as number; // Assert type number
        setFields((prevState) => {
            return { ...prevState, category_id: newCategory };
        });
    };

    return (
        <>
            <Button sx={{ color: "#A8ADBD" }} onClick={handleOpen}>
                {"EDIT"}
            </Button>
            <Dialog open={open} maxWidth="md" fullWidth>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <DialogTitle>{"Edit thread"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="main_thread_title"
                            required
                            label="Title"
                            multiline
                            rows={2}
                            placeholder="Start with something interesting..."
                            helperText="Max 200 characters."
                            margin="normal"
                            fullWidth
                            name="main_thread[title]"
                            value={fields.title}
                            onChange={handleTitleChange}
                            InputProps={{
                                inputProps: { maxLength: 200 },
                            }}
                        />
                        <TextField
                            id="main_thread_body"
                            required
                            label="Body"
                            multiline
                            rows={10}
                            placeholder="Pen down your thoughts!"
                            margin="normal"
                            fullWidth
                            name="main_thread[body]"
                            value={fields.body}
                            onChange={handleBodyChange}
                        />
                        <TextField
                            id="main_thread_category"
                            required
                            select
                            label="Select Category"
                            defaultValue="1"
                            helperText="Please select category"
                            margin="normal"
                            name="main_thread[category_id]"
                            value={fields.category_id}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.category}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleReset}>{"Reset"}</Button>
                        <Button onClick={handleClose}>{"Cancel"}</Button>
                        <Button type="submit">{"Submit"}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ThreadUpdate;
