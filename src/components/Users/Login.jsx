import { useState } from "react";
import { useOutletContext,useNavigate } from "react-router-dom";
import Errors from "../Partials/Errors"
export default function Login (){
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[formErrors,setFormErrors] = useState(null);
    const [token,setToken,edit,setEdit] = useOutletContext();

    function handleUsernameChange(e){
        setUsername(e.target.value)
    }
    function handlePasswordChange(e){
        setPassword(e.target.value)
    }

    const navigate = useNavigate()
    //submit login details to db
    async function handleSubmit(e){
        e.preventDefault();
        console.log("hi")
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND +"/login", {
              method: "POST",
              mode:"cors",
              headers: {
                "Content-Type": "application/json"
                },
              body: JSON.stringify({username,password}),
            });        
            console.log(response)
            if(response.status != 200){
                const json = await response.json();
                setFormErrors(json.errors)
            }else{ 
                //add token to local storage
                const json = await response.json();
                const thisToken = json.token;
                setToken(thisToken)
                localStorage.setItem("token", thisToken);
                navigate('../homepage');
            }
          } catch (er) {
            console.error(er);
          }
    }

    return (
        <div className="content">
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email</label>
                <input type="email" name="username" id="username" value={username} onChange={handleUsernameChange} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} required/>
                <button type="submit">Log in</button>
            </form>
            <Errors errors={formErrors}/>
        </div>
    )
}


