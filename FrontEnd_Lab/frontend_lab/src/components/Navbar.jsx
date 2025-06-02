import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function parseJwt(token) {
    try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    } catch (e) {
        return null;
    }
}

function Navbar() {
    const token = localStorage.getItem("token");
    const username = token ? parseJwt(token) : null;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="nav-btn">ПОШУК КВИТКІВ</Link>
                <Link to="/map" className="nav-btn">КАРТА</Link>
                <Link to="/user-tickets" className="nav-btn">МОЇ КВИТКИ</Link>
            </div>
            <div className="nav-right">
                {token ? (
                    <button className="nav-btn user-btn" onClick={handleLogout}>
                        {username ? `Профіль (${username})` : "Користувач"}
                    </button>
                ) : (
                    <Link to="/login" className="nav-btn">Увійти</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
