import { useContext } from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Update from "./Update";
import { userCotext } from "./appLayot";

const Loged = () => {
    const {user} = useContext(userCotext);

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {(user.firstName? user.firstName[0].toUpperCase():'')}
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: 600, color: "black" }}>
                {user.firstName} {user.lastName}
            </Typography>
             <Update />
        </Stack>
    );
};

export default Loged;
