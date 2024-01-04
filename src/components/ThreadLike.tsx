import LoginAlert from "./LoginAlert";
import ThreadLikeProp from "../types/ThreadLikeProps";
import Like from "../types/Like";
import url from "../data/url";
import getUserId from "../utils/getUserId";
import { Checkbox, Typography, Box } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import React from "react";

const ThreadLike: React.FC<ThreadLikeProp> = (props) => {
    const userId: number | null = getUserId();

    // Logic to query for thread's likes
    const likesUrl = `${url}/main_threads/${props.main_thread_id}/likes`;
    const [likes, setLikes] = React.useState<Like[]>([]);
    const getLikes = () => {
        fetch(likesUrl, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((likes) => {
                setLikes(likes);
                getLikeId(likes);
            })
            .catch((err) => console.log(`Error:${err.message}`));
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
                const deleteURL = `${url}/likes/${likeId}`;
                fetch(deleteURL, {
                    method: "DELETE",
                    mode: "cors",
                    credentials: "include",
                })
                    .then((response) => {
                        if (response.ok) {
                            getLikes();
                        } else {
                            return response.json();
                        }
                    })
                    .then((errorData) => {
                        if (errorData && errorData.message) {
                            console.log(errorData.message);
                        }
                    })
                    .catch((err) => console.error(`Error: ${err.message}`));
            } else {
                console.log("Error in obtaining like Id");
            }
        } else {
            // Logic to create like
            const createURL = `${url}/likes`;
            fetch(createURL, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ like: { main_thread_id: props.main_thread_id } }),
                credentials: "include",
            })
                .then((response) => {
                    if (response.ok) {
                        getLikes();
                    } else {
                        return response.json();
                    }
                })
                .then((errorData) => {
                    if (errorData && errorData.message) {
                        console.log(errorData.message);
                    }
                })
                .catch((err) => console.error(`Error: ${err.message}`));
        }
    };
    React.useEffect(() => getLikes(), []);

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
