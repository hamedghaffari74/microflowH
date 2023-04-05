import React from 'react'
import { Typography, Menu, MenuItem, Select } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

const ITEM_HEIGHT = 48;

const ExampleAutomation = () => {


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (

        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                className=' exampleAutomationMenu'
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                autoFocus={false}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        border: "2px solid #B5BFCD",
                        borderRadius: "12px",
                        alignItems: "flex-start",

                        gap: "10px",
                    },
                }}
            >
                <MenuItem className='exampleAutomationMenuItem' >
                    Open
                </MenuItem>
                <MenuItem className='exampleAutomationMenuItem' >
                    Duplicate
                </MenuItem >
                <MenuItem className='exampleAutomationMenuItem' >
                    Publish to community
                </MenuItem>
                <MenuItem className='exampleAutomationMenuItem' >
                    Rename
                </MenuItem >
                <MenuItem className='exampleAutomationMenuItem' >
                    Delete
                </MenuItem>
            </Menu>
        </div >

    )
}

export default ExampleAutomation
