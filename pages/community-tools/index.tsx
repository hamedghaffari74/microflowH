import {
   Autocomplete,
   Button,
   Container,
   Grid,
   IconButton,
   InputAdornment,
   TextField,
   Theme,
   Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import loginLogo from "../../images/login.svg";
import Link from "next/link";
import Image from "next/image";
import leftArrow from "../../images/left-arrow.svg";
import googleLogo from "../../images/google.svg";
import discordLogo from "../../images/discord.svg";
import aragonLogo from "../../images/aragon.svg";
import webHookLogo from "../../images/webhook.svg";
import snapshotLogo from "../../images/snapshot.svg";
import othersLogo from "../../images/others.svg";
import CommunityBox from "components/communityBox";
export default function CommunityTools() {
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
               mb: "2rem",
               height: "80%",
               width: "35%",
            }}
         >
            <Box>
               <Box sx={{ display: "flex", justifyContent: "start" }}>
                  <Image src={leftArrow} alt="left subquare arrow"></Image>
                  <Typography sx={{ color: "#0E1C2B", ml: "8px" }} fontWeight="bold" variant="h4">
                     Community tools
                  </Typography>
               </Box>
               <Typography sx={{ color: "#1D1F61", mt: "1rem" }}>You can select your preferred communities.</Typography>
               <Grid container columnSpacing={5} rowSpacing={2} mt="1rem">
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={discordLogo} boxTitle="Discord" />
                  </Grid>
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={snapshotLogo} boxTitle="Snapshot" />
                  </Grid>
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={webHookLogo} boxTitle="Webhook" />
                  </Grid>
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={googleLogo} boxTitle="Google workspace" />
                  </Grid>
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={aragonLogo} boxTitle="Aragon" />
                  </Grid>
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={othersLogo} boxTitle="Others" />
                  </Grid>
               </Grid>
               <Button fullWidth type="submit" sx={{ mt: "3rem", width: "100%" }} variant="contained">
                  Continue
               </Button>
               <Button fullWidth type="submit" sx={{ mt: "1rem" }} variant="outlined">
                  Skip for now
               </Button>
            </Box>
         </Box>
      </Box>
   );
}
