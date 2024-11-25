import { Link,useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import CurrentConversation from "./CurrentConversation"


function Conversations({receivedMessages,sentMessages}) {
    if(receivedMessages == null || sentMessages == null ){return}
    const [seletedConversation,setSeletedConversation]=useState(null);

    const authors = receivedMessages.map((message) =>message.author);
    const receivers = sentMessages.map((message) =>message.receiver);
    //get unique authors
    let setObj = new Set(authors.map(JSON.stringify));
    let conversationsWith = Array.from(setObj).map(JSON.parse);
    //add unique recievers
    receivers.map((reciever =>{
        const found = conversationsWith.some(el => el.id === reciever.id);
        if (!found) conversationsWith.push(reciever);
        return found;
    } ));
    function handleConversationOpen(e){
        console.log(e.target.id)
        const conversationPerson = e.target.id;
        const receivedMessagesInThisConvo = receivedMessages.filter((message) =>message.author.id == conversationPerson);
        const sentMessagesInThisConvo = sentMessages.filter((message) =>message.receiver.id == conversationPerson);
        const allMessagesInThisConvo = receivedMessagesInThisConvo.concat(sentMessagesInThisConvo);
        const sortedMessages = allMessagesInThisConvo.sort((a, b) => a.id-b.id);
        setSeletedConversation(sortedMessages);
    }
    return(
        <div className="conversations">
            
            <div className="conversationCards">
                <h2>Conversations</h2>  
                <ul>
                    {conversationsWith.map((author) => {
                        return(
                        <li key={author.id} onClick={handleConversationOpen} style={{cursor:"grab"}}>
                            <div className="name" id={author.id}>{author.first_name} {author.last_name}</div>
                            <div className="picture"></div>
                        </li>)
                    })}
                </ul>
            </div>
            <CurrentConversation seletedConversation={seletedConversation}/> 

            
        </div>
    )
}

export default Conversations;