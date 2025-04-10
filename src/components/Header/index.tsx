import { useState } from "react";
import {
  AppBar,
  MenuItem,
  Typography,
  Box,
  IconButton,
  Menu,
  Tooltip,
  Badge,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAppContext } from "@/hooks/useAppContext";
import { ThemeModeSwitch } from "./ThemeModeSwitch";
import { useResponsive } from "@/hooks/useResponsive";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { AppLogo } from "../AppLogo";
import { AddressChip } from "../AddressChip";
import { useAuthContext } from "@/hooks/useAuthContext";

const settings = [
  { id: "my-data-menu", label: "Meus dados", route: "/meus-dados" },
  { id: "my-orders-menu", label: "Meus pedidos", route: "/pedidos" },
  { id: "logout-menu", label: "Sair", exit: true },
];

export const Header = () => {
  const { openCheckout, hasProducts, productsCount } = useCheckoutContext();
  const { toogleThemeMode, themeMode } = useAppContext();
  const { user, token, logout } = useAuthContext();
  const { isMobile } = useResponsive();

  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!user) return router.push("/login");

    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (route: string) => {
    router.push(route);
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorElUser(null);
  };

  return (
    <AppBar
      color="transparent"
      position="sticky"
      sx={(theme) => ({
        boxShadow: `1px 1px 3px ${theme.palette.grey[600]}`,
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={1}
      >
        {/* Logo */}
        <IconButton component={Link} href="/" title="logo">
          <AppLogo />
        </IconButton>

        <AddressChip
          sx={{
            marginRight: isMobile ? 0 : "auto",
          }}
        />

        <Box>
          <ThemeModeSwitch
            sx={{ m: 1 }}
            checked={themeMode === "dark"}
            onChange={toogleThemeMode}
          />
          {!isMobile && (
            <>
              <Tooltip title={user ? "Ver" : "Login"}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <PersonIcon
                    fontSize="large"
                    sx={(theme) => ({
                      color: token ? theme.palette.primary.main : "default",
                    })}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(({ id, label, route }) => (
                  <MenuItem
                    key={id}
                    className="g_id_signout"
                    onClick={() =>
                      route ? handleCloseUserMenu(route) : handleLogout()
                    }
                  >
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <IconButton title="Carrinho" onClick={openCheckout}>
                <Badge
                  invisible={!hasProducts}
                  badgeContent={productsCount}
                  color="primary"
                >
                  <ShoppingBagIcon
                    sx={{ color: hasProducts ? "primary.main" : "default" }}
                  />
                </Badge>
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </AppBar>
  );
};
