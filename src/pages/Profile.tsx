import ProfileThreadList from "../components/ProfileThreadList";
import ProfileItem from "../components/ProfileItem";
import HistoryFilter from "../types/HistoryFilter";
import User from "../types/User";
import url from "../data/url";
import {
    Container,
    Grid,
    Button,
    Card,
    CardContent,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const meUrl = `${url}/me`;

const Profile: React.FC = () => {
    // Logic to query for profile data
    const [userData, setUserData] = React.useState<User>();
    const getUserData = () => {
        fetch(meUrl, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((userData) => setUserData(userData))
            .catch((err) => console.log(`Error:${err.message}`));
    };
    React.useEffect(() => getUserData(), []);

    const [historyFilter, setHistoryFilter] = React.useState<HistoryFilter>({
        post: true,
        comment: true,
        like: true,
    });
    const handlePostChange = () => {
        setHistoryFilter((prevState) => {
            return { ...prevState, post: !historyFilter.post };
        });
    };
    const handleCommentChange = () => {
        setHistoryFilter((prevState) => {
            return { ...prevState, comment: !historyFilter.comment };
        });
    };
    const handleLikeChange = () => {
        setHistoryFilter((prevState) => {
            return { ...prevState, like: !historyFilter.like };
        });
    };

    return (
        <>
            {userData && (
                <Container>
                    <Grid container sx={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Link to={"/"}>
                            <Button color="primary" variant="outlined">
                                {"Back to threads"}
                            </Button>
                        </Link>
                    </Grid>
                    <br />
                    <ProfileItem user={userData} reRender={getUserData} />
                    <br />
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="body2" component="div" width="100%" color="textSecondary">
                                <Grid container sx={{ justifyContent: "center" }}>
                                    {"User's History"}
                                </Grid>
                                <Grid container>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={historyFilter.post}
                                                    onChange={handlePostChange}
                                                />
                                            }
                                            label={
                                                <Typography variant="body2" color="textSecondary">
                                                    {"posts"}
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={historyFilter.comment}
                                                    onChange={handleCommentChange}
                                                />
                                            }
                                            label={
                                                <Typography variant="body2" color="textSecondary">
                                                    {"comments"}
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={historyFilter.like}
                                                    onChange={handleLikeChange}
                                                />
                                            }
                                            label={
                                                <Typography variant="body2" color="textSecondary">
                                                    {"likes"}
                                                </Typography>
                                            }
                                        />
                                    </FormGroup>
                                </Grid>
                                <ProfileThreadList historyFilter={historyFilter} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
            )}
        </>
    );
};

export default Profile;
