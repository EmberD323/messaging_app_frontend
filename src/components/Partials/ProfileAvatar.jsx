export default function ProfileAvatar ({profile}){
    if(profile == null){
        return <img src="https://rrkiqsthcekarglxlxcn.supabase.co/storage/v1/object/public/profile_pics/noprofile.png?t=2024-11-26T20%3A52%3A39.165Z" alt="profile_pic" class="avatar"/>
    }
    if(profile.pictureURL == null){
        return <img src="https://rrkiqsthcekarglxlxcn.supabase.co/storage/v1/object/public/profile_pics/noprofile.png?t=2024-11-26T20%3A52%3A39.165Z" alt="profile_pic" class="avatar"/>
    }
    return (
        <img src={profile.pictureURL} alt="profile_pic" class="avatar"/>

    )
}


