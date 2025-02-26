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
  useTheme,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { motion } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { adminMenu, userMenu } from "./Items";
import { useAppSelector } from "../../store/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const theme = useTheme();
  const isSuperUser = useAppSelector((state) => state.userSlice.isSuperUser);
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = isSuperUser ? adminMenu : userMenu;
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSidebarClick = (view: string) => navigate(view);
  const handleSidebarToggle = () => setIsSidebarExpanded(!isSidebarExpanded);

  useEffect(() => {
    setIsSidebarExpanded(!isMobile);
  }, [isMobile]);

  return (
    <Box sx={{ height: "100vh" }}>
      <CssBaseline />

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isSidebarExpanded}
        onClose={handleSidebarToggle}
        sx={{
          width: isMobile ? "100vw" : isSidebarExpanded ? 240 : 64,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "55vw" : isSidebarExpanded ? 240 : 64,

            bgcolor: indigo[700],
            color: "#fff",
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
            top: theme.mixins.toolbar.minHeight,

            transition: theme.transitions.create(["width", "transform"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          },
        }}
      >
        <List sx={{ overflow: "hidden" }}>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={handleSidebarToggle}>
              {isSidebarExpanded ? (
                <ChevronLeftIcon sx={{ color: "#fff" }} />
              ) : (
                <ChevronRightIcon sx={{ color: "#fff" }} />
              )}
            </ListItemButton>
          </ListItem>

          {menuItems.map((item) => (
            <motion.div
              key={item.view}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem sx={{ p: 0 }}>
                <ListItemButton
                  onClick={() => handleSidebarClick(item.view)}
                  sx={{
                    backgroundColor:
                      location.pathname === item.view
                        ? "rgba(255, 255, 255, 0.32)"
                        : "inherit",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.32)" },
                    mx: 1,
                    borderRadius: 1,
                    minHeight: 48,
                    justifyContent: isSidebarExpanded ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: "#fff",
                      mr: isSidebarExpanded ? 2 : "auto",
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
                          whiteSpace: "nowrap",
                          "& span": {
                            fontWeight: 500,
                            fontSize: "0.875rem",
                          },
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

      {isMobile && (
        <IconButton
          onClick={handleSidebarToggle}
          sx={{
            position: "fixed",
            left: 0,
            top: "8%",
            transform: "translateY(-50%)",
            zIndex: theme.zIndex.drawer + 1,
            color: indigo[700],
            backgroundColor: "rgba(255, 255, 255, 0.59)",
            borderRadius: "0 8px 8px 0",
            boxShadow: 2,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
            visibility: isSidebarExpanded ? "hidden" : "visible",
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default SideBar;
