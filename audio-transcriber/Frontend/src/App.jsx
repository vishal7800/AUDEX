
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import AudioUploader from "./AudioUploader";  // will contain upload + transcription
import Signup from "./components/Signup";
import Login from "./components/Login";
import Admin from "./pages/Admin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<AudioUploader />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;