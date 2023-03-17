import LandingPage from "./components/landingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import HomePage from "./components/HomePage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;