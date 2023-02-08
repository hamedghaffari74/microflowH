import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { NextPage } from "next";
import { useState } from "react";
const CommunityBox: NextPage<{ logoSrc: any; boxTitle: string; logoSize: string }> = (props) => {
   const [boxIsSelected, setBoxIsSelected] = useState<boolean>(false);
   return (
      <Box
         onClick={() => setBoxIsSelected(!boxIsSelected)}
         sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "160px",
            height: "141px",
            color: "#6F788B",
            borderRadius: "12px",
            border: "2px solid",
            borderColor: boxIsSelected ? "#0A274A" : "#CAD2DC",
            cursor: "pointer",
         }}
      >
         <Image
            style={{ width: props.logoSize, height: props.logoSize, marginBottom: "1.5rem" }}
            src={props.logoSrc}
            alt="discord logo"
         />
         <Typography sx={{ fontWeight: "400", fontSize: "14px" }}>{props.boxTitle}</Typography>
      </Box>
   );
};

export default CommunityBox;
