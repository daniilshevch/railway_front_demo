import TrainSearchForm from '../components/TrainSearchForm';
import './HomePage.css';
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";
function HomePage() {
    return (
        <div className="homepage">

            <Navbar />
            <ImageCarousel interval={7000} />
            <div className="content-wrapper">
                <h1>ПОШУК КВИТКІВ</h1>
                <TrainSearchForm />
            </div>
        </div>
    );
}

export default HomePage;
