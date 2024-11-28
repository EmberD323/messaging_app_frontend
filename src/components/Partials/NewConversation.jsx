import { useState} from "react";
import {useOutletContext } from "react-router-dom";
import Errors from "../Partials/Errors"

export default function NewMessage ({handleConversationOpen}){
    const [token,setToken,edit,setEdit] = useOutletContext();
    const[username,setUsername] = useState("");
    const[formErrors,setFormErrors] = useState(null);

    //search for username and return user if found
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
            handleConversationOpen(e,user);
        }
        setUsername("")
        setFormErrors(null)

    }
    function handleUsernameChange(e){
        setUsername(e.target.value)
    }
    return (
            <form onSubmit={handleSearch} className="findUser">
                <input type="text" name="username" id="username" placeholder="Find user by email" value={username} onChange={handleUsernameChange}/>
                <button type="submit">Search</button>
                <Errors errors={formErrors}/>

            </form>

    )
}


