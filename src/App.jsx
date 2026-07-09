import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Player from "./pages/Player";
import Stories from "./pages/Stories";
import SpinWheel from "./pages/SpinWheel";
import FlipCards from "./pages/FlipCards";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <div className="w-full min-h-screen flex items-start justify-center font-sans">
      <div className="relative w-full h-full bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/spin" element={<SpinWheel />} />
          <Route path="/flip-cards" element={<FlipCards />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;