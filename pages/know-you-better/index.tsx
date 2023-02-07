import { Autocomplete, Button, TextField, Typography } from "@mui/material";

import { Box } from "@mui/system";
import loginLogo from "../../images/login.svg";
import Link from "next/link";
import Image from "next/image";
import leftArrow from "../../images/left-arrow.svg";

export default function KnowYouBetter() {
   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "75%",
            height: "100vh",
            mx: "auto",
            maxWidth: "75rem",
         }}
      >
         <Box>
            <Image width={450} height={600} src={loginLogo} alt="logo image"></Image>
         </Box>
         <Box
            sx={{
               margin: "auto",
               height: "80%",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
               width: "35%",
            }}
         >
            <Box>
               <Box sx={{ display: "flex", justifyContent: "start" }}>
                  <Image src={leftArrow} alt="left subquare arrow"></Image>
                  <Typography sx={{ color: "#0E1C2B", ml: "8px" }} fontWeight="bold" variant="h4">
                     Know you better
                  </Typography>
               </Box>
               <Typography sx={{ color: "#1D1F61", mt: "1rem" }}>
                  You can fill in these data, and we can customize your experiences.
               </Typography>
               <TextField sx={{ mt: "1rem" }} fullWidth label="Your community name" type="text"></TextField>
               <TextField sx={{ mt: "1rem" }} fullWidth label="Your role" type="text"></TextField>
               <Autocomplete
                  sx={{ mt: "1rem" }}
                  options={["1-10", "10-100", "> 100"]}
                  renderInput={(params) => <TextField {...params} label="Size of organization" />}
               ></Autocomplete>
               <TextField sx={{ mt: "1rem" }} fullWidth label="How did you find us?" type="text"></TextField>
               <Button fullWidth type="submit" sx={{ mt: "2rem" }} variant="contained">
                  Continue
               </Button>
               <Button fullWidth type="submit" sx={{ mt: "1rem" }} variant="outlined">
                  Skip for now
               </Button>
            </Box>
            <Link
               style={{
                  color: "#1D1F61",
                  textDecoration: "none",
                  textAlign: "center",
                  marginTop: "2rem",
               }}
               href="/login"
            >
               Already have an account? Login
            </Link>
         </Box>
      </Box>
   );
}
