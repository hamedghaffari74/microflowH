import React from "react"
import {
    Moon,
    NotificationBing,
    ArrowDown2,
    Teacher,
} from "iconsax-react";
import {
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    Avatar,
} from "@mui/material";

import Image from "next/image";
import UiTextarea from "components/uiTextField";
import microflow from "/static/microflow.svg";

const NavBar = () => {
    return (
        <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row", width: "80%" }}>
                    <Toolbar sx={{ width: "26.5%" }}>
                        <Image src={microflow} alt={"microflow logo"} />
                    </Toolbar>
                    <Toolbar sx={{ width: "60%" }}>
                        <UiTextarea
                            placeholder="Search"
                            sx={{ border: "1px solid #D3D8E1", borderRadius: "8px" }}
                            variant="outlined"
                            size="small"
                        />
                    </Toolbar>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Toolbar>
                        <Moon />
                        <NotificationBing style={{ margin: "0 0.4rem" }} />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ margin: "0 5px" }} />
                            <ArrowDown2 size={18} />
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>
        </div>
    )
}

export default NavBar
