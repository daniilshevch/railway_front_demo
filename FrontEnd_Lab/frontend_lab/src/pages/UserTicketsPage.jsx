import React, { useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/user_tickets.jpg";
import "./UserTicketsPage.css";

function UserTicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("https://localhost:7230/get-tickets-for-user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Помилка завантаження квитків");
                return res.json();
            })
            .then((data) => setTickets(data))
            .catch((err) => setError(err.message));
    }, []);

    return (
        <div className="user-tickets-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Navbar />
            <div className="ticket-content">
                <h1 className="tickets-header">Ваші квитки</h1>
                <div className="ticket-grid">
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        tickets.map(ticket => (
                            <TicketCard key={ticket.full_ticket_id} ticket={ticket} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserTicketsPage;
