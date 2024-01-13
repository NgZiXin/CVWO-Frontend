import NotFound from "./NotFound";
import ProfileThreadList from "../components/ProfileThreadList";
import ProfileItem from "../components/ProfileItem";
import HistoryFilter from "../types/HistoryFilter";
import User from "../types/User";
import apiUrl from "../data/apiUrl";
import getJWT from "../utils/getJWT";
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

const meUrl: string = `${apiUrl}/me`;

const Profile: React.FC = () => {
    // Logic to query for profile data
    const [userData, setUserData] = React.useState<User>();
    const getUserData = async () => {
        try {
            const response: Response = await fetch(meUrl, {
                method: "GET",
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${getJWT()}`,
                },
            });
            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
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
        getUserData();
    }, []);

    // Logic to set Not Found page
    const [displayNotFound, setDisplayNotFound] = React.useState<boolean>(false);

    // Logic to filter history list
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
            {userData ? (
                <Container>
                    <Grid container sx={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <Link to={"/"}>
                            <Button color="primary" variant="outlined">
                                {"Back to threads"}
                            </Button>
                        </Link>
                    </Grid>
                    <br />
                    <ProfileItem user={userData} callback={getUserData} />
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
            ) : (
                displayNotFound && <NotFound />
            )}
        </>
    );
};

export default Profile;
