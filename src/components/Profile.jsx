import { useOutletContext } from "react-router-dom";
import { useState,useEffect } from "react";
import Update from './Partials/UpdateProfile.jsx';
import Loading from "./Loading.jsx";

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

    //get user profile from db on intial render and when profile updated.
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
    if(profile !=null){
        backgroundImageStyle={
            backgroundImage: "url('"+profile.pictureURL+"')",
          };
    }
    if(error) return <p>{error}</p>
    if(loading) return <Loading/>
    if(profile == null){
        return(
            <div className="profile">
                <div className="profilePic" 
                style={{backgroundImage: "url('https://rrkiqsthcekarglxlxcn.supabase.co/storage/v1/object/public/profile_pics/noprofile.png?t=2024-11-26T20%3A52%3A39.165Z')"}}>
                </div>
                <div className="name">Name: {user.first_name} {user.last_name}</div>
                <div className="name">Email: {user.username}</div>
                <div className="bio">Bio: </div>
                <button onClick={handleFormOpen} id={formOpen}>Update Profile</button>
                <div className="formContainer" id={formOpen}>
                    <Update setUpdateProfile={setUpdateProfile} updateProfile={updateProfile} setFormOpen={setFormOpen} profile={{bio:" "}}/>
                </div>
            </div>
        )
    }
    return(
        <div className="profile">
            <h2>Profile</h2>
            <div className="profilePic" 
                style={backgroundImageStyle}>
            </div>
            <div className="name">Name: {user.first_name} {user.last_name}</div>
            <div className="name">Email: {user.username}</div>
            <div className="bio">Bio: {profile.bio}</div>
            <button onClick={handleFormOpen} id={formOpen}>Update Profile</button>
            <div className="formContainer" id={formOpen}>
            <Update setUpdateProfile={setUpdateProfile} updateProfile={updateProfile} setFormOpen={setFormOpen} profile={profile}/>
            </div>
        </div>
    )
    
}


