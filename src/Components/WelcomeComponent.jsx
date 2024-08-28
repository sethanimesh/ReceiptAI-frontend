import { useParams } from "react-router-dom"

export default function WelcomeComponent(){

    const {username} = useParams();

    return (
        <div>Welcome, {username}</div>
    )
}