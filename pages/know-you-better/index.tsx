import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import loginLogo from "../../images/login.svg";
import Link from "next/link";
import Image from "next/image";
import BackIcon from "components/backIcon";

export default function KnowYouBetter() {
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
               <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                  <BackIcon />
                  <Typography fontWeight={700} fontSize={40} sx={{ ml: "12px" }}>
                     Know you better
                  </Typography>
               </Box>
               <Typography sx={{ mt: "1rem" }}>
                  You can fill in these data, and we can customize your experiences.
               </Typography>
               <TextField sx={{ mt: "2.5rem" }} fullWidth label="Your community name" type="text"></TextField>
               <TextField sx={{ mt: "1rem" }} fullWidth label="Your role" type="text"></TextField>
               <Autocomplete
                  sx={{ mt: "1rem" }}
                  options={["1-10", "10-100", "> 100"]}
                  renderInput={(params) => <TextField {...params} label="Size of organization" />}
               ></Autocomplete>
               <TextField sx={{ mt: "1rem" }} fullWidth label="How did you find us?" type="text"></TextField>
               <Button fullWidth type="submit" sx={{ mt: "2.5rem" }} variant="contained">
                  <Typography sx={{ fontWeight: "600" }}>Continue</Typography>
               </Button>
               <Button fullWidth type="submit" sx={{ mt: "1rem" }} variant="outlined">
                  <Typography sx={{ fontWeight: "600" }}>Skip for now</Typography>
               </Button>
            </Box>
            <Typography sx={{ color: "#1D1F61", textAlign: "center", mt: "11.5rem" }}>
               Already have an account?
               <Link
                  style={{
                     textDecoration: "none",
                     color: "#1D1F61",
                     fontWeight: "bold",
                  }}
                  href="/login"
               >
                  {"  "}
                  Login
               </Link>
            </Typography>
         </Box>
      </Box>
   );
}
