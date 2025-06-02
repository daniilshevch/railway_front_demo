// TicketCard.jsx
import React from "react";
import "./TicketCard.css";

function TicketCard({ ticket }) {
    const formatTime = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formatDate = (iso) => new Date(iso).toLocaleDateString();

    return (
        <div className="ticket-card">
            <div className="ticket-header">
                <h3>Поїзд {ticket.train_route_id}</h3>
                <p>{ticket.full_route_starting_station_title} → {ticket.full_route_ending_station_title}</p>
            </div>
            <div className="ticket-body">
                <div><strong>Станції:</strong> {ticket.trip_starting_station_title} → {ticket.trip_ending_station_title}</div>
                <div><strong>Відправлення:</strong> {formatTime(ticket.departure_time)} {formatDate(ticket.departure_time)}</div>
                <div><strong>Прибуття:</strong> {formatTime(ticket.arrival_time)} {formatDate(ticket.arrival_time)}</div>
                <div><strong>Тривалість:</strong> {ticket.trip_duration}</div>
                <div><strong>Вагон:</strong> {ticket.carriage_position_in_squad} ({ticket.carriage_type}, клас {ticket.carriage_quality_class})</div>
                <div><strong>Місце:</strong> {ticket.place_in_carriage}</div>
                <div><strong>Пасажир:</strong> {ticket.passenger_name} {ticket.passenger_surname}</div>
                <div><strong>Статус:</strong> {ticket.ticket_status}</div>
            </div>
        </div>
    );
}

export default TicketCard;
