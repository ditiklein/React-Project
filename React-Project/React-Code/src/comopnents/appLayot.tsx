import {  createContext, Dispatch } from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import User from "../types/User";
import useReducer, { action } from "./useReducer";
import Login from "./Login";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./recipes/RecipesStore";

export const url = "http://localhost:3000/api/user";
type UserContextType = {user:User,userDispatch:Dispatch<action>};
export const UserCotext = createContext<UserContextType>({user:{} as User, userDispatch:() => {}});

export default () => {
    const { user, userDispatch } = useReducer();

    return (
        <Provider store={store}> 
        <UserCotext value={{user, userDispatch}}>
            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                
                <AppBar 
                    position="static" 
                    sx={{ 
                        bgcolor: "white", 
                        boxShadow: 2, 
                        width: "100vw", 
                        left: 0, 
                        top: 0,
                        borderBottom: "2px solid #ddd",
                        px: 3
                    }}
                >
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Login />
                        <Navbar />
                    </Toolbar>
                </AppBar>

                <Box sx={{ flexGrow: 1, width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
                    <Outlet />
                </Box>
            </Box>
        </UserCotext>
        </Provider> 
    );
};
