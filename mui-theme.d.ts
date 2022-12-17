import { createTheme } from "@mui/material/styles";
import { Color } from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
      gray: Palette["primary"];
      pinkish: Palette["primary"];
      yellow: Palette["primary"];
      attention: Palette["primary"];
      neutral: Palette["primary"];
    }
    interface PaletteOptions {
      gray: PaletteOptions["primary"];
      pinkish: PaletteOptions["primary"];
      yellow: PaletteOptions["primary"];
      attention: PaletteOptions["primary"];
      neutral: PaletteOptions["primary"];
    }
  
    // PaletteColor type should fix
    interface PaletteColor {
      darker?: string;
      50?: Color;
      100?: Color;
      200?: Color;
      300?: Color;
      400?: Color;
      600?: Color;
      700?: Color;
      800?: Color;
      900?: Color;
    }
    // SimplePaletteColorOptions type should fix
    interface SimplePaletteColorOptions {
      darker?: string;
      50?: Color;
      100?: Color;
      200?: Color;
      300?: Color;
      400?: Color;
      600?: Color;
      700?: Color;
      800?: Color;
      900?: Color;
    }
  }