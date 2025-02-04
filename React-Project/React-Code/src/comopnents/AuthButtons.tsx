import { Box, Button } from "@mui/material";
import { useState } from "react";
import Loged from "./Loged";
import AuthModal from "./AuthModal";

const AuthButtons = () => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    const [isLogin, setIsLogin] = useState(false);

    return (
        <>
            <Box sx={{ display: "flex", gap: 2 }}>
                {!isLogin ? (
                    <>
                        <Button variant="contained" color="primary" onClick={() => { setOpen(true); setMode('signIn'); }}>
                            Log in
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => { setOpen(true); setMode('signUp'); }}>
                            Sign up
                        </Button>
                    </>
                ) : (
                    <Loged />
                )}
            </Box>

            <AuthModal open={open} setOpen={setOpen} mode={mode} setIsLogin={setIsLogin} />
        </>
    );
};

export default AuthButtons;
