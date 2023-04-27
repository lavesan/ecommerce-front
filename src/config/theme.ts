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
    })
  );

export default theme;
