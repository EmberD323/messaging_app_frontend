export default function ProfileAvatar ({profile,handleConversationOpen}){
    let myStyle1={
        backgroundImage: "url('https://rrkiqsthcekarglxlxcn.supabase.co/storage/v1/object/public/profile_pics/noprofile.png?t=2024-11-26T20%3A52%3A39.165Z')",
        cursor:"grab"
    };
    if(profile == null){
      
       return( <div className="avatar" 
        style={myStyle1}>
        </div>)
    }
    if(profile.pictureURL == null){
        return( <div className="avatar" 
            style={myStyle1}>
            </div>)
    }

    let myStyle2={
        backgroundImage: "url('"+profile.pictureURL+"')",
        cursor:"grab"
    };

    return (
        <div className="avatar" 
                style={myStyle2}>
        </div>

    )
}


