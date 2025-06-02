import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TrainCard from "../components/TrainCard";
import backgroundImage from "../assets/train_result_background.jpg";
import "./TrainResults.css";
import DateSelector from "../components/DateSelector";
import Navbar from "../components/Navbar";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function TrainResults() {
    const query = useQuery();
    const navigate = useNavigate();
    const from = query.get("from");
    const to = query.get("to");
    const date = query.get("date");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!from || !to || !date) return;

        fetch(`https://localhost:7230/ClientAPI/TrainSearch/Search-Train-Routes-Between-Stations-With-Bookings/${from}/${to}?departure_date=${date}`)
            .then(res => {
                if (!res.ok) throw new Error("Помилка запиту до сервера");
                return res.json();
            })
            .then(data => {
                setResults(data);
                localStorage.setItem("lastSearchResults", JSON.stringify(data));
            })
            .catch(err => setError(err.message));
    }, [from, to, date]);

    const handleDateSelect = (newDate) => {
        navigate(`/results?from=${from}&to=${to}&date=${newDate}`);
    };

    const handleClassClick = (type, train) => {
        localStorage.setItem("selected_train", JSON.stringify(train));
        localStorage.setItem("search_from", from);
        localStorage.setItem("search_to", to);
        navigate(`/wagons/${type}`);
    };

    return (
        <div
            className="train-results-container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Navbar />
            <div className="train-results-scroll-area">
                <div className="results-wrapper">
                    <div className="results-header">
                        <h1>Результати пошуку</h1>
                        <DateSelector from={from} to={to} currentDate={date} onSelect={handleDateSelect} />
                    </div>
                    {error && <div className="error">{error}</div>}
                    {results.length > 0 ? (
                        results.map((train, index) => (
                            <TrainCard
                                key={index}
                                train={train}
                                from={from}
                                to={to}
                                onClassClick={(type) => handleClassClick(type, train)}
                            />
                        ))
                    ) : (
                        <p>Не вдалося знайти поїзди за цим маршрутом в цю дату.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrainResults;
