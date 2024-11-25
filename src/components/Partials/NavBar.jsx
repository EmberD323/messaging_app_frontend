import { Link,useNavigate} from "react-router-dom";

function NavBar({token,setToken}) {
    const navigate = useNavigate()
    function handleLogout(){
        setToken(null);
        localStorage.removeItem("token");
        navigate('../');
    }
    if(typeof token == "object"){
        return (
            <div className="navBar">
                <div className="routes">
                    <Link to="homepage">
                        <div>Home</div>
                        <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/0a2463/home.png" alt="home"/>
                    </Link>
                </div>
                <h1 className="heading">Messaging App</h1>
                <div className="user">
                    <Link to="login">Log in</Link>
                    <Link to="signup">Sign up</Link>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="navBar">
                <div className="routes">
                    <Link to="homepage">
                        <div>Home</div>
                        <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/efaac4/home.png" alt="home"/>
                    </Link>
                </div>
                <h1 className="heading">Messaging App</h1>
                <div className="user">
                    <button onClick={handleLogout}>Log out</button>
                </div>
            </div>
        )
    }
}

export default NavBar;