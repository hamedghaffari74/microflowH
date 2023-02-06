import { Button, Container, IconButton, InputAdornment, TextField, Theme, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { makeStyles, createStyles } from "@mui/styles";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import loginLogo from "../../images/login.svg";
import Image from "next/image";
import LeftArrow from "../../images/left-arrow.svg";
import { FocusEvent, MouseEvent, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      icons: {
         marginRight: "8px",
      },
   })
);

export default function ForgetPassword() {
   const router = useRouter();

   const [email, setEmail] = useState<string>("");
   const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
   const [emailErrorText, setEmailErrorText] = useState<string>("");

   const emailChangeHandler = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      setEmail(event.target.value.trim());

      if (event.target.value.trim() === "") {
         setEmailIsValid(false);
         setEmailErrorText("Email is empty");
         return;
      }
      const emailIsValidTemp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);
      setEmailIsValid(emailIsValidTemp);
      if (!emailIsValidTemp) {
         setEmailErrorText("Email format is wrong");
      } else {
         setEmailErrorText("");
      }
   };

   const loginHandler = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      const emailIsValidTemp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

      setEmailIsValid(emailIsValidTemp);

      if (emailIsValidTemp) {
         router.push("/email_verification");
      }
   };

   return (
      <Box
         sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
               mb: "15rem",
               height: "80%",
               width: "40%",
            }}
         >
            <Box>
               <Box sx={{ display: "flex", justifyContent: "start" }}>
                  <Image src={LeftArrow} alt="left subquare arrow"></Image>
                  <Typography sx={{ color: "#0E1C2B", ml: "8px" }} fontWeight="bold" variant="h4">
                     Forget your password
                  </Typography>
               </Box>
               <Typography sx={{ color: "#1D1F61", mt: "1rem" }}>
                  Enter your email address and we will share a link to create a new password.
               </Typography>
               <Box sx={{ mt: "2rem" }}>
                  <TextField
                     fullWidth
                     label="Email"
                     type="email"
                     error={!emailIsValid}
                     helperText={emailErrorText}
                     onBlur={emailChangeHandler}
                  ></TextField>
               </Box>
               <Button
                  onClick={loginHandler}
                  type="submit"
                  fullWidth
                  sx={{ mt: "2rem", bgcolor: "black" }}
                  variant="contained"
               >
                  Send
               </Button>
            </Box>
         </Box>
      </Box>
   );
}
