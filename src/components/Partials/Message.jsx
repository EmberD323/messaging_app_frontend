import { Link,useNavigate} from "react-router-dom";

function Message({message}) {
    const dateTime = new Date((Date.parse(message.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()
    return (
    
        <li key={message.id}>
            <div className="name" >{message.author.first_name} {message.author.last_name}</div>
            <div className="time">{dayMonthYear} @ {time}</div>
            <div className="text">{message.text}</div>
        </li>
                    
    )

    
}

export default Message;