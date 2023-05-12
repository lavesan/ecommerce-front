import { AppBar, IconButton, Grid } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { ThemeModeSwitch } from "@/components/Header/ThemeModeSwitch";
import { useAppContext } from "@/hooks/useAppContext";
import { useGoBack } from "@/hooks/useGoBack";
import { AppLogo } from "@/components/AppLogo";

export const ReturnHeader = () => {
  const { themeMode, toogleThemeMode } = useAppContext();

  const { goBack } = useGoBack();

  return (
    <AppBar
      color="transparent"
      position="sticky"
      sx={(theme) => ({
        boxShadow: `1px 1px 3px ${theme.palette.grey[600]}`,
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Grid container px={4} py={1}>
        <Grid item xs={4} display="flex" justifyContent="flex-start">
          <IconButton onClick={goBack}>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="center">
          {/* Logo */}
          <IconButton component={Link} href="/">
            <AppLogo />
          </IconButton>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="flex-end">
          <ThemeModeSwitch
            sx={{ m: 1 }}
            checked={themeMode === "dark"}
            onChange={toogleThemeMode}
          />
        </Grid>
      </Grid>
    </AppBar>
  );
};
