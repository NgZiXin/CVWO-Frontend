import Thread from "./Thread";

type ThreadUpdateProps = {
    thread: Thread;
    callback: () => void;
};

export default ThreadUpdateProps;
