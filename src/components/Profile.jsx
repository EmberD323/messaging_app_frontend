import { useOutletContext } from "react-router-dom";
import { useState,useEffect } from "react";

export default function Profile (){
    
    const [token,setToken,edit,setEdit] = useOutletContext();
    const [error,setError]=useState(null);
    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(undefined);

    //fetch user profile
    useEffect(()=>{
        console.log("hi")
        fetch(import.meta.env.VITE_BACKEND +"/profile",{
          method: "GET",
          mode:"cors",
          headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " +token
          }
        })
        .then((response)=>response.json())
        .then((json)=>{
            console.log(json)
            setUser(json.user)
        })
        .catch((error)=>setError(error))
        .finally(()=>setLoading(false));
    },[])

    if(error) return <p>{error}</p>
    if(loading) return <p>Loading</p>

    if(user.profile == null){
        return(
            <div className="profile">
                <div className="imageContainer">Image for null goes here</div>
                <div className="name">Name: {user.first_name} {user.last_name}</div>
                <div className="name">Email: {user.username}</div>
                <div className="bio">Bio: No Bio</div>
                <button>Update Profile</button>

            </div>
        )
    }
    return(
        <div className="profile">
            <div className="imageContainer">{user.profile.pictureURL}</div>
            <div className="name">Name: {user.first_name} {user.last_name}</div>
            <div className="name">Email: {user.username}</div>
            <div className="bio">Bio: {user.profile.bio}</div>
            <button>Update Profile</button>

        </div>
    )
    
}

