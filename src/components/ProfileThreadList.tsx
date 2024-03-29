import History from "../types/History";
import ProfileThreadListProps from "../types/ProfileThreadListProps";
import HistoryFilter from "../types/HistoryFilter";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
import { Typography, Grid, List, ListItem, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const historyUrl: string = `${apiUrl}/me/history`;

const ProfileThreadList: React.FC<ProfileThreadListProps> = (props) => {
    /* This component handles the display of the list of user's history of actions. */

    const { historyFilter } = props;

    //Logic to query for user's history
    const [history, setHistory] = React.useState<History[]>([]);
    const getHistory = async () => {
        try {
            const response: Response = await fetch(historyUrl, {
                method: "GET",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${getJWT()}`,
                },
            });
            if (response.ok) {
                const response_items = await response.json();
                const unsortedHistory: History[] = response_items.history;
                setHistory(
                    unsortedHistory.sort((itemA, itemB) => {
                        const dateA = new Date(itemA.created_at);
                        const dateB = new Date(itemB.created_at);
                        return dateB.valueOf() - dateA.valueOf();
                    }),
                );
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
        getHistory();
    }, []);

    // Logic to obtain filtered data for display
    const [filteredHistory, setFilteredHistory] = React.useState<History[]>([]);
    const getFilteredHistory = (historyFilter: HistoryFilter) =>
        setFilteredHistory(
            history.filter(
                (record) =>
                    (historyFilter.post && record.activity === "post") ||
                    (historyFilter.comment && record.activity === "comment") ||
                    (historyFilter.like && record.activity === "like"),
            ),
        );
    React.useEffect(() => getFilteredHistory(historyFilter), [history, props]);

    return (
        <>
            <Grid container>{`Activities record: ${filteredHistory.length}`}</Grid>
            <List>
                <ListItem key="header">
                    <Grid container sx={{ textAlign: "center" }}>
                        <Grid item xs={2}>
                            {"S/n"}
                        </Grid>
                        <Grid item xs={2}>
                            {"Activity"}
                        </Grid>
                        <Grid item xs={5}>
                            {"Date"}
                        </Grid>
                        <Grid item xs={3}>
                            {"Link"}
                        </Grid>
                    </Grid>
                </ListItem>
                {filteredHistory.map((record, index) => (
                    <ListItem key={index}>
                        <Typography
                            variant="body2"
                            component="div"
                            width="100%"
                            sx={{ color: (theme) => theme.palette.primary.main }}
                        >
                            <Grid container sx={{ textAlign: "center" }}>
                                <Grid item xs={2}>{`${index + 1}.`}</Grid>
                                <Grid item xs={2}>{`(${record.activity})`}</Grid>
                                <Grid item xs={5}>{`${record.created_at.toString()}`}</Grid>
                                <Grid item xs={3}>
                                    <Link to={`/thread/${record.main_thread_id}`}>
                                        {`/thread/${record.main_thread_id}`}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Typography>
                        <Divider />
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default ProfileThreadList;
