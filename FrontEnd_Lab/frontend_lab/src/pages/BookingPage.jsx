import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingPage.css";
import backgroundImage from "../assets/booking.jpg";

function BookingPage() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();

    const ticket = JSON.parse(localStorage.getItem("ticket_booking_dto"));
    const token = localStorage.getItem("token");
    const price = localStorage.getItem("price")
    const train = JSON.parse(localStorage.getItem("selected_train"));

    if (!ticket) {
        return <p>Дані бронювання не знайдені.</p>;
    }

    const handleSubmit = async () => {
        const body = {
            ticket_booking_dto: ticket,
            user_info_dto: {
                passenger_name: name,
                passenger_surname: surname
            }
        };

        try {
            const response = await fetch("https://localhost:7230/Client-API/CompleteTicketBooking/Complete-Ticket-Booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error("Помилка підтвердження бронювання");

            navigate("/booking-success");
        } catch (err) {
            alert("Помилка: " + err.message);
        }
    };

    return (
        <div
            className="booking-page"
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
            <div className="booking-form">
                <h1>Завершення бронювання</h1>
                <h2>Поїзд: {train.train_route_id}</h2>
                <h5>Відправлення: {ticket.starting_station_title}, Прибуття {ticket.ending_station_title}</h5>
                <h3>Вагон {ticket.passenger_carrriage_position_in_squad}, місце {ticket.place_in_carriage}</h3>
                <h4>Ціна {price} грн</h4>
                <label>
                    Ім'я пасажира:<br />
                    <input value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Прізвище пасажира:<br />
                    <input value={surname} onChange={e => setSurname(e.target.value)} />
                </label>
                <button onClick={() => navigate(-1)} className="back-button">Назад</button>
                <button onClick={handleSubmit}>Підтвердити</button>
            </div>
        </div>
    );
}

export default BookingPage;
