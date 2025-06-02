import React from "react";
import Navbar from "../components/Navbar"; 
import map from '../assets/map.png'; 

const FullScreenImage = () => {
    return (
        <div>
            {}
            <Navbar />
            {}
            <div style={{
                height: '140vh', 
                width: '100vw',   
                backgroundImage: `url(${map})`,  
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                paddingTop: '60px',  
            }}>
                {}
            </div>
        </div>
    );
};

export default FullScreenImage;
