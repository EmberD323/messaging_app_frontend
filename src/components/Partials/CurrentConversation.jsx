import { Link,useNavigate} from "react-router-dom";

function NavBar({seletedConversation}) {
    if(seletedConversation == null) return;
    console.log(seletedConversation)

    return (
        <ul>
                    {seletedConversation.map((message) => {
                        return(
                        <li key={message.id}>
                            <div className="name" >{message.author.first_name} {message.author.last_name}</div>
                            <div className="time">{message.createdAt}</div>
                            <div className="text">{message.text}</div>
                        </li>)
                    })}
                </ul>
    )

    
}

export default NavBar;