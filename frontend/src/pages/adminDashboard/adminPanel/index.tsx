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
  Container,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TrafficOutlinedIcon from "@mui/icons-material/TrafficOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
import AdminDashboard from "../Dashboard";
import ManageUser from "../../adminDashboard/manageUser";
import RouteManagement from "../../adminDashboard/viewRoutes";
import ManageDriver from "../../adminDashboard/manageDriver";
import ChangePassword from "../../changePassword";
import ManageStop from "../manageStops";

const AdminPanel = () => {
  const [selectedView, setSelectedView] = useState("dashboard");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isMobile) {
      setIsSidebarExpanded(false);
    } else {
      setIsSidebarExpanded(true);
    }
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleSidebarClick = (view: string) => {
    setSelectedView(view);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <DashboardOutlinedIcon />,
      view: "admin-dashboard",
    },
    {
      label: "View Users",
      icon: <PersonIcon />,
      view: "view-users",
    },
    {
      label: "Drivers",
      icon: <PersonAddIcon />,
      view: "manage-drivers",
    },
    {
      label: "Stops",
      icon: <TrafficOutlinedIcon />,
      view: "manage-stops",
    },
    {
      label: "Routes",
      icon: <RouteOutlinedIcon />,
      view: "add-routes",
    },
    {
      label: "Settings",
      icon: <ManageAccountsOutlinedIcon />,
      view: "account-settings",
    },
    {
      label: "LogOut",
      icon: <LogoutIcon />,
      view: "logout",
    },
  ];

  return (
    <Box
      sx={{ display: "flex", height: "calc(100vh - 70px)", overflow: "hidden" }}
    >
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: isSidebarExpanded ? 240 : 64,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarExpanded ? 240 : 64,
            boxSizing: "border-box",
            bgcolor: indigo[700],
            color: "#fff",
            height: "calc(100vh - 60px)",
            top: 58,
            transition: "width 0.3s ease",
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleSidebarToggle}>
              <ListItemIcon
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: "auto",
                }}
              >
                <IconButton size="medium" sx={{ color: "#fff" }}>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isSidebarExpanded ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MenuIcon fontSize="medium" />
                  </motion.div>
                </IconButton>
              </ListItemIcon>
              {isSidebarExpanded && <ListItemText primary="Toggle Menu" />}
            </ListItemButton>
          </ListItem>

          {menuItems.map((item) => (
            <motion.div
              key={item.view}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: item.view === "dashboard" ? 0.1 : 0,
              }}
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
                      backgroundColor: "rgba(255, 255, 255, 0.27)",
                      transform: "scale(1.1)",
                      transition: "transform 0.2s ease",
                    },
                    px: isSidebarExpanded ? 2 : 1,
                    borderRadius: 1,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minWidth: "auto",
                      color: "#fff",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isSidebarExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ListItemText
                        primary={item.label}
                        sx={{
                          color: "#fff",
                          pl: 1,
                          fontSize: "1.1rem",
                          fontWeight: "500",
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
          p: 2,
          mt: 1,
          overflowY: "auto",
          height: "calc(100vh - 64px)", // Adjusted height to fit within the viewport
        }}
      >
        <Container>
          <motion.div
            key={selectedView}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedView === "admin-dashboard" && <AdminDashboard />}
            {selectedView === "view-users" && <ManageUser />}
            {selectedView === "manage-drivers" && <ManageDriver />}
            {selectedView === "manage-stops" && <ManageStop />}
            {selectedView === "add-routes" && <RouteManagement />}
            {selectedView === "account-settings" && <ChangePassword />}
            {/* {selectedView === "logout" && <LogOut />} */}
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPanel;
