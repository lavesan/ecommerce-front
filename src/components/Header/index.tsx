import { useMemo, useState } from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  Tooltip,
  Button,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppContext } from "@/hooks/useAppContext";
import { ManageAddress } from "../ManageAddress";
import { useRouter } from "next/router";

const settings = [
  { id: "my-data-menu", label: "Meus dados", route: "/meus-dados" },
  { id: "my-orders-menu", label: "Meus pedidos", route: "/meus-pedidos" },
  { id: "logout-menu", label: "Sair", exit: true },
];

export const Header = () => {
  const { user, logout } = useAppContext();

  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const defaultAddress = useMemo(
    () => user?.addresses?.find(({ isDefault }) => isDefault),
    [user]
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!user) return router.push("/criar-usuario");

    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (route: string) => {
    router.push(route);
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: (theme) => `1px 1px 3px ${theme.palette.grey[600]}` }}
    >
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <ManageAddress address={defaultAddress} />
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <ManageAddress address={defaultAddress} />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user ? "Ver" : "Criar conta"}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon fontSize="large" />
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
                  onClick={() =>
                    route ? handleCloseUserMenu(route) : logout()
                  }
                >
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
