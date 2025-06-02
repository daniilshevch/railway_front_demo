import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from "./pages/LoginPage";
import TrainResults from "./pages/TrainResults";
import WagonListPage from './pages/WagonListPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import BookingSuccess from './pages/BookingSuccess.jsx';
import UserTicketsPage from './pages/UserTicketsPage.jsx';
import FullScreenImage from './pages/MapPage.jsx';
function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/results" element={<TrainResults />} />
            <Route path="/wagons/:type" element={<WagonListPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/user-tickets" element={<UserTicketsPage />} />
            <Route path="/map" element={<FullScreenImage />} />
        </Routes>
    );
}

export default App;