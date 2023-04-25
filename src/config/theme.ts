import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    text: {
      primary: grey[800],
    },
  },
  typography: {
    // fontSize: {
    // }
  },
});

export default responsiveFontSizes(theme);
