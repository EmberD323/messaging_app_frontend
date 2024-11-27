import ProfileAvatar from "./ProfileAvatar"

function Message({message}) {
    //structure date and time
    const dateTime = new Date((Date.parse(message.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()
    //return message details
    return (
            <>
            <ProfileAvatar profile={message.author.profile} />
            <div className="name">{message.author.first_name} {message.author.last_name}</div>
            <div className="time">{dayMonthYear} @ {time}</div><div className="text">{message.text}</div>
            </>     
    )
}

export default Message;