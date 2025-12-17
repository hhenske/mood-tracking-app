import { useState } from 'react';
import AuthCard from "../components/auth/AuthCard.jsx";

export default function AuthPage({ onAuthSuccess }) {
    const [mode, setMode] = useState("login");
    

    const handleSubmit = ({ email, password }) => {
        console.log("Auth submit:", mode, email, password);
        console.log("about to call onAuthSuccess with mode: ", mode)

        // STUB SUCCESS (becomes Supabase / API call)
        onAuthSuccess(mode)
    };

    const toggleMode = () => {
        setMode(prev => (prev === "signup" ? "login" : "signup"));
    };
    
    return (
        <AuthCard
            mode={mode}
            onSubmit={handleSubmit}
            onToggleMode={toggleMode}
        />
    );

}