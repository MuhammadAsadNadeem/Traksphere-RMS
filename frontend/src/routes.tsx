import LoginPage from "./pages/logIn/index";
import ForgotPassword from "./pages/forgotPassword/index";
import SignUp from "./pages/signUp/signupPart1";
// import UpdateProfile from "./pages/signUp/signupPart2";
import LandingPage from "./pages/landingPage/index";
// import RouteDetails from "./pages/userDashboard/routeDetails";
// import ViewUsers from "./pages/adminDashboard/viewUsers";
// import ManageUser from "./pages/adminDashboard/manageUser";
// import Drivers from "./pages/adminDashboard/drivers";
// import AddDriver from "./pages/adminDashboard/addDriver";
// import ManageDriver from "./pages/adminDashboard/manageDriver";
// import User from "./pages/userDashboard/routeMap/user";
// import ChangePassword from "./pages/changePassword";
import Dashboard from "./components/Dashboard";

export const routes = {
  login: "/login",
  signup: "/signup",
  profile: "/complete-signup",
  forgotPassword: "/forgot-password",
  landingPage: "/",
  Dashboard: "/dashboard",
  sideBar: "/sidebar",
  // adminPanel: "/admin-panel",
  // viewusers: "/view-users",
  // manageuser: "/manage-user",
  // drivers: "/drivers",
  // addDriver: "/add-driver",
  // manageDriver: "/manage-driver",
  // userPanel: "/user-panel",
  // settings: "/settings",
  // changePassword: "/change-password",
  // leaflet: "/user",
  // routedetails: "/viewroutes",
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
    path: routes.landingPage,
    element: <LandingPage />,
  },
  {
    path: routes.Dashboard,
    element: <Dashboard />,
  },

  // {
  //   path: routes.profile,
  //   element: <UpdateProfile />,
  // },
  // {
  //   path: routes.viewusers,
  //   element: <ViewUsers />,
  // },
  // {
  //   path: routes.manageuser,
  //   element: <ManageUser />,
  // },
  // {
  //   path: routes.drivers,
  //   element: <Drivers />,
  // },
  // {
  //   path: routes.addDriver,
  //   element: <AddDriver />,
  // },
  // {
  //   path: routes.manageDriver,
  //   element: <ManageDriver />,
  // },
  // {
  //   path: routes.changePassword,
  //   element: <ChangePassword />,
  // },
  // {
  //   path: routes.leaflet,
  //   element: <User />,
  // },
];
