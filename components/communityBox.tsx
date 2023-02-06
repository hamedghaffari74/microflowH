import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { NextPage } from "next";
import { useState } from "react";
const CommunityBox: NextPage<{ logoSrc: any; boxTitle: string }> = (props) => {
   const [boxIsSelected, setBoxIsSelected] = useState<boolean>(false);
   const red = "red";
   return (
      <Box
         onClick={() => setBoxIsSelected(!boxIsSelected)}
         sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "8rem",
            height: "7rem",
            color: "#6F788B",
            borderRadius: "8px",
            border: "2px solid",
            borderColor: boxIsSelected ? "#0A274A" : "#CAD2DC",
            cursor: "pointer",
         }}
      >
         <Image
            style={{ width: "3.5rem", height: "2.5rem", marginBottom: "1.5rem", opacity: "0.7" }}
            src={props.logoSrc}
            alt="discord logo"
         />
         <Typography sx={{ fontWeight: "400", fontSize: "14px" }}>{props.boxTitle}</Typography>
      </Box>
   );
};

export default CommunityBox;
