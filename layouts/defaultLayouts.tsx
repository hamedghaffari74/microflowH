import {
    Grid
} from "@mui/material";


import React from "react";

type Props = {
    children: React.ReactNode;
};


import Image from "next/image";
import UiTextarea from "components/uiTextField";

import SideBar from "./sideBar";
import NewAutomation from "./newAutomation"
import NavBar from "./navBar";


export const defaultLayout = ({ children }: Props) => {
    return (
        <div >
            <NavBar />
            <div>
                <Grid sx={{ flexGrow: 1 }}>
                    <SideBar />
                </Grid>
                <Grid>
                    <NewAutomation />      
                    {children}    
                </Grid>
            </div>
        </div>
    );
};
