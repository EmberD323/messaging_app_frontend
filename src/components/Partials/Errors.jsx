export default function Errors ({errors}){
    if(errors == null){
        return
    }
    return (
        <p className="errorList">
            <ul >
                {errors.map((error) => {
                    return <li key={crypto.randomUUID()}>{error.msg}</li>
                })}
            </ul>
        </p>
    )
}


