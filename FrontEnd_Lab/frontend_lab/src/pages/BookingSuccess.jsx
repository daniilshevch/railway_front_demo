import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookingSuccess.css";
import backgroundImage from "../assets/success.jpg";

function BookingSuccess() {
    const navigate = useNavigate();

    return (
        <div
            className="booking-success-page"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div className="booking-success-content">
                <h1>Квиток успішно заброньовано!</h1>
                <div className="success-buttons">
                    <button onClick={() => navigate("/")}>На головну</button>
                    <button onClick={() => navigate("/user-tickets")}>Мої квитки</button>
                </div>
            </div>
        </div>
    );
}

export default BookingSuccess;
