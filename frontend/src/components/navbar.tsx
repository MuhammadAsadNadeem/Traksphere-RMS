import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Link,
} from "@mui/material";
import logo from "../assets/images/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { logout } from "../store/user/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const islogin = useAppSelector((state) => state.userSlice.token);

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.clear();
    navigate(routes.login);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  type Links = {
    name: string;
    url: string;
  };

  const links: Links[] = [
    {
      name: "Home",
      url: "#home",
    },
    {
      name: "Features",
      url: "#features",
    },
    {
      name: "About",
      url: "#about",
    },
    {
      name: "Contact",
      url: "#contact",
    },
  ];

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <img src={logo} alt="Website Logo" style={{ height: 60 }} />
          <Typography variant="h6" fontWeight="bold" ml={2}>
            TRAKSPHERE
          </Typography>
        </Box>

        <Box
          display={{ xs: "none", sm: "flex" }}
          justifyContent="center"
          alignItems="center"
          gap={3}
        >
          {!islogin &&
            links.map((item, index) => (
              <Link
                sx={{ color: "white" }}
                key={index}
                href={routes.homePage + item.url}
              >
                {item.name}
              </Link>
            ))}
          {islogin ? (
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
                onClick={() => navigate(routes.login)}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
                onClick={() => navigate(routes.signup)}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: "block", sm: "none" }, padding: 4 }}
        >
          {!islogin &&
            links.map((item, index) => (
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                key={index}
                href={routes.homePage + item.url}
              >
                {item.name}
              </MenuItem>
            ))}
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            gap={2}
            padding={2}
          >
            {islogin ? (
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => navigate(routes.login)}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(routes.signup)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
