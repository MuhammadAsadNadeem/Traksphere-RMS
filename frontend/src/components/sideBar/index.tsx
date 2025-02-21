import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { motion } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { adminMenu, userMenu } from "./Items";
import { useAppSelector } from "../../store/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const isSuperUser = useAppSelector((state) => state.userSlice.isSuperUser);
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = isSuperUser ? adminMenu : userMenu;
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSidebarClick = (view: string) => {
    navigate(view);
  };

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    setIsSidebarExpanded(!isMobile);
  }, [isMobile]);

  return (
    <Box sx={{ height: "calc(100vh - 64px)" }}>
      <CssBaseline />

      {isMobile && !isSidebarExpanded && (
        <IconButton
          onClick={handleSidebarToggle}
          sx={{
            zIndex: 1201,
            color: indigo[700],
            backgroundColor: "rgba(253, 253, 253, 0.55)",
            "&:hover": { backgroundColor: " #ffffff" },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isSidebarExpanded}
        onClose={handleSidebarToggle}
        sx={{
          width: isSidebarExpanded ? 240 : 64,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarExpanded ? 240 : 64,
            boxSizing: "border-box",
            bgcolor: indigo[700],
            color: " #fff",
            height: "calc(100vh-64px)",
            top: 60,
            transition: "width 0.3s ease, transform 0.3s ease",
          },
        }}
      >
        <List>
          <ListItem>
            <ListItemButton onClick={handleSidebarToggle}>
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                  color: " #fff",
                  mr: isSidebarExpanded ? 1 : 0,
                }}
              >
                {isSidebarExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </ListItemIcon>
              {isSidebarExpanded && <ListItemText />}
            </ListItemButton>
          </ListItem>

          {menuItems.map((item) => (
            <motion.div
              key={item.view}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ListItem>
                <ListItemButton
                  onClick={() => handleSidebarClick(item.view)}
                  sx={{
                    backgroundColor:
                      location.pathname === item.view
                        ? "rgba(255, 255, 255, 0.32)"
                        : "inherit",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.32)",
                    },
                    px: isSidebarExpanded ? 2 : 1,
                    borderRadius: 1,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "auto",
                      color: " #fff",
                      mr: isSidebarExpanded ? 2 : 0,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isSidebarExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ListItemText
                        primary={item.label}
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                        }}
                      />
                    </motion.div>
                  )}
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
