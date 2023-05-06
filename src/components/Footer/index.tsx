import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import { useAppContext } from "@/hooks/useAppContext";
import { useResponsive } from "@/hooks/useResponsive";

export const Footer = () => {
  const { token, logout } = useAppContext();
  const { isMobile } = useResponsive();

  const router = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  const selectedRoute = useMemo(() => {
    let selectedRoute: number;

    switch (router.pathname) {
      case "/":
        selectedRoute = 0;
        break;
      case "/pedidos":
        selectedRoute = 1;
        break;
      case "/meus-dados":
      case "/login":
      case "/criar-usuario":
        selectedRoute = 2;
        break;
      default:
        selectedRoute = 3;
    }

    return selectedRoute;
  }, [router]);

  const goToRoute = (route: string) => () => {
    router.push(route);
  };

  const closeModal = () => {
    setOpenDrawer(false);
  };

  const onUserIconClick = () => {
    if (token) {
      setOpenDrawer(true);
      return;
    }

    goToRoute(token ? "/meus-dados" : "/login")();
  };

  const onLogout = () => {
    logout();
    setOpenDrawer(false);
  };

  const goToMyData = () => {
    router.push("/meus-dados");
    setOpenDrawer(false);
  };

  if (!isMobile) return <></>;

  return (
    <>
      <Paper
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          marginTop: "auto",
        }}
        elevation={3}
      >
        <BottomNavigation showLabels value={selectedRoute}>
          <BottomNavigationAction
            onClick={goToRoute("/")}
            label="Início"
            icon={<HomeIcon />}
          />
          {token && (
            <BottomNavigationAction
              onClick={goToRoute("/pedidos")}
              label="Pedidos"
              icon={<ReceiptIcon />}
            />
          )}
          <BottomNavigationAction
            onClick={onUserIconClick}
            label={token ? "Perfil" : "Login"}
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Paper>
      <Drawer anchor="top" open={openDrawer} onClose={closeModal}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={onLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={goToMyData}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Meus dados" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
