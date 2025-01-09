import React, { createContext, useState, useContext } from "react";
import { indigo } from "@mui/material/colors";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  MenuOutlined,
  DashboardOutlined,
  PeopleAltOutlined,
  ContactsOutlined,
  PersonOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import avatar from "../../../../assets/images/avatar.png";
import Item from "./item";

interface ToggledContextType {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToggledContext = createContext<ToggledContextType | null>(null);

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const contextValue = { toggled: collapsed, setToggled: setCollapsed };

  return (
    <ToggledContext.Provider value={contextValue}>
      <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
        <SidebarContent />
      </Box>
    </ToggledContext.Provider>
  );
};

const SidebarContent = () => {
  const context = useContext(ToggledContext);
  if (!context) {
    throw new Error(
      "ToggledContext must be used within a ToggledContext.Provider"
    );
  }

  const { toggled, setToggled } = context;

  return (
    <Sidebar
      backgroundColor={indigo[500]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={toggled}
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: indigo[50],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={() => setToggled(!toggled)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>

      {!toggled && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            alt="Admin Avatar"
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Typography variant="h5" fontWeight="700" color={indigo[50]}>
            Admin
          </Typography>
        </Box>
      )}

      <Box mb={5} pl={toggled ? undefined : "5%"}>
        <Menu>
          <Item
            title="Dashboard"
            path="/"
            icon={<DashboardOutlined />}
            colors={indigo[500]}
          />
        </Menu>

        <Typography
          variant="h6"
          color={indigo[50]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!toggled ? "Users" : " "}
        </Typography>
        <Menu>
          <Item
            title="View Users"
            path="/viewusers"
            icon={<ContactsOutlined />}
            colors={indigo[500]}
          />
          <Item
            title="Manage Users"
            path="/manageuser"
            icon={<PeopleAltOutlined />}
            colors={indigo[500]}
          />
        </Menu>

        <Typography
          variant="h6"
          color={indigo[50]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!toggled ? "Buses" : " "}
        </Typography>
        <Menu>
          <Item
            title="Driver"
            path="/drivers"
            icon={<ContactsOutlined />}
            colors={indigo[500]}
          />
          <Item
            title="Add Driver"
            path="/addDriver"
            icon={<PersonOutlined />}
            colors={indigo[500]}
          />
          <Item
            title="Manage Drivers"
            path="/manageDriver"
            icon={<PeopleAltOutlined />}
            colors={indigo[500]}
          />
        </Menu>

        <Typography
          variant="h6"
          color={indigo[50]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!toggled ? "General" : " "}
        </Typography>
        <Menu>
          <Item
            title="Settings"
            path="/settings"
            icon={<SettingsOutlined />}
            colors={indigo[500]}
          />
          <Item
            title="Logout"
            path="/login"
            icon={<LogoutOutlined />}
            colors={indigo[500]}
          />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
