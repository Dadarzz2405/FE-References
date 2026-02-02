import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/pages/HomePage/HomePage";
import LiveScores from "./components/pages/LiveScores/LiveScores";
import Announcements from "./components/pages/Announcements/Announcements";
import Login from "./components/pages/Login/Login";
import NotFound from "./pages/NotFound";

const App = () => {
  const [activatedPage, setActivatedPage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setActivatedPage(path);
  }, [location]);

  // Don't show navbar on login page
  const showNavbar = location.pathname !== "/login";

  return (
    <>
      {showNavbar && <Navbar activatedPage={activatedPage} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/livescores" element={<LiveScores />} />
        <Route path="/announcement" element={<Announcements />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
