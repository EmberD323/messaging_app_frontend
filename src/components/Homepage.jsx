import { useOutletContext } from "react-router-dom";
import NavBar from "./Partials/NavBar"

export default function HomePage (){
    const [token,setToken] = useOutletContext();
  
    return (
        <div className="homepage">
            <NavBar token={token} setToken={setToken}/>
            <h2>All Messages</h2>
        </div>
    )
}


