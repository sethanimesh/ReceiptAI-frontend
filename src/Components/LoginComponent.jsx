import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext";

export default function LoginComponent() {

    const navigate = useNavigate();

    const authContext = useAuth();

    const [username, setUsername] = useState("sethanimesh"); // Use email if your backend expects email
    const [password, setPassword] = useState("");

    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const [showErrorMessage, setErrorMessage] = useState(false);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit() {
        const loginRequest = {
            email: username, 
            password: password
        };

        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) { 
                authContext.setAuthenticated(true);
                setSuccessMessage(true);
                setErrorMessage(false);
                navigate(`/welcome/${username}`);
            } else {
                authContext.setAuthenticated(false);
                setSuccessMessage(false);
                setErrorMessage(true);
            }
        })
        .catch(error => {
            setSuccessMessage(false);
            setErrorMessage(true);
            console.error('Error:', error);
        });
    }

    function SuccessMessageComponent() {
        if (showSuccessMessage) {
            return (
                <div className="successMessage">Authenticated Successfully</div>
            );
        }
        return null;
    }

    function ErrorMessageComponent() {
        if (showErrorMessage) {
            return (
                <div className="errorMessage">Authentication Failed</div>
            );
        }
        return null;
    }

    return (
        <div className="Login">
            <div className="LoginForm">
                <div>
                    <SuccessMessageComponent/>
                    <ErrorMessageComponent/>
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );
}