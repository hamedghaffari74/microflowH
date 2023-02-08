import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import loginLogo from "../../images/login.svg";
import Image from "next/image";
import LeftArrow from "../../images/left-arrow.svg";
import { FocusEvent, MouseEvent, useState } from "react";

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
            height: "100vh",
            mx: "auto",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "78.25rem",
         }}
      >
         <Box>
            <Image width={650} height={864} src={loginLogo} alt="logo image"></Image>
         </Box>
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               width: "41rem",
               height: "54rem",
               margin: "4rem 0 0 5rem",
            }}
         >
            <Box>
               <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                  <Image src={LeftArrow} alt="left subquare arrow"></Image>
                  <Typography fontWeight={700} fontSize={40} variant="h4" sx={{ ml: "8px" }}>
                     Forget your password
                  </Typography>
               </Box>
               <Typography sx={{ color: "#1D1F61", mt: "20px" }}>
                  Enter your email address and we will share a link to create a new password.
               </Typography>
               <Box sx={{ mt: "40px" }}>
                  <TextField
                     fullWidth
                     label="Email"
                     type="email"
                     error={!emailIsValid}
                     helperText={emailErrorText}
                     onBlur={emailChangeHandler}
                  ></TextField>
               </Box>
               <Button onClick={loginHandler} type="submit" fullWidth sx={{ mt: "40px" }} variant="contained">
                  <Typography sx={{ fontWeight: "600" }}>Send</Typography>
               </Button>
            </Box>
         </Box>
      </Box>
   );
}
