import Base from "./layouts/Base";
import Home from "./pages/Home";
import ThreadView from "./pages/ThreadView";
import Signup from "./pages/Signup";
import SuccessfulSignup from "./pages/SuccessfulSignup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AppTheme from "./themes/AppTheme";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

const App: React.FC = () => {
    return (
        <>
            <ThemeProvider theme={AppTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Base />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/successfulsignup" element={<SuccessfulSignup />} />
                            <Route path="/thread/:id" element={<ThreadView />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
};

export default App;
