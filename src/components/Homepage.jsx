import { useOutletContext,Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Conversations from "./Partials/Conversations"
import loadingImage from "../assets/icons8-loading-60.png"


export default function HomePage (){
    const [token,setToken,edit,setEdit] = useOutletContext();
    const [error,setError]=useState(null);
    const [loading,setLoading] = useState(true);
    const [receivedMessages,setReceivedMessages]=useState(null);
    const [sentMessages,setSentMessages]=useState(null);
    //if not logged in
    if(typeof token == "object"){
        return (
          <div className="notLoggedIn">
            <img width="96" height="96" src="https://img.icons8.com/forma-light/96/d7f171/speech-bubble-with-dots.png" alt="speech-bubble-with-dots"/>
            <div>Welcome to Messaging App.</div>
            <div><Link to="login">Log in</Link> or <Link to="signup">Sign Up</Link> today to start chatting!</div>
           </div>
          )
    }

    //get all messages sent and recieved by user
    useEffect(()=>{
        fetch(import.meta.env.VITE_BACKEND +"/messages/received",{
            method: "GET",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            }
          })
          .then((response)=>response.json())
          .then((json)=>setReceivedMessages(json))
          .catch((error)=>setError(error));

        fetch(import.meta.env.VITE_BACKEND +"/messages/sent",{
          method: "GET",
          mode:"cors",
          headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " +token
          }
        })
        .then((response)=>response.json())
        .then((json)=>setSentMessages(json))
        .catch((error)=>setError(error))
        .finally(()=>setLoading(false));
    },[edit])

    if(error) return <p>{error}</p>
    if(loading) return (
      <div className="loading">
          <div>Loading</div>
          <img className="loadingImage" src={loadingImage} alt="loading" />
      </div>
  )
    return (
        <div className="homepage">
            <Conversations receivedMessages={receivedMessages} sentMessages={sentMessages}/>
        </div>
    )
}


