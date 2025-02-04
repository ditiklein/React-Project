import { FormEvent, useContext, useRef, useState } from "react";
import { url, userCotext } from "./appLayot";
import axios from "axios";
import { Box, Button, Modal, TextField } from "@mui/material";
import ErrorMessage from "./Error";

interface AuthModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    mode: 'signIn' | 'signUp';
    setIsLogin: (isLogin: boolean) => void;
}
const AuthModal = ({ open, setOpen, mode, setIsLogin }: AuthModalProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { userDispatch } = useContext(userCotext);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleuser = async (e:FormEvent) => {
        e.preventDefault();
     try {
         const u = url + '/' + (mode === 'signIn' ? 'login' : 'register');
            const res = await axios.post(u, {
                email: emailRef.current?.value,
                password: passwordref.current?.value
            });
            setIsLogin(true);

            if (res.data.user) {
                userDispatch({
                    type: 'LOG IN',
                    data: res.data.user
                })
            }
            else {
                userDispatch({
                    type: 'LOG IN',
                    data: {
                        id: res.data.userId,
                        firstName: '',
                        lastName: '',
                        email: emailRef.current?.value || '',
                        password: passwordref.current?.value || '',
                        address: '',
                        phone: ''
                    }
                })
            }
        }
        catch (e: any) {
            if (e.response) {
                switch (e.response.status) {
                    case 400:
                        setErrorMessage("User already exists. Please try logging in.");
                        break;
                    case 401:
                        setErrorMessage("You are not registered. Please sign up.");
                        break;
                    case 404:
                        setErrorMessage("User not found. Please sign up.");
                        break;
                    default:
                        setErrorMessage("An unexpected error occurred. Please try again later.");
                }
            }
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        
        
        }
        finally {
            setOpen(false);
            if (emailRef.current) emailRef.current.value = '';
            if (passwordref.current) passwordref.current.value = '';
        }
    };
    return (
        <>
            {errorMessage && (
                <Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
                    <ErrorMessage message={errorMessage} />
                </Box>
              
            )  }

            <Modal open={open}  onClose={() => setOpen(false)} 
            >
                <Box sx={style}>
                    <form onSubmit={handleuser}>
                    <TextField label="Email" inputRef={emailRef} fullWidth margin="normal" type="email" />
                    <TextField label="Password" inputRef={passwordref} fullWidth margin="normal" type="password" />
                    <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
                        Submit
                    </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};
export default AuthModal
