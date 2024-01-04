import React from "react";
import { Box, Link, Typography, Modal } from "@mui/material";

const Guidelines: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Link component="button" onClick={handleOpen}>
                <Typography variant="inherit">{"guidelines"}</Typography>
            </Link>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                        {"Please adhere to these rules:"}
                    </Typography>
                    <hr />
                    <Typography component="div">
                        <ol>
                            <li>{"No inappropriate content / language / spam."}</li>
                            <br />
                            <li>{"Be respectful to others and their privacy."}</li>
                            <br />
                            <li>
                                {
                                    "Forum should only be used for the purpose of discussing topics related to the student exchange program in NUS."
                                }
                            </li>
                        </ol>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default Guidelines;
