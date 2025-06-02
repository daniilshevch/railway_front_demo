import { useState } from "react";
import "./TrainSearchForm.css";
import { useNavigate } from "react-router-dom";

function TrainSearchForm() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams({
            from: start,
            to: end,
            date: date
        });

        navigate(`/results?${params.toString()}`);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="Станція відправлення"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Станція прибуття"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">Пошук</button>
            </form>
        </div>
    );
}

export default TrainSearchForm;
