import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Massages from "./pages/Massages";
import Reservation from "./pages/Reservation";
import Booking from "./pages/Booking";
import MassageDetenteProfonde from "./pages/MassageDetenteProfonde";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/massages" element={<Massages />} />
            <Route path="/massage-detente-profonde" element={<MassageDetenteProfonde />} />
            <Route path="/reservation" element={<Booking />} />
            <Route path="/contact" element={<Reservation />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
