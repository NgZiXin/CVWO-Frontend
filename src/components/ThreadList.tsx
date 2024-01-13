import ThreadItem from "./ThreadItem";
import Thread from "../types/Thread";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import ThreadListProps from "../types/ThreadListProps";
import { Typography, Grid, Link } from "@mui/material";
import React from "react";

const ThreadList: React.FC<ThreadListProps> = (props) => {
    const { categoryId } = props;
    const threadListUrl: string = `${apiUrl}/categories/${categoryId}`;

    // Logic to query thread list
    const [threads, setThreads] = React.useState<Thread[]>([]);
    const getThreads = async () => {
        try {
            const response: Response = await fetch(threadListUrl, {
                method: "GET",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${getJWT()}`,
                },
            });
            if (response.ok) {
                const response_items = await response.json();
                setThreads(response_items.main_threads);
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
    React.useEffect(() => {
        getThreads().then(() => sortByDate());
    }, [props]);

    // Logic for sorting
    const sortByDate = () => {
        setThreads((threads) =>
            threads.slice().sort((threadA, threadB) => {
                const dateA = new Date(threadA.created_at);
                const dateB = new Date(threadB.created_at);
                return dateB.valueOf() - dateA.valueOf();
            }),
        );
    };
    const sortByLikes = () => {
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
            <ul style={{ paddingInlineStart: "unset" }}>
                {threads.map((thread) => (
                    <ThreadItem key={thread.id} thread={thread} />
                ))}
            </ul>
        </>
    );
};

export default ThreadList;
