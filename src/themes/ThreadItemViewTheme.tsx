import AppTheme from "./AppTheme";
import { createTheme } from "@mui/material/styles";

const ThreadItemViewTheme = createTheme({
    ...AppTheme,
    typography: {
        fontFamily: "'Roboto', sans-serif",
        h5: {
            fontWeight: 500,
        },
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

export default ThreadItemViewTheme;
