import { Link,useNavigate} from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar"

function Message({message}) {
    const dateTime = new Date((Date.parse(message.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()
    console.log(message.author)
    return (
    
        <li key={message.id}>
            <ProfileAvatar profile={message.author.profile}/>
            <div className="name" >{message.author.first_name} {message.author.last_name}</div>
            <div className="time">{dayMonthYear} @ {time}</div>
            <div className="text">{message.text}</div>
        </li>
                    
    )

    
}

export default Message;