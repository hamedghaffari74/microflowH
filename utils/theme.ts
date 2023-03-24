import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { backgroundColors, palette } from "./muiConfigs";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// create dark theme instance.
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...palette,
    background: {
      default: backgroundColors.dark,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    // Name of the component
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        // Name of the slot
        contained: {
          background: palette.white,
          color: palette.primary[900],
          height: "56px",
          borderRadius: "12px",
          padding: "10px 24px 10px 24px",
          "&:hover": {
            background: palette.primary[50],
            boxShadow:
              "0px 1px 2px rgba(255, 255, 255, 0.3), 0px 1px 3px 1px rgba(255, 255, 255, 0.15)",
          },
          "&:active": {
            background: palette.primary[50],
          },
          "&:disabled": {
            background: palette.primary[800],
            opacity: 0.6,
            color: palette.text.secondary,
          },
        },
        outlined: {
          background: "transparent",
          color: palette.primary[50],
          border: `1px solid ${palette.white}`,
          height: "56px",
          borderRadius: "12px",
          padding: "10px 24px 10px 24px",
          "&:hover": {
            background: palette.primary[800],
            border: `1px solid ${palette.white}`,
            boxShadow:
              "0px 1px 2px rgba(255, 255, 255, 0.3), 0px 1px 3px 1px rgba(255, 255, 255, 0.15)",
          },
          "&:active": {
            background: palette.primary[800],
            border: `1px solid ${palette.white}`,
          },
          "&:disabled": {
            background: "transparent",
            opacity: "0.5",
            color: palette.text.secondary,
          },
        },
        text: {
          background: "transparent",
          height: "56px",
          borderRadius: "12px",
          padding: "10px 24px 10px 24px",
          color: palette.white,
          "&:hover": {
            background: palette.primary[800],
            boxShadow:
              "0px 1px 2px rgba(255, 255, 255, 0.3), 0px 1px 3px 1px rgba(255, 255, 255, 0.15)",
          },
          "&:active": {
            background: palette.primary[800],
          },
          "&:disabled": {
            background: "transparent",
            opacity: "0.5",
            color: palette.text.secondary,
          },
        },
      },
    },
  },
});

// create light theme instance.
const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...palette,
    background: {
      default: backgroundColors.light,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    // Name of the component
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: palette.primary[900],
        },
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true, // remove default box shadow on buttons
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "16px",
        },
        contained: {
          background: palette.primary[900],
          height: "56px",
          borderRadius: "12px",
          padding: "10px 24px 10px 24px",
          "&:hover": {
            background: palette.primary[800],
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
          },
          "&:active": {
            background: palette.primary[800],
          },
          "&:disabled": {
            background: palette.neutral[60],
            color: palette.tertiary.main,
          },
        },
        outlined: {
          background: "transparent",
          border: `1px solid ${palette.primary[900]}`,
          height: "56px",
          borderRadius: "12px",
          padding: "10px 24px 10px 24px",
          color: palette.primary[900],
          "&:hover": {
            background: palette.primary[50],
            border: `1px solid ${palette.primary[900]}`,
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
          },
          "&:active": {
            background: palette.primary[50],
            border: `1px solid ${palette.primary[900]}`,
          },
          "&:disabled": {
            background: "transparent",
            opacity: "0.5",
            color: palette.primary[900],
          },
        },
        text: {
          background: "transparent",
          height: "56px",
          borderRadius: "12px",
          padding: "10px 24px 10px 24px",
          color: palette.primary[900],
          "&:hover": {
            background: palette.primary[50],
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
          },
          "&:active": {
            background: palette.primary[50],
          },
          "&:disabled": {
            background: "transparent",
            opacity: "0.5",
            color: palette.primary[900],
          },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
