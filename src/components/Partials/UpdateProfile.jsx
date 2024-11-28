import { useState} from "react";
import { useOutletContext} from "react-router-dom";
import Errors from "./Errors"

export default function Update ({setUpdateProfile,updateProfile,setFormOpen,profile}){
    const [token,setToken,edit,setEdit] = useOutletContext();
    const[bio,setBio] = useState(profile.bio);
    const[file,setFile] = useState(undefined);
    const[formErrors,setFormErrors] = useState(null);

    //send profile to db
    async function handleSubmit(e){
        e.preventDefault();
        //max file size: 2MB
        if (file != undefined){
            const maxSize = 2*1024*1024
            if (file.size>maxSize){
                alert("File size exceeds 2MB. Please select a smaller file");
                return
            }
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
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            setFormErrors(errors)
        }
        else{
            setUpdateProfile(!updateProfile)
            setFormOpen("false")
        }
    }
    function handleBioChange(e){
        setBio(e.target.value)
    }
    function handleFileChange(e){
        setFile(e.target.files[0])
    }
    return (
        <><h2>Update Profile</h2><form onSubmit={handleSubmit} encType="multipart/form-data" className="updateProfile">
            <div className="bio">
                <label htmlFor="bio">Bio:</label>
                <textarea name="bio" id="bio" value={bio} onChange={handleBioChange} />
            </div>
            <div className="file">
                <label htmlFor="file">Profile Picture:</label>
                <input type="file" name="file" file={file} onChange={handleFileChange} accept="image/*" />
            </div>
            <button type="submit">Update</button>
            <Errors errors={formErrors} />
        </form></>

    )
}


