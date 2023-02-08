import { Button, Grid, Typography } from "@mui/material";

import { Box } from "@mui/system";
import loginLogo from "../../images/login.svg";
import Image from "next/image";
import googleLogo from "../../images/google.svg";
import discordLogo from "../../images/discord.svg";
import aragonLogo from "../../images/aragon.svg";
import webHookLogo from "../../images/webhook.svg";
import snapshotLogo from "../../images/snapshot.svg";
import othersLogo from "../../images/others.svg";
import CommunityBox from "components/communityBox";
import BackIcon from "components/backIcon";

export default function CommunityTools() {
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
                  <Typography fontWeight={700} fontSize={40} sx={{ ml: "8px" }}>
                     Community tools
                  </Typography>
               </Box>
               <Typography sx={{ mt: "1.25rem" }}>You can select your preferred communities.</Typography>
               <Grid container spacing={2} mt="2.5rem">
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={discordLogo} boxTitle="Discord" logoSize="74px" />
                  </Grid>
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={snapshotLogo} boxTitle="Snapshot" logoSize="74px" />
                  </Grid>
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={webHookLogo} boxTitle="Webhook" logoSize="60px" />
                  </Grid>
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={googleLogo} boxTitle="Google workspace" logoSize="54px" />
                  </Grid>
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={aragonLogo} boxTitle="Aragon" logoSize="50px" />
                  </Grid>
                  <Grid item xs={4}>
                     <CommunityBox logoSrc={othersLogo} boxTitle="Others" logoSize="50px" />
                  </Grid>
               </Grid>
               <Button fullWidth type="submit" sx={{ mt: "4.5rem", width: "100%" }} variant="contained">
                  <Typography sx={{ fontWeight: "600" }}>Continue</Typography>
               </Button>
               <Button fullWidth type="submit" sx={{ mt: "1rem" }} variant="outlined">
                  <Typography sx={{ fontWeight: "600" }}>Skip for now</Typography>
               </Button>
            </Box>
         </Box>
      </Box>
   );
}
