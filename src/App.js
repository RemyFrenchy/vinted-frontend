import "./App.css";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Offer from "./pages/Offer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

import Header from "./components/Header";

const App = () => {
  const [token, setToken] = useState(Cookies.get("userToken" || null));

  const setUser = (token) => {
    if (token !== null) {
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }

    setToken(token);
  };
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Header />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer token={token} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/payment" element={<Payment token={token} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
