import { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import SideBar from "./sideBar";
import ChangePassword from "../pages/changePassword";
import RouteDetails from "../pages/userDashboard/routeDetails";
import LiveTracking from "../pages/userDashboard/routeMap/user";
import { checkUserRole } from "../store/user/authThunk";
import SpanLoader from "./SpanLoader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import AdminDashboard from "../pages/adminDashboard/dashboard";
import UserManagement from "../pages/adminDashboard/userManagement";
import DriverManagement from "../pages/adminDashboard/driverMangement";
import StopManagement from "../pages/adminDashboard/stopMangement";
import UserDashboard from "../pages/userDashboard/dashboard";
import UserProfile from "../pages/userDashboard/userProfile";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [selectedView, setSelectedView] = useState("user-dashboard");
  const checkRole = useAppSelector((state) => state.userSlice.isSuperUser);
  const isLoading = useAppSelector((state) => state.userSlice.isLoading);

  useEffect(() => {
    dispatch(checkUserRole());
  }, [dispatch]);

  useEffect(() => {
    if (checkRole !== null && checkRole !== undefined) {
      setSelectedView(checkRole ? "admin-dashboard" : "user-dashboard");
    }
  }, [checkRole]);

  const renderContent = () => {
    switch (selectedView) {
      // Admin views
      case "admin-dashboard":
        return <AdminDashboard />;
      case "user-management":
        return <UserManagement />;
      case "driver-management":
        return <DriverManagement />;
      case "stop-management":
        return <StopManagement />;
      //   case "route-management":
      //     return <RouteManagement />;
      case "account-settings":
        return <ChangePassword />;

      // User views
      case "user-dashboard":
        return <UserDashboard />;
      case "live-tracking":
        return <LiveTracking />;
      case "routes":
        return <RouteDetails />;
      case "user-profile":
        return <UserProfile />;
      case "user-settings":
        return <ChangePassword />;

      default:
        return <div>Select a view from the sidebar</div>;
    }
  };

  if (isLoading) {
    return <SpanLoader />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideBar
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        isSuperUser={checkRole || false}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          height: "100vh",
          backgroundColor: "rgb(57, 158, 48)",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
