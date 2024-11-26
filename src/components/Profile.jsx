import { useOutletContext,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Update from './Partials/UpdateProfile.jsx';

export default function Profile (){
    
    const [token,setToken,edit,setEdit] = useOutletContext();
    const [error,setError]=useState(null);
    const [loading,setLoading] = useState(true);
    const [profile,setProfile] = useState(null);
    const [user,setUser] = useState(undefined);
    const [updateProfile,setUpdateProfile] = useState(false);


    const [formOpen,setFormOpen] = useState("false");
    function handleFormOpen(){
        setFormOpen("true")
    }
    //fetch user profile
    useEffect(()=>{
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
            //heck for null profile
            if(json.profile){
                setProfile(json.profile)
                setUser(json.profile.user)
            }
            else{
                setUser(json.user)
            }
        })
        .catch((error)=>setError(error))
        .finally(()=>setLoading(false));
    },[updateProfile])

    if(error) return <p>{error}</p>
    if(loading) return <p>Loading</p>
    if(profile == null){
        return(
            <div className="profile">
                <div className="imageContainer">Dummy image</div>
                <div className="name">Name: {user.first_name} {user.last_name}</div>
                <div className="name">Email: {user.username}</div>
                <div className="bio">Bio: </div>
                <button onClick={handleFormOpen}>Update Profile</button>
                <div className="formContainer" id={formOpen}>
                    <Update setUpdateProfile={setUpdateProfile} updateProfile={updateProfile} setFormOpen={setFormOpen} formOpen={formOpen}/>
                </div>

            </div>
        )
    }
    return(
        <div className="profile">
            <div className="imageContainer">{profile.pictureURL}</div>
            <div className="name">Name: {user.first_name} {profile.user.last_name}</div>
            <div className="name">Email: {user.username}</div>
            <div className="bio">Bio: {profile.bio}</div>
            <button onClick={handleFormOpen}>Update Profile</button>
            <div className="formContainer" id={formOpen}>
            <Update setUpdateProfile={setUpdateProfile} updateProfile={updateProfile} setFormOpen={setFormOpen} formOpen={formOpen}/>
            </div>

        </div>
    )
    
}


