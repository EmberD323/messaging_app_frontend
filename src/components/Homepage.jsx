import { useOutletContext } from "react-router-dom";

export default function HomePage (){
    const [token,setToken] = useOutletContext();
  
    return (
        <div className="homepage">
            <h2>All Posts</h2>
        </div>
    )
}


