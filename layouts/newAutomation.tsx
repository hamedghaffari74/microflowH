import React from "react"
import {
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Button,
    Box,
    Toolbar,
} from "@mui/material"




const NewAutomation = () => {

    return (
        <div className="">
            <Box  sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{ display: "flex", flexDirection: "row", alignItems: "center" ,marginLeft:"22rem" }}
                    >
                        <List>
                            <ListItem>
                                <ListItemButton
                                    sx={{ border: "2px solid black", borderRadius: "8px" ,backgroundColor: "#C5C3EC"}}
                                >
                                    <ListItemText className="text-black" primary={"TA"} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Box>
                            <Typography variant="h6" color="initial">
                                Teacher assistant
                            </Typography>
                            <Typography variant="body1" color="initial">
                                Team
                            </Typography>
                        </Box>
                    </Box>
                    <Button variant="contained">New Automation</Button>
                </Box>
                <Divider />
            </Box>
        </div>
    )
}

export default NewAutomation
