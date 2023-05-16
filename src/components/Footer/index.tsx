import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Slide,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { useAppContext } from "@/hooks/useAppContext";
import { useResponsive } from "@/hooks/useResponsive";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { maskMoney } from "@/helpers/money.helper";

export const Footer = () => {
  const { openCheckout, hasProducts, total, productsCount } =
    useCheckoutContext();
  const { token, logout } = useAppContext();
  const { isMobile } = useResponsive();

  const router = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  const hideFooter = useMemo(() => {
    return router.pathname.includes("/produto/");
  }, [router.pathname]);

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

  if (!isMobile || hideFooter) return <></>;

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
        <Slide direction="up" in={hasProducts} mountOnEnter unmountOnExit>
          <Grid
            container
            component="button"
            onClick={openCheckout}
            type="button"
            sx={{
              display: "flex",
              flexDirection: "row",
              wrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "none",
              py: 2,
              backgroundColor: "primary.main",
              color: "white",
              border: "none",
            }}
          >
            <Grid item xs={4}>
              <Badge
                invisible={!hasProducts}
                badgeContent={productsCount}
                color="primary"
              >
                <ShoppingBagIcon />
              </Badge>
            </Grid>
            <Grid item xs={4}>
              <Typography>Ver carrinho</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{maskMoney(total)}</Typography>
            </Grid>
          </Grid>
        </Slide>
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
