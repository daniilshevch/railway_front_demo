import "./TrainCard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function TrainCard({ train, from, to }) {
    const navigate = useNavigate();
    const [showSchedule, setShowSchedule] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const {
        train_route_id,
        train_route_branded_name,
        trip_starting_station_departure_time,
        trip_ending_station_arrival_time,
        trip_starting_station_title,
        trip_ending_station_title,
        total_trip_duration,
        full_route_starting_station_title,
        full_route_ending_station_title,
        free_platskart_places,
        free_coupe_places,
        free_sv_places,
        carriage_statistics_list = [],
        train_schedule = []
    } = train;

    useEffect(() => {
        if (showSchedule) {
            const handleScroll = () => setScrollY(window.scrollY);
            setScrollY(window.scrollY);
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [showSchedule]);

    const getPrice = (type) => {
        const prices = carriage_statistics_list
            .filter(c => c.carriage_type === type && c.ticket_price)
            .map(c => c.ticket_price);
        return prices.length > 0 ? Math.min(...prices) : "-";
    };

    const handleViewCarriages = (type) => {
        localStorage.setItem("selected_train", JSON.stringify(train));
        localStorage.setItem("search_from", from);
        localStorage.setItem("search_to", to);
        navigate(`/wagons/${type}?train=${train.train_race_id}`);
    };

    return (
        <div className="train-card">
            <div className="train-header">
                <div className="code">{train_route_id}</div>
                <div className="label">{train_route_branded_name}</div>
            </div>

            <div className="train-main">
                <div className="time-box">
                    <div className="time">{trip_starting_station_departure_time.split("T")[1].slice(0, 5)}</div>
                    <div className="date">{new Date(trip_starting_station_departure_time).toLocaleDateString()}</div>
                    <div className="station">{trip_starting_station_title}</div>
                </div>

                <div className="duration">{total_trip_duration}</div>

                <div className="time-box">
                    <div className="time">{trip_ending_station_arrival_time.split("T")[1].slice(0, 5)}</div>
                    <div className="date">{new Date(trip_ending_station_arrival_time).toLocaleDateString()}</div>
                    <div className="station">{trip_ending_station_title}</div>
                </div>
            </div>

            <div className="route-detail">
                🚂 {full_route_starting_station_title} ➔ {full_route_ending_station_title}
            </div>

            <div className="train-classes">
                <div className="class-block" onClick={() => handleViewCarriages("Platskart")}>
                    <div>Плацкарт</div>
                    <div>{free_platskart_places} місць</div>
                    <div>{getPrice("Platskart")} ₴</div>
                </div>
                <div className="class-block" onClick={() => handleViewCarriages("Coupe")}>
                    <div>Купе</div>
                    <div>{free_coupe_places} місць</div>
                    <div>{getPrice("Coupe")} ₴</div>
                </div>
                <div className="class-block" onClick={() => handleViewCarriages("SV")}>
                    <div>Люкс</div>
                    <div>{free_sv_places} місць</div>
                    <div>{getPrice("SV")} ₴</div>
                </div>
            </div>

            <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="schedule-toggle-button"
            >
                {showSchedule ? "Приховати розклад" : "Переглянути розклад"}
            </button>

            {showSchedule && (
                <>
                    <div
                        className="schedule-backdrop"
                        onClick={() => setShowSchedule(false)}
                    />
                    <div
                        className="schedule-panel"
                        style={{
                            position: "absolute",
                            top: scrollY,
                            left: "50%",
                            transform: "translateX(-50%)",
                            height: "90vh",
                            maxWidth: "800px",
                            width: "90%",
                            backgroundColor: "white",
                            overflowY: "auto",
                            zIndex: 1000,
                            padding: "20px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                            borderRadius: "8px"
                        }}
                    >
                        <button
                            className="schedule-close-button"
                            onClick={() => setShowSchedule(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                                background: "transparent",
                                border: "none",
                                fontSize: "24px",
                                fontWeight: "bold",
                                lineHeight: "1",
                                color: "#333",
                            }}
                        >
                            ×
                        </button>

                        <h2 style={{ marginBottom: "20px" }}>Розклад поїзда</h2>
                        <div className="schedule-header" style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", borderBottom: "1px solid #ccc", paddingBottom: "8px" }}>
                            <div style={{ flexBasis: "30%" }}>Станція</div>
                            <div style={{ flexBasis: "20%", textAlign: "center" }}>Прибуття</div>
                            <div style={{ flexBasis: "20%", textAlign: "center" }}>Відправлення</div>
                            <div style={{ flexBasis: "20%", textAlign: "center" }}>Стоянка</div>
                        </div>
                        {train_schedule.map((station, idx) => (
                            <div
                                key={idx}
                                className="schedule-item"
                                style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}
                            >
                                <div style={{ flexBasis: "30%" }}>{station.station_title}</div>
                                <div style={{ flexBasis: "20%", textAlign: "center" }}>{station.arrival_time?.slice(11, 16) || "-"}</div>
                                <div style={{ flexBasis: "20%", textAlign: "center" }}>{station.departure_time?.slice(11, 16) || "-"}</div>
                                <div style={{ flexBasis: "20%", textAlign: "center" }}>{station.stop_duration || "-"}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default TrainCard;
