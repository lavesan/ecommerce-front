import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

const theme = (mode: PaletteMode = "light") =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        text: {
          // primary: {
          // },
        },
      },
      typography: {
        h1: {
          fontSize: 40,
          fontWeight: "bold",
        },
        h3: {
          fontSize: 20,
          fontWeight: "bold",
        },
        body1: {
          fontSize: 20,
        },
      },
      components: {
        MuiButton: {
          defaultProps: {
            sx: { textTransform: "none" },
          },
        },
      },
    })
  );

export default theme;
