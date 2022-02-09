import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LogIn";
import ChangePassword from "./pages/ChangePassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/resetpassword" element={<ForgotPassword />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                    <Route
                        path="/changepassword/:userId"
                        element={<ChangePassword />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
