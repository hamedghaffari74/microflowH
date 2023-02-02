import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import loginLogo from "../../images/login.svg";
import Image from "next/image";

export default function login() {
   return (
      <Box
         sx={{
            display: "flex",
            width: "80%",
            height: "100vh",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <Box>
            <Image
               width={450}
               height={600}
               src={loginLogo}
               alt="logo image"
            ></Image>
         </Box>
         <Box
            sx={{
               margin: "auto",
               height: "80%",
               display: "flex",
               flexDirection: "column",
               justifyContent: "space-between",
               width: "40%",
            }}
         >
            <Box>
               <Typography fontWeight="bold" variant="h4">
                  Login
               </Typography>
               <Box sx={{ mt: "2rem" }}>
                  <TextField fullWidth label="Email" type="email"></TextField>
               </Box>
               <Box sx={{ mt: "1rem" }}>
                  <TextField
                     fullWidth
                     label="Password"
                     type="password"
                  ></TextField>
               </Box>
               <Button
                  fullWidth
                  sx={{ mt: "2rem", bgcolor: "black" }}
                  variant="contained"
               >
                  Login
               </Button>
            </Box>
            <Box>
               <Button fullWidth variant="outlined">
                  Don’t have an account? Register
               </Button>
            </Box>
         </Box>
      </Box>
   );
}
