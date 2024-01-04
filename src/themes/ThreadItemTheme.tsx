import AppTheme from "./AppTheme";
import { createTheme } from "@mui/material/styles";

const ThreadItemTheme = createTheme({
    ...AppTheme,
    typography: {
        fontFamily: "'Roboto', sans-serif",
        h5: {
            fontWeight: 500,
            fontSize: "1.25rem",
            lineHeight: 1.4,
        },
        body1: {
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.25,
            letterSpacing: 0.09,
        },
        body2: {
            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            lineHeight: 1.6,
        },
    },
});

export default ThreadItemTheme;
