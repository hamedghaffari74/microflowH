import React from "react"
import UiButton from "components/uiButton";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Toolbar,
    Typography,
    Button
} from "@mui/material"

const drawerWidth = 350;

import NoSsr from "@mui/material/NoSsr";
import { Routes } from "utils/menuRoutes";
import {
    Add,
    Apple,
    GooglePlay, 
} from "iconsax-react";
import Link from "next/link";

const SideBar = () => {
    return (
        <div>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        overflowX: "hidden",
                    },
                }}
            >
                <Toolbar />
                <Box
                    sx={{
                        width: drawerWidth,
                        display: "flex",
                        flexDirection: "row",
                        height: "100%",
                    }}
                >
                    <Box sx={{ overflow: "auto", width: "30%", marginTop: "2rem" }}>
                        <List>
                            {[].map((text, index) => (
                                <ListItem key={text}>
                                    <ListItemButton
                                        sx={{ border: "2px solid black", borderRadius: "8px" }}
                                    >
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            <ListItem>
                                <ListItemButton
                                    disabled
                                    sx={{ border: "2px solid black", borderRadius: "8px" }}
                                >
                                    <Add size={24} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    <Divider orientation="vertical" />
                    <NoSsr>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{ overflow: "auto", width: "100%", marginTop: "2rem" }}>
                                <div style={{ width: "80%", margin: "0 auto" }}>
                                    {Routes.map((item, index) => (
                                        <List key={index}>
                                            <Typography variant="h6" noWrap component="div">
                                                {item.title}
                                            </Typography>
                                            <ListItem
                                                sx={{ display: "flex", flexDirection: "column" }}
                                            >
                                                {item.submenuItems.map((subItem, subIndex) => (
                                                    <List
                                                        key={subIndex}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            width: "100%",
                                                            color: "gray",
                                                            cursor: "pointer",
                                                            "&:hover": {
                                                                color: "black",
                                                            },
                                                        }}
                                                    >                                                       
                                                        {subItem.icon}
                                                        <Link href={subItem.path}>
                                                        <Typography
                                                            noWrap
                                                            component="div"
                                                            sx={{ paddingLeft: ".5rem" }}
                                                        >
                                                            {subItem.title}
                                                        </Typography>
                                                        </Link>
                                                    </List>
                                                ))}
                                            </ListItem>
                                        </List>
                                    ))}
                                </div>
                            </Box>
                            <Box
                                sx={{ overflow: "auto", width: "100%", marginBottom: "3rem" }}
                            >
                                <Box
                                    sx={{
                                        width: "80%",
                                        margin: "0 auto",
                                        border: "1px solid #637792",
                                        padding: "1.5rem 3rem",
                                        borderRadius: "15px",
                                        background: "rgba(99, 119, 146,0.1)",
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography>Get Our apps</Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            height: "2rem",
                                            padding: "0 2rem",
                                            margin: "1rem 0",
                                            whiteSpace: "nowrap",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        <Typography variant="subtitle2"> Comming Soon</Typography>
                                    </Button>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            flexBasis: "0",
                                            gap: "20px",
                                        }}
                                    >
                                        <Apple variant="Bold" color="#4B5B6E" />
                                        <GooglePlay variant="Bold" color="#4B5B6E" />
                                    </div>
                                </Box>
                            </Box>
                        </div>
                    </NoSsr>
                </Box>
            </Drawer>
        </div>
    )
}

export default SideBar
