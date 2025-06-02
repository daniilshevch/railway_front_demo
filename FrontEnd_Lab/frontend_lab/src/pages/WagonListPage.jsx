import { useParams, useNavigate } from "react-router-dom";
import WagonCard from "../components/WagonCard";
import Navbar from "../components/Navbar";
import "./WagonListPage.css";
import backgroundImage from "../assets/carriage_background.png";

function WagonListPage() {
    const { type } = useParams();
    const navigate = useNavigate();

    const train = JSON.parse(localStorage.getItem("selected_train"));

    if (!train) {
        return <p>Дані поїзда не знайдені.</p>;
    }

    const wagons = train.carriage_statistics_list?.filter(
        (w) => w.carriage_type?.toLowerCase() === type.toLowerCase()
    );

    if (!wagons || wagons.length === 0) {
        return (
            <>
                <Navbar />
                <div className="wagon-list-page">
                    <h2 style={{ color: "white" }}>Немає вагонів типу {type}</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div
                className="wagon-list-page"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    minHeight: "100vh",
                    padding: "20px"
                }}
            >
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        marginBottom: "20px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    ← Назад до списку поїздів
                </button>

                <h1 style={{ color: "white" }}>Вагони типу: {type}</h1>
                <div className="wagon-list">
                    {wagons.map((wagon, idx) => (
                        <WagonCard
                            key={idx}
                            wagonNumber={wagon.carriage_position_in_squad}
                            wagonType={wagon.carriage_type}
                            places_availability_list={wagon.places_availability_list}
                            price={wagon.ticket_price}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default WagonListPage;
