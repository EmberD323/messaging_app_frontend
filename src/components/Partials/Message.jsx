import ProfileAvatar from "./ProfileAvatar"

function Message({message,loggedInUser}) {
    //structure date and time
    //user =me
    let authorMessage = "false";
    if(message.author.id == loggedInUser.id){
        authorMessage = "true"
    }
    //if author = me, set id to author message, if not notauthormesage
    const dateTime = new Date((Date.parse(message.createdAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    let minutes = dateTime.getMinutes();
    if (minutes < 10){
        minutes = "0"+String(minutes)
    }
    const time = dateTime.getHours()+":"+minutes;
    //return message details
    if(message.author.id == loggedInUser.id){
        return(
        <div className="message" id="true">
            <div className="textAndTime">
                <div className="text">{message.text}</div>
                <div className="time">{dayMonthYear} @ {time}</div>
            </div>
            <ProfileAvatar profile={message.author.profile} />

        </div>
        )
    }
    return (        
        <div className="message" id="false">
            <ProfileAvatar profile={message.author.profile} />

                <div className="textAndTime">
                    <div className="text">{message.text}</div>
                    <div className="time">{dayMonthYear} @ {time}</div>
                </div>

        </div>                
    )
}

export default Message;