import App from '../App.jsx';
import HomePage from '../components/Homepage.jsx';
import Profile from '../components/Profile.jsx';
import Signup from '../components/Users/Signup.jsx';
import Login from '../components/Users/Login.jsx';
import Update from '../components/Partials/UpdateProfile.jsx';

const routes = [
  {
    path: "/",
    element: <App />,
    children:[
      { index: true, element: <HomePage /> },
      {path: "homepage",element: <HomePage/>},
      {path: "profile",element: <Profile/>},
      {path: "profile/update",element: <Update/>},
      {path: "signup",element: <Signup/>},
      {path: "login",element: <Login/>},
     ,
      
    ]
  },
];
export default routes;