import LoginAlert from "./LoginAlert";
import ThreadLikeProp from "../types/ThreadLikeProps";
import Like from "../types/Like";
import apiUrl from "../data/apiUrl";
import getUserId from "../utils/getUserId";
import { Checkbox, Typography, Box } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import React from "react";

const ThreadLike: React.FC<ThreadLikeProp> = (props) => {
    const userId: number | null = getUserId();

    // Logic to query for thread's likes
    const likesUrl = `${apiUrl}/main_threads/${props.main_thread_id}/likes`;
    const [likes, setLikes] = React.useState<Like[]>([]);
    const getLikes = async () => {
        try {
            const response = await fetch(likesUrl, {
                method: "GET",
                mode: "cors",
                credentials: "include",
            });
            if (response.ok) {
                const likes = await response.json();
                setLikes(likes);
                getLikeId(likes);
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

    // Logic for Login failed Alert
    const [loginAlert, setLoginAlert] = React.useState<boolean>(false);
    const openLoginAlert = () => setLoginAlert(true);
    const closeLoginAlert = () => setLoginAlert(false);

    // Logic to handle like id
    const [likeId, setLikeId] = React.useState<number | undefined>();
    const getLikeId = (likes: Like[]): void => {
        for (let i = 0; i < likes.length; i++) {
            if (likes[i].user_id === userId) {
                setLikeId(likes[i].id);
                return;
            }
        }
        setLikeId(undefined);
    };

    // Logic to handle like checkbox icon
    const handleLikeChange = () => {
        if (!userId) {
            // End request and prompt user to log in
            openLoginAlert();
            return;
        }
        if (likeId) {
            // Logic to delete like
            if (likeId) {
                const deleteUrl = `${apiUrl}/likes/${likeId}`;
                const deleteLike = async () => {
                    try {
                        const response = await fetch(deleteUrl, {
                            method: "DELETE",
                            mode: "cors",
                            credentials: "include",
                        });
                        if (response.ok) {
                            getLikes();
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
                deleteLike();
            } else {
                console.log("Error in obtaining like Id");
            }
        } else {
            // Logic to create like
            const createUrl = `${apiUrl}/likes`;
            const createLike = async () => {
                try {
                    const response = await fetch(createUrl, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ like: { main_thread_id: props.main_thread_id } }),
                        credentials: "include",
                    });
                    if (response.ok) {
                        getLikes();
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
            createLike();
        }
    };
    React.useEffect(() => {
        getLikes();
    }, []);

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                checked={likeId ? true : false}
                onChange={handleLikeChange}
            />
            <Typography variant="body2" component="div" color="textSecondary">
                {`Total number of likes: ${likes.length}`}
            </Typography>
            <LoginAlert loginAlert={loginAlert} closeLoginAlert={closeLoginAlert} />
        </Box>
    );
};

export default ThreadLike;
