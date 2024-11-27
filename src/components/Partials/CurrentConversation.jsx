import Message from "./Message"
import NewMessage from "./NewMessage"

function CurrentConversation({selectedConversation,selectedConversationPerson,setSelectedConversation}) {
    //wait for conversation to be selected
    if(selectedConversation == null) return;
    //return all messages
    return (
        <div className="currentConversation">
            <ul>
                {selectedConversation.map((message) => {
                    return(
                        <Message message={message}></Message>
                    )
                })}
            </ul>
            <NewMessage selectedConversationPerson={selectedConversationPerson} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation}/> 
        </div>
    )
}

export default CurrentConversation;