import AppTheme from "./AppTheme";
import { createTheme } from "@mui/material/styles";

const CommentItemTheme = createTheme({
    ...AppTheme,
    typography: {
        fontFamily: "'Roboto', sans-serif",
        body1: {
            fontSize: "0.875rem",
            lineHeight: 1.2,
        },
        body2: {
            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            lineHeight: 2.5,
        },
    },
});

export default CommentItemTheme;
