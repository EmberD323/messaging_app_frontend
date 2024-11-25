import { useEffect, useState } from "react";

import "./styles/App.css"
import { Outlet } from "react-router-dom";
import NavBar from "./components/Partials/NavBar"

const App = () => {
  // const [posts,setPosts]=useState(null);
  // const [error,setError]=useState(null);
  // const [loading,setLoading] = useState(true);
  const initalToken = localStorage.getItem("token");
  const [token,setToken] = useState(initalToken);
  // const [edit,setEdit] = useState(true);
  // const [users,setUsers] = useState(null);

//<Outlet context={[posts,setPosts,token,setToken,edit,setEdit,users,setUsers]}/>

  // if(error) return <p>Error</p>
  // if(loading) return <p>Loading</p>
  
  return (
    <>
      <NavBar token={token} setToken={setToken}/>
      <Outlet context={[token,setToken]}/>
    </>
  );
};

export default App;