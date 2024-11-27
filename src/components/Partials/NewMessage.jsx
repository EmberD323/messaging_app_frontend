import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Errors from "../Partials/Errors"

export default function NewMessage ({selectedConversationPerson,selectedConversation,setSelectedConversation}){
    const [token,setToken,edit,setEdit] = useOutletContext();
    const[text,setText] = useState(undefined);
    const[formErrors,setFormErrors] = useState(null);

    //send message to db
    async function handleSubmit(e){
        e.preventDefault();
        const personID = selectedConversationPerson.id;
        const response = await fetch(import.meta.env.VITE_BACKEND+"/messages/", {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
            body: JSON.stringify({text:text,receiverid:personID}),
        }); 
        
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            setFormErrors(errors)
        }
        else{
            const message = await response.json();
            //include new message in the conversation
            const updatedConversation = selectedConversation;
            updatedConversation.push(message)
            setSelectedConversation(updatedConversation);
            //clear form
            setText("");
            //reload fetch
            setEdit(!edit);
        }
    }
    function handleTextChange(e){
        setText(e.target.value)
    }
    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">New Message:</label>
                <textarea name="text" id="text" value={text} onChange={handleTextChange}/>
                <button type="submit" >Send</button>
            </form>
            <Errors errors={formErrors}/>
        </div>
    )
}


