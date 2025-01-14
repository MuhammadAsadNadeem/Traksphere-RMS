import LoginPage from "./pages/login/index";
import ForgotPassword from "./pages/forgotPassword/index";
import SignUp from "./pages/signup/signupPart1";
import UpdateProfile from "./pages/signup/signupPart2";
import Home from "./pages/home/index";
import SideBar from "./pages/adminDashboard/dashlayout/sidebar";
import UserPanel from "./pages/userDashboard/userPanel";
import Dashboard from "./pages/userDashboard/userDashboard";
import RouteDetails from "./pages/userDashboard/routeDetails";
import ViewUsers from "./pages/adminDashboard/viewusers";
import ManageUser from "./pages/adminDashboard/manageuser";
import Drivers from "./pages/adminDashboard/drivers";
import AddDriver from "./pages/adminDashboard/addDriver";
import ManageDriver from "./pages/adminDashboard/manageDriver";
import User from "./pages/userDashboard/routeMap/user";
import ChangePassword from "./pages/changePassword";

export const routes = {
  login: "/login",
  signup: "/signup",
  profile: "/complete-signup",
  forgotPassword: "/forgot-password",
  homePage: "/",
  adminDashboard: "/admin",
  Dashboard: "/dashmenu",
  sidebar: "/dashboard",
  viewusers: "/viewusers",
  manageuser: "/manageuser",
  drivers: "/drivers",
  addDriver: "/addDriver",
  manageDriver: "/manageDriver",
  settings: "/settings",
  changePassword: "/change-password",
  leaflet: "/user",
  routedetails: "/viewroutes",
  userPanel: "/userpanel",
};

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
    path: routes.homePage,
    element: <Home />,
  },
  {
    path: routes.sidebar,
    element: <SideBar />,
  },
  {
    path: routes.userPanel,
    element: <UserPanel />,
  },
  {
    path: routes.Dashboard,
    element: <Dashboard />,
  },
  {
    path: routes.routedetails,
    element: <RouteDetails />,
  },

  {
    path: routes.profile,
    element: <UpdateProfile />,
  },
  {
    path: routes.viewusers,
    element: <ViewUsers />,
  },
  {
    path: routes.manageuser,
    element: <ManageUser />,
  },
  {
    path: routes.drivers,
    element: <Drivers />,
  },
  {
    path: routes.addDriver,
    element: <AddDriver />,
  },
  {
    path: routes.manageDriver,
    element: <ManageDriver />,
  },
  {
    path: routes.changePassword,
    element: <ChangePassword />,
  },
  {
    path: routes.leaflet,
    element: <User />,
  },
];
