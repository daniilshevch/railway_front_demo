import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import backgroundImage from "../assets/login2.jpg";

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("https://localhost:7230/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) throw new Error("Невірна пошта або пароль");

            const data = await response.json();
            const token = data.token;
            localStorage.setItem("token", token);

            const payload = parseJwt(token);
            if (payload && payload.unique_name) {
                localStorage.setItem("username", payload.unique_name);
            }

            navigate("/");
        } catch (err) {
            setError(err.message || "Помилка входу");
        }
    };

    return (
        <div
            className="login-background"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="login-wrapper">
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Вхід</h2>
                    <input
                        type="text"
                        placeholder="Пошта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Увійти</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
