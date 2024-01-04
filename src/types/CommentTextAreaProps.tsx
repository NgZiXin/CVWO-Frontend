type CommentTextAreaProps = {
    id: number
    body: string;
    maxRows: number;
    update: boolean;
    closeUpdate: () => void
};
export default CommentTextAreaProps;