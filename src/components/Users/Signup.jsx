import {  useState } from "react";
import {useNavigate } from "react-router-dom";
import Errors from "../Partials/Errors";
import loadingImage from "../../assets/icons8-loading-60.png"

export default function SignUp (){
    const[first_name,setFirstName] = useState(null);
    const[last_name,setLastName] = useState(null);
    const[username,setUsername] = useState(null);
    const[password,setPassword] = useState(null);
    const[passwordConfirm,setPasswordConfirm] = useState(null);
    const[formErrors,setFormErrors] = useState(null);
    const [loading,setLoading] = useState(false);

    function handleFirstNameChange(e){
        setFirstName(e.target.value)
    }
    function handleLastNameChange(e){
        setLastName(e.target.value)
    }
    function handleUsernameChange(e){
        setUsername(e.target.value)
    }
    function handlePasswordChange(e){
        setPassword(e.target.value)
    }
    function handlePasswordConfirmChange(e){
        setPasswordConfirm(e.target.value)
    }

    const navigate = useNavigate()
    //send signup data to db
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND + "/signup", {
              method: "POST",
              mode:"cors",
              headers: {
                "Content-Type": "application/json"
                },
              body: JSON.stringify({ first_name,last_name,username,password,passwordConfirm }),
            });
            if(response.status != 200){
                setLoading(false)
                const json = await response.json();
                setFormErrors(json.errors)
            }else{ 
                navigate('../login');
            }
          } catch (er) {
            console.error(er);
          }
    }
    return (
        <div className="signUp">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <div className="firstName">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" name="first_name" id="first_name" value={first_name} onChange={handleFirstNameChange} required/>
                </div>
                <div className="lastName">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" name="last_name" id="last_name" value={last_name} onChange={handleLastNameChange} required/>
                </div>
                <div className="username">
                    <label htmlFor="username">Email</label>
                    <input type="email" name="username" id="username" value={username} onChange={handleUsernameChange} required/>
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} required/>
                </div>
                <div className="passportConfirm">
                    <label htmlFor="passwordConfirm">Password</label>
                    <input type="password" name="passwordConfirm" id="passwordConfirm" value={passwordConfirm} onChange={handlePasswordConfirmChange} required/>
                </div>
                <button type="submit" >Submit</button>
                <img className="loadingImage" id={String(loading)}src={loadingImage} alt="loading" />

                <Errors errors={formErrors}/>

            </form>
            
        </div>
    )
}


