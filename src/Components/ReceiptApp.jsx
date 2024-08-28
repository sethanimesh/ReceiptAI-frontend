import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import RegisterComponent from "./RegisterComponent";
import AuthProvider, { useAuth } from "./AuthContext";

function AuthenticatedRoute({children}){
    const authContext = useAuth()

    if (authContext.isAuthenticated){
        return children
    }

    return <Navigate to="/login"/>
}

export default function ReceiptApp(){
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/register" element={<RegisterComponent/>}></Route>
                        <Route path="/" element={<LoginComponent/>}></Route>
                        <Route path="/login" element={<LoginComponent/>}></Route>
                        <Route path="/welcome/:username" element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path="*" element={<ErrorComponent/>}></Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}