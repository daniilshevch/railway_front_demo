import "./WagonCard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from "react";

function WagonCard({ wagonNumber, wagonType, places_availability_list, price }) {
    const navigate = useNavigate();
    const [seats, setSeats] = useState(places_availability_list);

    const train = JSON.parse(localStorage.getItem("selected_train"));
    const from = localStorage.getItem("search_from");
    const to = localStorage.getItem("search_to");

    useEffect(() => {
        const socket = new WebSocket("wss://localhost:7230/ws/seat-status");

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.train_route_id === train.train_race_id && data.carriage_position === wagonNumber) {
                setSeats(prev => prev.map(seat =>
                    seat.place_in_carriage === data.place_in_carriage
                        ? { ...seat, is_free: data.is_free }
                        : seat
                ));
            }
        };

        return () => socket.close();
    }, [train.train_race_id, wagonNumber]);

    const getSeatStyle = (seat) => seat.is_free ? "seat available" : "seat booked";

    const handleSeatClick = async (placeNumber) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        if (!train || !from || !to) return;

        const body = {
            train_route_on_date_id: train.train_race_id,
            passenger_carriage_position_in_squad: wagonNumber,
            starting_station_title: from,
            ending_station_title: to,
            place_in_carriage: placeNumber
        };
        localStorage.setItem("price", price);

        const response = await fetch("https://localhost:7230/Client-API/CompleteTicketBooking/Initialize-Ticket-Booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        localStorage.setItem("ticket_booking_dto", JSON.stringify(data));

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        navigate("/booking");
    };

    const renderCoupeLayout = () => {
        const groups = [];
        for (let i = 0; i < seats.length; i += 4) {
            groups.push(seats.slice(i, i + 4));
        }
        return (
            <div className="coupe-layout">
                {groups.map((group, idx) => (
                    <div key={idx} className="coupe-group">
                        <div className="column">
                            {group[0] && <button className={getSeatStyle(group[0])} disabled={!group[0].is_free} onClick={() => handleSeatClick(group[0].place_in_carriage)}>{group[0].place_in_carriage}</button>}
                            {group[1] && <button className={getSeatStyle(group[1])} disabled={!group[1].is_free} onClick={() => handleSeatClick(group[1].place_in_carriage)}>{group[1].place_in_carriage}</button>}
                        </div>
                        <div className="column">
                            {group[2] && <button className={getSeatStyle(group[2])} disabled={!group[2].is_free} onClick={() => handleSeatClick(group[2].place_in_carriage)}>{group[2].place_in_carriage}</button>}
                            {group[3] && <button className={getSeatStyle(group[3])} disabled={!group[3].is_free} onClick={() => handleSeatClick(group[3].place_in_carriage)}>{group[3].place_in_carriage}</button>}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderSvLayout = () => {
        const groups = [];
        for (let i = 0; i < seats.length; i += 2) {
            groups.push(seats.slice(i, i + 2));
        }
        return (
            <div className="sv-layout">
                {groups.map((group, idx) => (
                    <React.Fragment key={idx}>
                        <div className="sv-group">
                            {group.map((seat, i) => (
                                <button
                                    key={seat.place_in_carriage}
                                    className={getSeatStyle(seat)}
                                    disabled={!seat.is_free}
                                    onClick={() => handleSeatClick(seat.place_in_carriage)}
                                    style={{ marginRight: i === 0 && group.length === 2 ? '12px' : '0' }}
                                >
                                    {seat.place_in_carriage}
                                </button>
                            ))}
                        </div>
                        {idx !== groups.length - 1 && <div className="sv-divider" />}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    const renderDefaultLayout = () => (
        <div className="default-seat-grid">
            {seats.map((seat, idx) => (
                <button
                    key={idx}
                    className={getSeatStyle(seat)}
                    disabled={!seat.is_free}
                    onClick={() => handleSeatClick(seat.place_in_carriage)}
                >
                    {seat.place_in_carriage}
                </button>
            ))}
        </div>
    );

    return (
        <div className="wagon-card">
            <h2>Вагон {wagonNumber}</h2>
            <p>Тип: {wagonType}</p>
            <p>Місць: {seats.length}</p>
            <p>Ціна: {price} грн</p>
            <div className="seats-wrapper">
                {wagonType.toLowerCase() === "coupe"
                    ? renderCoupeLayout()
                    : wagonType.toLowerCase() === "sv"
                        ? renderSvLayout()
                        : renderDefaultLayout()}
            </div>
        </div>
    );
}

export default WagonCard;
