import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TrafficOutlinedIcon from "@mui/icons-material/TrafficOutlined";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

export const adminMenu = [
  {
    label: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    view: "admin-dashboard",
    group: "general",
  },
  {
    label: "User Management",
    icon: <GroupsOutlinedIcon />,
    view: "user-management",
    group: "management",
  },
  {
    label: "Driver Management",
    icon: <PersonAddAltOutlinedIcon />,
    view: "driver-management",
    group: "management",
  },
  {
    label: "Route Management",
    icon: <RouteOutlinedIcon />,
    view: "route-management",
    group: "operations",
  },
  {
    label: "Stops Management",
    icon: <TrafficOutlinedIcon />,
    view: "stop-management",
    group: "operations",
  },
  {
    label: "Account Settings",
    icon: <SettingsOutlinedIcon />,
    view: "account-settings",
    group: "preferences",
  },
  // {
  //   label: "Logout",
  //   icon: <LogoutOutlinedIcon />,
  //   view: "logout",
  //   group: "system",
  // },
];

export const userMenu = [
  {
    label: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    view: "user-dashboard",
    group: "general",
  },
  {
    label: "Live Tracking",
    icon: <LocationOnOutlinedIcon />,
    view: "live-tracking",
    group: "navigation",
  },
  {
    label: "Routes",
    icon: <RouteOutlinedIcon />,
    view: "routes",
    group: "navigation",
  },
  {
    label: "Profile",
    icon: <PersonIcon />,
    view: "user-profile",
    group: "preferences",
  },
  {
    label: "Settings",
    icon: <SettingsOutlinedIcon />,
    view: "user-settings",
    group: "preferences",
  },
  // {
  //   label: "Logout",
  //   icon: <LogoutOutlinedIcon />,
  //   view: "logout",
  //   group: "system",
  // },
];
