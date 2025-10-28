import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase"; 

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async() => {
            await auth.signOut()  
            navigate("/");
        }
        handleLogout()        
    })

    return(
    <Typography>
        Succesfully logout
    </Typography>
    )
}