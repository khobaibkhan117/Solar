import { Paper, Backdrop, Box, Icon, IconButton, ListItemButton, ListItemText, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import menu from "../utils/menu";

const HomePage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const AssignFeatures = JSON.parse(sessionStorage.getItem("features")) || []
    return (
    <div className="flex justify-center items-center min-h-[70vh]">
        <Paper elevation={24} sx={{ width: smDown ? "90vw" : "50%", borderRadius: '10px', }} >
            <div className=" grid grid-cols-2 md:grid-cols-3 justify-center pb-3">
                {menu.filter(item=>AssignFeatures.find(item2=>item2.name == item.name)).map(item => {
                    return (
                        <div key={item.name}>
                            
                                <ListItemText 
                                sx={{ color: "#000D6B", textAlign: 'center', cursor:"pointer" }}
                                primary={
                                    <div>
                                        <Icon sx={{ color: "#000D6B", height: 'fit-content',  }}>
                                            {item.icon}
                                        </Icon>

                                    </div>}
                                    secondary={item.name}
                                    onClick={() => {
                                    navigate(item.route)

                                }}
                                />
                           
                        </div>)
                })}

            </div>
        </Paper>
    </div>)
}

export default HomePage