import { useEffect } from "react"


export default function recommend () {
    useEffect(() => {
        fetch()
        .then((res) => res.json())
        .them((data)=> data.json())
        .catch((error) => console.error("Database unable to load", error))
    }, []) 
    return (
        <div>

        </div>
    )
}