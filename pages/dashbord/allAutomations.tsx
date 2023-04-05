import { Typography, Box, Grid, FormLabel } from "@mui/material"
import React from "react"
import SelectAutoWidth from "../../layouts/selectAutoWidth"
import SideBar from "../../layouts/sideBar";
import Automation from "../../layouts/newAutomation"
import NavBar from "../../layouts/navBar"
import { WatchStatus } from "iconsax-react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from "@mui/material/colors";
import ExampleAutomation from "../../layouts/exampleAutomation"
const test1 = [
  {
    title: "lorem ipsum 1",
    label_text: "Active",
    date: "modified on 22 may by you | created 4 may",
    star: true
  },
  {
    title: "lorem ipsum 2",
    label_text: "Failed",
    date: "modified on 23 may by you | created 5 may",
    star: false
  },
  {
    title: "lorem ipsum 3",
    label_text: "Paused",
    date: "modified on 24 may by you | created 6 may",
    star:true
  },
  {
    title: "lorem ipsum 4",
    label_text: "Paused",
    date: "modified on 26 may by you | created 8 may",
    star:false
  }
]

const AllAutomations = () => {


  const handleClick = () => {
    ``
  }



  return (
    <Box >
      <div >
        <NavBar />
        <div>
          <Grid sx={{ flexGrow: 1 }}>
            <SideBar />
          </Grid>

          <div >
            <Automation />
          </div>

          <div className="flex justify-center mt-10 items-center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                color: "gray",
                cursor: "pointer",
                "&:hover": {
                  color: "black",
                },
              }} className="justify-center mr-22 space-x-2">
                <div className="items-center flex">
              <WatchStatus />
              <Typography className="text-title ml-2 "> All automations</Typography>
              </div>
            </Box>
            <div className="justify-end mr-28 flex">
              <div ><SelectAutoWidth labelValue={"order"} /></div>
              <div><SelectAutoWidth labelValue={"sort by"} /></div>
            </div>
          </div>

          <div className="flex justify-end mt-10 float-right w-7/12 mr-52" >
            <Grid className="justify-start  " container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 16 }}>
              {test1.map((option) =>
                <Grid item xs={6}>
                  <Box component="button" className="bg-white" sx={{ minWidth: "29.5rem", minHeight: "6.1rem", border: '1px solid black', borderRadius: 3 ,marginBottom:3}}>
                  <Grid container>
                    <Grid xs={6}>
                    <div>
                      <div className=" flex ml-5  items-center">
                        <Typography sx={{
                          fontSize: "18px", lineHeight: "21.78px", fontFamily: "Inter",
                          fontStyle: "normal", fontWeight: "600", color: "#0E1C2B"
                        }}>{option.title}</Typography>
                        <div className={`MuiChip-root MuiChip-filled MuiChip-colorDefault MuiChip-filledDefault Button-label ${option.label_text == "Active" ? "text-[#00A372]" : option.label_text == "Failed" ? "text-[#B52C3E]" : option.label_text == "Paused" ? "text-[#E6660A]" : "hidden"}`}>
                          <span className={`MuiChip-label MuiChip-labelMedium label-text ml-4 ${option.label_text == "Active" ? "bg-[#E6FAF4]" : option.label_text == "Failed" ? "bg-[#FCEEEF]" : option.label_text == "Paused" ? "bg-[#FFF3E6]" : "hidden"}`} >{option.label_text}</span></div>
                      </div>
                      <span className="label-text-date mt-1 ml-5">{option.date}</span>
                    </div>
                    </Grid>
                    <Grid xs={3} ></Grid>
                    <Grid xs ={1} > <div className="flex mt-2 ml-7 items-center"> {option.star == true ?<StarIcon sx={{color : yellow[500]}}/> : ''} </div></Grid>
                    <Grid xs={2} className="">
                    <div className="items-center">
                      <ExampleAutomation />
                    </div>
                    </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </ div>

    </Box>
  )
}

export default AllAutomations














