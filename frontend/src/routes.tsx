import LoginPage from "./pages/logIn/index";
import ForgotPassword from "./pages/forgotPassword/index";
import SignUp from "./pages/signUp/signupPart1";
import Dashboard from "./pages/dashboard";
import UserManagement from "./pages/userManagement";
import DriverManagement from "./pages/driverMangement";
import StopManagement from "./pages/stopMangement";
import ChangePassword from "./pages/changePassword";
import RouteManagement from "./pages/routeManagement";
import RouteDetails from "./pages/routeDetails";
import UserProfile from "./pages/userProfile";
import Profile from "./pages/signUp/signupPart2";
import LiveTracking from "./pages/liveTracking";
import LandingPage from "./pages/landingPage";

export const routes = {
  login: "/login",
  signup: "/signup",
  profile: "/complete-signup",
  forgotPassword: "/forgot-password",
  landingPage: "/",
  Dashboard: "/dashboard",
  sideBar: "/sidebar",
  userManagement: "/user-management",
  driverManagement: "/driver-management",
  stopManagement: "/stop-mangement",
  routeManagement: "/route-mangement",
  liveTracking: "/live-tracking",
  routesDetails: "/routes-details",
  userProfile: "/user-profile",
  changePassword: "/change-password",
  locationtest: "/location-test",
};

export const PrivateRoutes = [
  {
    path: routes.Dashboard,
    element: <Dashboard />,
  },
  {
    path: routes.userManagement,
    element: <UserManagement />,
  },
  {
    path: routes.driverManagement,
    element: <DriverManagement />,
  },
  {
    path: routes.stopManagement,
    element: <StopManagement />,
  },
  {
    path: routes.routeManagement,
    element: <RouteManagement />,
  },
  {
    path: routes.liveTracking,
    element: <LiveTracking />,
  },
  {
    path: routes.routesDetails,
    element: <RouteDetails />,
  },
  {
    path: routes.userProfile,
    element: <UserProfile />,
  },
  {
    path: routes.changePassword,
    element: <ChangePassword />,
  },
];

export const PublicRoutes = [
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: routes.signup,
    element: <SignUp />,
  },

  {
    path: routes.landingPage,
    element: <LandingPage />,
  },
  {
    path: routes.profile,
    element: <Profile />,
  },
];
