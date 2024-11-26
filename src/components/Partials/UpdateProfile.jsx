import { useState,useEffect } from "react";
import { useParams,useOutletContext,useNavigate } from "react-router-dom";
import Errors from "./Errors"

export default function Update ({setUpdateProfile,updateProfile,setFormOpen,formOpen}){
    const [token,setToken,edit,setEdit] = useOutletContext();
    const[bio,setBio] = useState(undefined);
    const[file,setFile] = useState(undefined);

    const[formErrors,setFormErrors] = useState(null);
    //next steps:
    //file upload
    //save url to db with bio
    //put/post for profile, should always be post. if one exists delete
    

    async function handleSubmit(e){
        e.preventDefault();
        //max file size: 2MB
        const maxSize = 2*1024*1024
        if (file.size>maxSize){
            alert("File size exceeds 2MB. Please select a smaller file");
            return
        }
        const form = new FormData();
        form.append('file', file);
        form.append('bio', bio);
        const response = await fetch(import.meta.env.VITE_BACKEND+"/profiles", {
            method: "POST",
            mode:"cors",
            headers: {
              "authorization": "Bearer " +token
            },
            body:form
        }); 
        console.log(response)
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            console.log(response)
            setUpdateProfile(!updateProfile)
            setFormOpen("false")
            setBio("");
            setFile(undefined);

        }

    }
    function handleBioChange(e){
        setBio(e.target.value)
    }
    function handleFileChange(e){
        setFile(e.target.files[0])
    }
    return (
        
        <div className="formContainer">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="bio">Bio:</label>
                <textarea name="bio" id="bio" value={bio} onChange={handleBioChange}/>
                <label htmlFor="file">Profile Picture:</label>
                <input type="file" name="file" file={file} onChange={handleFileChange} accept="image/*"/>
                <button type="submit" >Update</button>
            </form>
            <Errors errors={formErrors}/>
        </div>
    )
}


