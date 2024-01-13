import NotFound from "./NotFound";
import ThreadItemView from "../components/ThreadItemView";
import ThreadUpdate from "../components/ThreadUpdate";
import ThreadDelete from "../components/ThreadDelete";
import ThreadLike from "../components/ThreadLike";
import CommentCreate from "../components/CommentCreate";
import CommentList from "../components/CommentList";
import Thread from "../types/Thread";
import apiUrl from "../data/apiUrl";
import getUserId from "../utils/getUserId";
import getJWT from "../utils/getJWT";
import { Container, Box, Button, Grid, Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import React from "react";

const ThreadView: React.FC = () => {
    const userId: number | null = getUserId();
    const { id } = useParams();

    // Logic to query for thread
    const threadUrl: string = `${apiUrl}/main_threads/${id}`;
    const [thread, setThread] = React.useState<Thread>();
    const getThread = async () => {
        try {
            const response: Response = await fetch(threadUrl, {
                method: "GET",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${getJWT()}`,
                },
            });
            if (response.ok) {
                const thread = await response.json();
                setThread(thread);
            } else {
                setDisplayNotFound(true);
                const errorData = await response.json();
                if (errorData && errorData.message) {
                    console.log(errorData.message);
                }
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };
    React.useEffect(() => {
        getThread();
    }, []);

    // Logic to set Not Found page
    const [displayNotFound, setDisplayNotFound] = React.useState<boolean>(false);

    // Logic for re-rendering comments list upon creation of new comment
    const [toggle, setToggle] = React.useState<boolean>(true);
    const reRenderComments = () => setToggle(!toggle);

    return (
        <>
            {thread ? (
                <Container>
                    <Grid container sx={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Link to={"/"} style={{ textDecoration: "none" }}>
                            <Button color="primary" variant="outlined">
                                {"Back to threads"}
                            </Button>
                        </Link>
                        {!userId && (
                            <Typography variant="body2" component="div" color="textSecondary" sx={{ ml: "1rem" }}>
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            .changeDelay(80)
                                            .pauseFor(1000)
                                            .typeString(
                                                "(You are currently not logged in. Return to threads to log in.)",
                                            )
                                            .start();
                                    }}
                                />
                            </Typography>
                        )}
                    </Grid>
                    <br />
                    <ThreadItemView thread={thread} />
                    <Grid container sx={{ justifyContent: "space-between" }}>
                        <ThreadLike main_thread_id={thread.id} />
                        {userId === thread.user_id && (
                            <Box>
                                <ThreadUpdate thread={thread} callback={getThread} />
                                <ThreadDelete main_thread_id={thread.id} />
                            </Box>
                        )}
                    </Grid>
                    <br />
                    <CommentCreate main_thread_id={thread.id} callback={reRenderComments} />
                    <br />
                    <CommentList main_thread_id={thread.id} toggle={toggle} />
                </Container>
            ) : (
                displayNotFound && <NotFound />
            )}
        </>
    );
};

export default ThreadView;
