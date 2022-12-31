import {
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import React from "react";
type Props = {
    children: React.ReactNode;
};

const drawerWidth = 350;

import NoSsr from "@mui/material/NoSsr";
import { Routes } from 'utils/menuRoutes'

export const defaultLayout = ({ children }: Props) => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Macroflow
                    </Typography>
                </Toolbar>
            </AppBar>
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
                    <Box sx={{ overflow: "auto", width: "20%" }}>
                        <List>
                            {["TA", "SA", "MA", "FA"].map((text, index) => (
                                <ListItem key={text}>
                                    <ListItemButton>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Divider orientation="vertical" />
                    <NoSsr>
                        <Box sx={{ overflow: "auto", width: "80%" }}>
                            <div>
                                {Routes.map((item, index) => (
                                    <li key={index}>
                                        <Typography variant="h6" noWrap component="div" >
                                            {item.title}
                                        </Typography>
                                        <div>
                                            {item.submenuItems.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Typography noWrap component="div" >
                                                        {subItem.title}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </Box>
                    </NoSsr>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};
