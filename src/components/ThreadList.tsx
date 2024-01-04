import ThreadItem from "./ThreadItem";
import Thread from "../types/Thread";
import url from "../data/url";
import ThreadListProps from "../types/ThreadListProps";
import React from "react";
import { Typography, Grid, Link } from "@mui/material";

const ThreadList: React.FC<ThreadListProps> = (props) => {
    // Logic to query thread list
    const threadListUrl = `${url}/categories/${props.categoryId}`;
    const [threads, setThreads] = React.useState<Thread[]>([]);
    const getThreads = () => {
        fetch(threadListUrl, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((response_items) => setThreads(() => response_items.main_threads.reverse()))
            .catch((err) => console.log(`Error:${err.message}`));
    };
    React.useEffect(() => getThreads(), [props.categoryId, props.toggle]);

    // Logic for sorting
    const sortByDate = (): void => {
        setThreads((threads) =>
            threads.slice().sort((threadA, threadB) => {
                const dateA = new Date(threadA.created_at);
                const dateB = new Date(threadB.created_at);
                return dateB.valueOf() - dateA.valueOf();
            }),
        );
    };
    const sortByLikes = (): void => {
        setThreads((threads) => threads.slice().sort((threadA, threadB) => threadB.numLikes - threadA.numLikes));
    };

    return (
        <>
            <Grid container sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Typography
                    variant="body2"
                    sx={{ ml: "1rem" }}
                >{`Total number of threads: ${threads.length}`}</Typography>

                <Typography
                    variant="body2"
                    component="div"
                    sx={{ display: "flex", alignItems: "center", mr: "1.25rem" }}
                >
                    <Typography variant="inherit">{"sort: "}</Typography>
                    <Link component="button" onClick={sortByDate}>
                        <Typography variant="inherit" sx={{ ml: "0.5rem" }}>
                            {"date"}
                        </Typography>
                    </Link>
                    <Link component="button" onClick={sortByLikes}>
                        <Typography variant="inherit" sx={{ ml: "0.5rem" }}>
                            {"likes"}
                        </Typography>
                    </Link>
                </Typography>
            </Grid>
            {threads.map((thread) => (
                <ThreadItem key={thread.id} thread={thread} />
            ))}
        </>
    );
};

export default ThreadList;
