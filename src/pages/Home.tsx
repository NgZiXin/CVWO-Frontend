import ThreadList from "../components/ThreadList";
import MenuAppBar from "../components/MenuAppBar";
import Guidelines from "../components/Guidelines";
import ThreadCreate from "../components/ThreadCreate";
import { Container, Tabs, Tab, Box, Typography } from "@mui/material";
import React from "react";

const Home: React.FC = () => {
    //Logic to display main thread using ThreadList
    const [categoryId, setCategoryId] = React.useState<number>(1);
    const handleChange = (event: React.SyntheticEvent, newCategoryId: number) => setCategoryId(newCategoryId);

    // Logic for re-rendering thread list upon creation of new thread
    const [toggle, setToggle] = React.useState<boolean>(true);
    const reRender = () => setToggle(!toggle);

    return (
        <>
            <Container>
                <MenuAppBar />
                <Box position="static">
                    <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
                        <Tabs value={categoryId} onChange={handleChange} centered>
                            <Tab label={<Typography variant="body2">General</Typography>} value={1} />
                            <Tab label={<Typography variant="body2">Advice</Typography>} value={2} />
                            <Tab label={<Typography variant="body2">Meet & Connect</Typography>} value={3} />
                        </Tabs>
                    </Box>
                </Box>
                <Typography
                    component="div"
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "2rem" }}
                >
                    <span>
                        {"New here? Please read the "}
                        <Guidelines />
                        {". Else, start creating threads!"}
                    </span>
                    <ThreadCreate reRender={reRender} />
                </Typography>
                <br />
                <ThreadList categoryId={categoryId} toggle={toggle} />
            </Container>
        </>
    );
};

export default Home;
