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
import { IoSettingsSharp } from "react-icons/io5";
import { BiMessageSquareError } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { motion } from "framer-motion";
import UserDashboard from "../userDashboard";
import RouteDetails from "../routeDetails";
import User from "../routeMap/user";
import Compliant from "../compliantLog";
import Profile from "../profile";
import ChangePassword from "../../changePassword";

const UserPanel = () => {
  const [selectedView, setSelectedView] = useState("dashboard");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (isMobile) {
      setIsSidebarExpanded(false); // Collapse sidebar on mobile screens
    } else {
      setIsSidebarExpanded(true); // Expand sidebar on larger screens
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
      icon: <AiOutlineDashboard size={30} />,
      view: "dashboard",
    },
    { label: "Route Track", icon: <GrMapLocation size={30} />, view: "user" },
    {
      label: "View Routes",
      icon: <MdOutlineDirectionsBus size={30} />,
      view: "viewRoutes",
    },
    {
      label: "Log Complaint",
      icon: <BiMessageSquareError size={30} />,
      view: "complaint",
    },
    { label: "Profile", icon: <BsPerson size={30} />, view: "profile" },
    {
      label: "Settings",
      icon: <IoSettingsSharp size={30} />,
      view: "settings",
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      {/* Sidebar with more animations */}
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
            transition: "width 0.3s ease", // Smooth transition for sidebar expansion
          },
        }}
      >
        <List>
          {/* Hamburger Menu Button with Rotation */}
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
                    animate={{ rotate: isSidebarExpanded ? 0 : 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MenuIcon fontSize="medium" />
                  </motion.div>
                </IconButton>
              </ListItemIcon>
              {isSidebarExpanded && <ListItemText primary="Toggle Menu" />}
            </ListItemButton>
          </ListItem>

          {/* Menu Items with More Interactive Animations */}
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
                      transform: "scale(1.1)", // Bounce effect on hover
                      transition: "transform 0.2s ease", // Smooth bounce effect
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

      {/* Main Content with Dynamic Animations */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: 1,
          overflowY: "auto",
        }}
      >
        <Container>
          <motion.div
            key={selectedView}
            initial={{ opacity: 0, y: 50 }} // Slide from the bottom
            animate={{ opacity: 1, y: 0 }} // Slide to its original position
            transition={{ duration: 0.5 }}
          >
            {selectedView === "dashboard" && <UserDashboard />}
            {selectedView === "viewRoutes" && <RouteDetails />}
            {selectedView === "user" && <User />}
            {selectedView === "complaint" && <Compliant />}
            {selectedView === "profile" && <Profile />}
            {selectedView === "settings" && <ChangePassword />}
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default UserPanel;
