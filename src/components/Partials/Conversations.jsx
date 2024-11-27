import { Link} from "react-router-dom";
import { useState} from "react";
import CurrentConversation from "./CurrentConversation"
import ProfileAvatar from "./ProfileAvatar"
import NewConversation from "./NewConversation"

function Conversations({receivedMessages,sentMessages}) {
    //wait until messages loaded
    if(receivedMessages == null || sentMessages == null ){return}
    const [selectedConversation,setSelectedConversation]=useState(null);
    const [selectedConversationPerson,setSelectedConversationPerson]=useState(null);
    
    //all people user has had conversations with
    const authors = receivedMessages.map((message) =>message.author);
    const receivers = sentMessages.map((message) =>message.receiver);

    //get only unique users
    let setObj = new Set(authors.map(JSON.stringify));
    let conversationsWith = Array.from(setObj).map(JSON.parse);
    receivers.map((reciever =>{
        const found = conversationsWith.some(el => el.id === reciever.id);
        if (!found) conversationsWith.push(reciever);
        return found;
    } ));

    //conversation selected, show messages
    function handleConversationOpen(e,newUser){
        const conversationPersonID = e.target.parentNode.id;
        let thisConversationPerson = conversationsWith.filter((person) =>person.id == conversationPersonID);
        //if this is a new conversation
        if(thisConversationPerson[0] == undefined){
            //return user
            thisConversationPerson = newUser;
            setSelectedConversationPerson(thisConversationPerson)
        }
        else{
            setSelectedConversationPerson(thisConversationPerson[0])
        }
        const receivedMessagesInThisConvo = receivedMessages.filter((message) =>message.author.id == conversationPersonID);
        const sentMessagesInThisConvo = sentMessages.filter((message) =>message.receiver.id == conversationPersonID);
        const allMessagesInThisConvo = receivedMessagesInThisConvo.concat(sentMessagesInThisConvo);
        const sortedMessages = allMessagesInThisConvo.sort((a, b) => a.id-b.id);
        setSelectedConversation(sortedMessages);
    }
  
    return(
        <div className="conversations">
            <div className="conversationCards">
                <h2>Conversations</h2>
                <NewConversation handleConversationOpen={handleConversationOpen}/>  
                <ul>
                    {conversationsWith.map((author) => {
                        return(
                            <li key={author.id} id={author.id} onClick={handleConversationOpen} style={{cursor:"grab"}}>
                                <ProfileAvatar profile={author.profile}/>
                                <div className="name" >{author.first_name} {author.last_name}</div>
                                <Link to={"../profile/"+author.id}>Profile</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <CurrentConversation selectedConversation={selectedConversation} selectedConversationPerson={selectedConversationPerson} setSelectedConversation={setSelectedConversation}/> 
        </div>
    )
}

export default Conversations;