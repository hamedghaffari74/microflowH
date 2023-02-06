import { Button, Container, IconButton, InputAdornment, TextField, Theme, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { makeStyles, createStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import loginLogo from "../../images/login.svg";
import Image from "next/image";
import leftArrow from "../../images/left-arrow.svg";
import { FocusEvent, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      icons: {
         marginRight: "8px",
      },
   })
);

export default function EmailVerification() {
   const router = useRouter();
   const returnTologinHandler = () => {
      router.push("/login");
   };

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
               display: "flex",
               alignItems: "center",
               mx: "auto",
               mb: "24rem",
               height: "80%",
               width: "40%",
            }}
         >
            <Box>
               <Box sx={{ display: "flex", justifyContent: "start" }}>
                  <Image src={leftArrow} alt="left subquare arrow"></Image>
                  <Typography sx={{ color: "#0E1C2B", ml: "8px" }} fontWeight="bold" variant="h4">
                     Check your email
                  </Typography>
               </Box>
               <Typography sx={{ color: "#1D1F61", mt: "1rem" }}>
                  We have sent a password recovery link to your email.
               </Typography>
               <Button
                  onClick={returnTologinHandler}
                  type="submit"
                  fullWidth
                  sx={{ mt: "3rem", bgcolor: "black" }}
                  variant="contained"
               >
                  Return to login
               </Button>
            </Box>
         </Box>
      </Box>
   );
}
