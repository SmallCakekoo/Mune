// import { createBrowserRouter } from "react-router";

// // Pages
// import Landing from "../pages/Landing/Landing";
// import Login from "../pages/Auth/Login";
// import Signup from "../pages/Auth/Signup";
// import Home from "../pages/Home/Home";
// import Room from "../pages/Room/Room";
// import Profile from "../pages/Profile/Profile";
// import Playlist from "../pages/Playlist/Playlist";
// import NotFound from "../pages/NotFound/NotFound";

// // Layouts
// import AuthLayout from "../components/layout/AuthLayout";

// const router = createBrowserRouter(
//   [
//     // Public Routes
//     {
//       path: "/",
//       Component: Landing,
//     },
//     {
//       path: "login",
//       Component: Login,
//     },
//     {
//       path: "signup",
//       Component: Signup,
//     },

//     // Protected Routes (Auth Layout)
//     {
//       path: "auth",
//       Component: AuthLayout,
//       children: [
//         {
//           path: "home",
//           Component: Home,
//         },
//         {
//           path: "profile/:userId?",
//           Component: Profile,
//         },
//         {
//           path: "room/:roomId",
//           Component: Room,
//         },
//         {
//           path: "playlist/:playlistId",
//           Component: Playlist,
//         },
//       ],
//     },

//     // 404 Not Found
//     {
//       path: "*",
//       Component: NotFound,
//     },
//   ],
//   { 
//     basename: import.meta.env.BASE_URL || "/" 
//   }
// );

// export default router;