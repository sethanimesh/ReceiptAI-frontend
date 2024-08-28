import { useState } from "react";

export default function RegisterComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmPassword state
    const [email, setEmail] = useState("");
    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const [showErrorMessage, setErrorMessage] = useState(false);
    const [errorMessage, setErrorMessageText] = useState(""); // Added to display error message

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event) { 
        setConfirmPassword(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handleSubmit() {
        if (password !== confirmPassword) { 
            setErrorMessage(true);
            setSuccessMessage(false);
            setErrorMessageText("Passwords do not match");
            return;
        }

        const registrationRequest = {
            username: username,
            password: password,
            confirmPassword: confirmPassword, 
            email: email
        };

        fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationRequest)
        })
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                setSuccessMessage(true);
                setErrorMessage(false);
            } else {
                setSuccessMessage(false);
                setErrorMessage(true);
                setErrorMessageText("Registration failed. " + (data.message || "Please try again."));
            }
        })
        .catch(error => {
            setSuccessMessage(false);
            setErrorMessage(true);
            setErrorMessageText("Error: " + error.message);
            console.error('Error:', error);
        });
    }

    function SuccessMessageComponent() {
        if (showSuccessMessage) {
            return <div className="successMessage">Registration Successful</div>;
        }
        return null;
    }

    function ErrorMessageComponent() {
        if (showErrorMessage) {
            return <div className="errorMessage">{errorMessage}</div>;
        }
        return null;
    }

    return (
        <div className="Register">
            <div className="RegisterForm">
                <div>
                    <SuccessMessageComponent />
                    <ErrorMessageComponent />
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <label>Confirm Password</label> {/* Added confirmPassword input */}
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <button type="button" name="register" onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    );
}