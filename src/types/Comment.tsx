import User from "./User";

type Comment = {
    id: number;
    body: string;
    main_thread_id: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    user: User; // belongs_to
};

export default Comment;
