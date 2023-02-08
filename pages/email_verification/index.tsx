import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import loginLogo from "../../images/login.svg";
import Image from "next/image";
import leftArrow from "../../images/left-arrow.svg";
import BackIcon from "components/backIcon";

export default function EmailVerification() {
   const router = useRouter();
   const returnTologinHandler = () => {
      router.push("/login");
   };

   return (
      <Box
         sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
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
               margin: "64px 0 0 80px",
               flexDirection: "column",
            }}
         >
            <Box>
               <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                  <BackIcon />
                  <Typography fontWeight={700} fontSize={40} variant="h4" sx={{ ml: "12px" }}>
                     Check your email
                  </Typography>
               </Box>
               <Typography sx={{ color: "#1D1F61", mt: "20px" }}>
                  We have sent a password recovery link to your email.
               </Typography>
               <Button onClick={returnTologinHandler} type="submit" fullWidth sx={{ mt: "40px" }} variant="contained">
                  <Typography fontWeight={600}>Return to login</Typography>
               </Button>
            </Box>
         </Box>
      </Box>
   );
}
