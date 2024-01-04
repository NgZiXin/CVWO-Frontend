import User from "./User";

type Thread = {
    id: number;
    title: string;
    body: string;
    category_id: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    user: User; // belongs_to
    numLikes: number
};

export default Thread;
