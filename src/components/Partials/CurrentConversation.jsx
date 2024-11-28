import Message from "./Message"
import NewMessage from "./NewMessage"
import { Link} from "react-router-dom";
import { useState, useEffect } from 'react';

function CurrentConversation({loggedInUser,selectedConversation,selectedConversationPerson,setSelectedConversation}) {
    //wait for conversation to be selected
    
    if(selectedConversation == null) return;
    //scroll to bottom of messages on load
    useEffect(() => {
        const objDiv = document.querySelector(".scrollConvo");
        if(objDiv == null)return;
        objDiv.scrollTop = objDiv.scrollHeight;
     });
     
    //return all messages
    return (
        <div className="currentConversation">
            <Link to={"../profile/"+selectedConversationPerson.id}>{selectedConversationPerson.first_name} {selectedConversationPerson.last_name}</Link>
            <ul className="scrollConvo" >
                {selectedConversation.map((message) => {
                    return(
                        <li key={message.id}>
                            <Message message={message} loggedInUser={loggedInUser}></Message>
                        </li> 
                    )
                })}
            </ul>
            <NewMessage selectedConversationPerson={selectedConversationPerson} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation}/> 
        </div>
    )
}

export default CurrentConversation;