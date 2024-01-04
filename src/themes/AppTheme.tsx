import { createTheme } from "@mui/material/styles";

const AppTheme = createTheme({
    palette: {
        primary: {
            main: "#003D7C",
        },
    },
    typography: {
        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    width: "50rem",
                    margin: "auto",
                    padding: "1rem",
                    backgroundColor: "#ffffff",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h5: {
                    color: "#003D7C", // Set the color of h5 to the primary color
                },
                h6: {
                    color: "#003D7C", // Set the color of h6 to the primary color
                },
            },
        },
    },
});

export default AppTheme;
