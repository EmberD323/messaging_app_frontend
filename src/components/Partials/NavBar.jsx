import { Link,useNavigate} from "react-router-dom";

function NavBar({token,setToken}) {
    const navigate = useNavigate()
    //remove token and route to homepage
    function handleLogout(){
        localStorage.removeItem("token");
        setToken(null);
        navigate('../login');
    }
    //if token is null
    if(typeof token == "object"){
        return (
            <div className="navBar">
                <div className="routes">
                    <Link to="homepage">
                        <div>Home</div>
                        <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/FFFFFF/home.png" alt="home"/>
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
                        <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/FFFFFF/home.png" alt="home"/>
                    </Link>

                    <Link to="profile">
                        <div>My Profile</div>
                        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/person-male.png" alt="person-male"/>
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