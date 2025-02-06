import { useContext, useState } from "react";
import {
    Button,
    Grid,
    Modal,
    Box,
    TextField,
} from "@mui/material";
import { url, UserCotext } from "./appLayot";
import axios from "axios";
import User from "../types/User";

const Update = () => {
    const {user, userDispatch} = useContext(UserCotext);
    const [isLogin, setIsLogin] = useState(false);
    const [open, setOpen] = useState(false);
    const [updatedUser, setUpdatedUser] = useState<User>(user);
    console.log(updatedUser);
    
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedUser({
            ...updatedUser,
            [name]: value,
        });
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = async () => {
        setOpen(false);
        setIsLogin(true);
        userDispatch({
            type: "UPDATE",
            data: updatedUser,
        });

        try {
          
            await axios.put(
               
                url + "/",
                {
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    address: updatedUser.address,
                    phone: updatedUser.phone,
                },
                {
                    headers: {

                        "user-id": user?.id
                    },
                }
            );
        } catch (e) {
            console.error(e);
            alert("An error occurred while updating user.");
        }
    };

    return (
        <>
            <Grid container>
                <Grid item xs={4}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setOpen(!open)}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                <form onSubmit={handleSubmit}>

                    <TextField label="firstName" value={updatedUser.firstName} name="firstName" onChange={handleChange}fullWidth autoComplete="given-name"
                    />
                    <TextField label="lastName" value={updatedUser.lastName} name="lastName" onChange={handleChange} fullWidth autoComplete="family-name"
                    />
                    <TextField label="email" value={updatedUser.email} name="email" onChange={handleChange} fullWidth autoComplete="email"
                    />
                    <TextField label="password" type="password" value={updatedUser.password} name="password" onChange={handleChange}fullWidth
                    />
                    <TextField  label="address" value={updatedUser.address} name="address" onChange={handleChange} fullWidth autoComplete="street-address"
                    />
                    <TextField  label="phone"value={updatedUser.phone}name="phone"onChange={handleChange} fullWidth autoComplete="tel"
                    />
                    <Button variant="contained" type="submit" color="primary">
                        Save
                    </Button>
                    </form>

                </Box>
            </Modal>
        </>
    );
};

export default Update;
