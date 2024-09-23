import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
// import { Transfer } from "./pages/Transfer";
import { Dashboard } from "./pages/Dashboard";
import { Send } from "./pages/Send";
import ParticlesComponent from "./components/Particles"

function App() {
  return (
    <div className="relative">
      {/* Particles component in the background */}
      <ParticlesComponent className="absolute top-0 left-0 w-full h-full z-0" id="particles" />
      

      {/* Content with higher z-index */}
      <div className="relative z-1">
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<Send />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
