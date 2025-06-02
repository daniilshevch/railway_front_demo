import { useState, useEffect } from "react";
import "./ImageCarousel.css";

import img1 from "../assets/background1.jpg";
import img2 from "../assets/background2.jpg";
import img3 from "../assets/background3.jpg";
import img4 from "../assets/background4.jpg";
import img5 from "../assets/background5.jpg";

const images = [img1, img5, img2, img3, img4];


function ImageCarousel({ interval = 5000 }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);
        return () => clearInterval(id);
    }, [interval]);

    return (
        <div className="carousel">
            <img src={images[index]} alt={`slide ${index}`} />
        </div>
    );
}

export default ImageCarousel;
