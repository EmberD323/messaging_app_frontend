import { useState,useEffect } from "react";
import { useParams,useOutletContext,useNavigate } from "react-router-dom";
import Errors from "./Errors"

export default function Update ({}){
    const [token,setToken,edit,setEdit] = useOutletContext();
    const[bio,setBio] = useState(undefined);
    const[formErrors,setFormErrors] = useState(null);
    //next steps:
    //file upload
    //save url to db with bio

    async function handleSubmit(e){
        // e.preventDefault();
        // const personID = selectedConversationPerson.id;
        // const response = await fetch(import.meta.env.VITE_BACKEND+"/messages/", {
        //     method: "POST",
        //     mode:"cors",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "authorization": "Bearer " +token
        //     },
        //     body: JSON.stringify({text:text,receiverid:personID}),
        // }); 
        
        // if(response.status != 200){//if theres errors
        //     const errors = await response.json();
        //     setFormErrors(errors)
        // }
        // else{
        //     const message = await response.json();
        //     const updatedConversation = selectedConversation;
        //     updatedConversation.push(message)
        //     setSelectedConversation(updatedConversation);
        //     setText("");
        //     //reload fetch
        //     setEdit(!edit);
        // }

    }
    function handleBioChange(e){
        setBio(e.target.value)
    }
    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <label htmlFor="bio">Bio:</label>
                <textarea name="bio" id="bio" value={bio} onChange={handleBioChange}/>
                <button type="submit" >Send</button>
            </form>
            <Errors errors={formErrors}/>
        </div>
    )
}


