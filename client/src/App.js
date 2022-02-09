import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Menu from "./components/Products/Menu";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <div className={darkTheme ? "dark" : ""}>
            <div className="dark:bg-nightMode-dark dark:text-gray-200 min-h-screen">
                <BrowserRouter>
                    <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products/:cate" element={<Products />} />
                        <Route
                            path="/product/:id"
                            element={<SingleProduct />}
                        />
                        <Route
                            path="/changepassword/:userId"
                            element={<ChangePassword />}
                        />
                        <Route
                            path="/resetpassword"
                            element={<ForgotPassword />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/orders" element={<Order />} />
                        <Route path="/search" element={<Menu />} />
                        <Route path="/profile/:userId" element={<Profile />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
