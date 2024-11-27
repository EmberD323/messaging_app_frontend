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
                        <img width="25" height="25" src="https://img.icons8.com/ios/50/b5ef8a/home--v1.png" alt="home--v1"/>
                    </Link>
                </div>
                <h1 className="heading">Messaging App</h1>
                <div className="user">
                    <Link to="login">
                        <div>Log in</div>
                        <img width="25" height="25" src="https://img.icons8.com/ios/50/b5ef8a/login-rounded-right--v1.png" alt="login-rounded-right--v1"/>
                    </Link>
                    <Link to="signup">
                        <div>Sign up</div>
                        <img width="25" height="25" src="https://img.icons8.com/forma-thin/24/b5ef8a/add-user-male.png" alt="add-user-male"/>
                    </Link>
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
                        <img width="25" height="25" src="https://img.icons8.com/ios/50/b5ef8a/home--v1.png" alt="home--v1"/>
                    </Link>

                    <Link to="profile">
                        <div>My Profile</div>
                        <img width="25" height="25" src="https://img.icons8.com/windows/32/b5ef8a/person-male.png" alt="person-male"/>                    </Link>
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