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

interface SideBarProps {
  selectedView: string;
  setSelectedView: (view: string) => void;
  isSuperUser: boolean;
}

const SideBar = ({
  selectedView,
  setSelectedView,
  isSuperUser,
}: SideBarProps) => {
  const menuItems = isSuperUser ? adminMenu : userMenu;
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSidebarClick = (view: string) => {
    setSelectedView(view);
    if (isMobile) setIsSidebarExpanded(false);
  };

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    setIsSidebarExpanded(!isMobile);
  }, [isMobile]);

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
      <CssBaseline />

      {isMobile && !isSidebarExpanded && (
        <IconButton
          onClick={handleSidebarToggle}
          sx={{
            // position: "fixed",
            // left: 8,
            // top: 70,
            zIndex: 1201,
            color: indigo[700],
            backgroundColor: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
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
          width: isSidebarExpanded ? 220 : 64,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarExpanded ? 220 : 64,
            boxSizing: "border-box",
            bgcolor: indigo[700],
            color: "#fff",
            height: "100vh",
            top: 62,
            transition: "width 0.3s ease, transform 0.3s ease",
          },
        }}
      >
        <List>
          <ListItem disablePadding>
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
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleSidebarClick(item.view)}
                  sx={{
                    backgroundColor:
                      selectedView === item.view
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 1,
          overflowY: "auto",
          height: "100vh",
        }}
      ></Box>
    </Box>
  );
};

export default SideBar;
