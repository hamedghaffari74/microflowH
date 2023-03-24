import { Button, InputAdornment, TextField, Theme, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Box } from "@mui/system";
import loginLogo from "../../images/login.svg";
import Link from "next/link";
import Image from "next/image";
import googleIcon from "../../images/google.svg";
import discordIcon from "../../images/discord.svg";
import { FocusEvent, MouseEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      icons: {
         marginRight: "8px",
      },
   })
);

export default function Login() {
   const classes = useStyles();

   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
   const [emailErrorText, setEmailErrorText] = useState<string>("");
   // const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);

   const emailChangeHandler = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      setShowPassword(false);
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
      if (email === "") {
         setEmailIsValid(false);
         setEmailErrorText("Email is empty");
         return;
      }

      const emailIsValidTemp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

      setEmailIsValid(emailIsValidTemp);
      if (!emailIsValidTemp) {
         setEmailErrorText("Email format is wrong");
      } else {
         setEmailErrorText("");
      }
      /*** password validation check */
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
               width: "41rem",
               height: "54rem",
               display: "flex",
               margin: "4rem 0 0 5rem",
               flexDirection: "column",
            }}
         >
            <Box>
               <Typography fontWeight={700} fontSize={40}>
                  Login
               </Typography>
               <Box sx={{ mt: "3.5rem" }}>
                  <TextField
                     required
                     fullWidth
                     label="Email"
                     type="email"
                     error={!emailIsValid}
                     helperText={emailErrorText}
                     onBlur={emailChangeHandler}
                  ></TextField>
               </Box>
               <Box sx={{ mt: "1rem" }}>
                  <TextField
                     required
                     fullWidth
                     label="Password"
                     // error={false}
                     onChange={(event) => setPassword(event.target.value)}
                     // helperText="Empty field!"
                     type={showPassword ? "text" : "password"}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment
                              sx={{ cursor: "pointer" }}
                              onClick={() => setShowPassword(!showPassword)}
                              position="end"
                           >
                              {!password ? null : showPassword ? <VisibilityOff /> : <Visibility />}
                           </InputAdornment>
                        ),
                     }}
                  ></TextField>
                  <Link
                     style={{
                        marginTop: "28px",
                        color: "#1D1F61",
                        textDecoration: "none",
                        display: "block",
                        textAlign: "right",
                     }}
                     href="/forget_password"
                  >
                     forget password
                  </Link>
               </Box>
               <Button fullWidth onClick={loginHandler} type="submit" sx={{ mt: "58px" }} variant="contained">
                  <Typography sx={{ fontWeight: "600" }}>Login</Typography>
               </Button>
               <Button sx={{ mt: "24px", mb: "12px" }} variant="outlined" fullWidth>
                  <Image className={classes.icons} src={googleIcon} alt="google icon"></Image>
                  Continue with <b>&nbsp;Google</b>
               </Button>
               <Button variant="outlined" fullWidth>
                  <Image className={classes.icons} src={discordIcon} alt="discord icon" />
                  Continue with
                  <b>&nbsp;Discord</b>
               </Button>
            </Box>
            <Typography sx={{ color: "#1D1F61", textAlign: "center", mt: "13rem" }}>
               Don’t have an account?{" "}
               <Link
                  style={{
                     textDecoration: "none",
                     color: "#1D1F61",
                     fontWeight: "bold",
                  }}
                  href="/signup"
               >
                  {"  "}
                  Register
               </Link>
            </Typography>
         </Box>
      </Box>
   );
}
