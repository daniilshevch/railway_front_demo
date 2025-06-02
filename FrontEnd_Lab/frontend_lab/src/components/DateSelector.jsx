import { useNavigate } from "react-router-dom";
import "./DateSelector.css";

function DateSelector({ from, to, currentDate }) {
    if (!from || !to || !currentDate || isNaN(new Date(currentDate))) {
        console.warn("DateSelector не рендериться: некоректні вхідні дані", { from, to, currentDate });
        return null;
    }

    const navigate = useNavigate();
    const current = new Date(currentDate);

    const dates = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(current);
        date.setDate(current.getDate() - 2 + i);
        return date;
    });

    const formatDateDisplay = (date) => {
        return date.toLocaleDateString("uk-UA", { day: "2-digit", month: "short", weekday: "short" });
    };

    const formatDateParam = (date) => {
        return date.toISOString().split("T")[0]; 
    };

    const isActive = (date) => {
        return formatDateParam(date) === currentDate;
    };

    const handleSelect = (date) => {
        const newDate = formatDateParam(date);
        navigate(`/results?from=${from}&to=${to}&date=${newDate}`);
    };

    return (
        <div className="date-selector">
            {dates.map((date, index) => (
                <button
                    key={index}
                    className={`date-button ${isActive(date) ? "active" : ""}`}
                    onClick={() => handleSelect(date)}
                >
                    {formatDateDisplay(date)}
                </button>
            ))}
        </div>
    );
}

export default DateSelector;
