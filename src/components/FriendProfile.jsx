import { useOutletContext, useParams } from "react-router-dom";
import { useState,useEffect } from "react";

export default function FriendProfile (){
    let {id} = useParams();
    const [token,setToken,edit,setEdit] = useOutletContext();
    const [error,setError]=useState(null);
    const [loading,setLoading] = useState(true);
    const [profile,setProfile] = useState(null);
    const [user,setUser] = useState(null);

    //get profile and user info from db
    useEffect(()=>{
        fetch(import.meta.env.VITE_BACKEND +"/profiles/"+id,{
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
    },[])

    if(error) return <p>error</p>
    if(loading) return <p>Loading</p>
    if(profile == null){
        return(
            <div className="profile">
                <img src="https://rrkiqsthcekarglxlxcn.supabase.co/storage/v1/object/public/profile_pics/noprofile.png?t=2024-11-26T20%3A52%3A39.165Z" alt="profile_pic" class="profilePic"/>
                <div className="name">Name: {user.first_name} {user.last_name}</div>
                <div className="name">Email: {user.username}</div>
                <div className="bio">Bio: </div>
            </div>
        )
    }
    return(
        <div className="profile">
            <img src={profile.pictureURL} alt="profile_pic" class="profilePic"/>
            <div className="name">Name: {user.first_name} {user.last_name}</div>
            <div className="name">Email: {user.username}</div>
            <div className="bio">Bio: {profile.bio}</div>
        </div>
    )
    
}


