import { useState,useEffect } from "react";
import { useParams,useOutletContext,useNavigate } from "react-router-dom";
import Errors from "../Partials/Errors"

export default function NewMessage ({conversationsWith,handleConversationOpen}){
    const [token,setToken,edit,setEdit] = useOutletContext();
    const[username,setUsername] = useState(undefined);
    const[formErrors,setFormErrors] = useState(null);

    async function handleSearch(e){
        e.preventDefault();
        const response = await fetch(import.meta.env.VITE_BACKEND+"/users/"+username, {
            method: "GET",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " +token
            },
        }); 
        
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            setFormErrors(errors)
        }
        else{
            const user = await response.json();
            e = {target:{parentNode:{id:user.id}}};
            handleConversationOpen(e);
        }

    }
    function handleUsernameChange(e){
        setUsername(e.target.value)
    }
    return (
        <div className="formContainer">
            <form onSubmit={handleSearch}>
                <label htmlFor="username">Find user by email:</label>
                <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange}/>
                <button type="submit" >Search</button>
            </form>
            <Errors errors={formErrors}/>
        </div>
    )
}


