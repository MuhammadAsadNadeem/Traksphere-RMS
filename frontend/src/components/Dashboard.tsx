import { useState, useEffect } from "react";
import ChangePassword from "../pages/changePassword";
import { checkUserRole } from "../store/user/authThunk";
import SpanLoader from "./SpanLoader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import UserManagement from "../pages/userManagement";
import DriverManagement from "../pages/driverMangement";
import StopManagement from "../pages/stopMangement";
import UserDashboard from "../pages/dashboard/userDashboard";
import LiveTracking from "../pages/liveTracking";
import RouteDetails from "../pages/routeDetails";
import UserProfile from "../pages/userProfile";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [selectedView, setSelectedView] = useState("dashboard");
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
      // case "dashboard":
      //   return <AdminDashboard />;
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
      case "dashboard":
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

  return renderContent();
};

export default Dashboard;
