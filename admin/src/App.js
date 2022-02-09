import "./App.css";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import ManageCategory from "./pages/manageCategory/ManageCategory";
import ManageBrand from "./pages/manageBrand/ManageBrand";
import ManagePromotion from "./pages/managePromotion/ManagePromotion";
import NewPromotion from "./pages/managePromotion/NewPromotion";
import Login from "./pages/login/LogIn";
import Orders from "./pages/orders/Orders";
import ManageCredit from "./pages/manageCredit/ManageCredit";
import EditCredit from "./pages/manageCredit/EditCredit";
import SingleOrder from "./pages/orders/SingleOrder";
import ChangePassword from "./pages/user/ChangePassword";
import ForgotPassword from "./pages/login/ForgotPassword";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Topbar />
                <div className="container">
                    <Sidebar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" exact element={<Home />} />
                        <Route path="/profile/:userId" element={<User />} />
                        <Route
                            path="/changepassword/:userId"
                            element={<ChangePassword />}
                        />
                        <Route
                            path="/resetpassword"
                            element={<ForgotPassword />}
                        />
                        <Route path="/users" exact element={<UserList />} />
                        <Route path="/user/:userId" exact element={<User />} />
                        <Route path="/user/newuser" element={<NewUser />} />
                        <Route
                            path="/products"
                            exact
                            element={<ProductList />}
                        />
                        <Route
                            path="/product/:productId"
                            element={<Product />}
                        />
                        <Route
                            path="/product/newproduct"
                            element={<NewProduct />}
                        />
                        <Route
                            path="/product/managecategory"
                            element={<ManageCategory />}
                        />
                        <Route
                            path="/product/managebrand"
                            exact
                            element={<ManageBrand />}
                        />
                        <Route
                            path="/product/managepromotion"
                            element={<ManagePromotion />}
                        />
                        <Route
                            path="/product/newpromotion"
                            element={<NewPromotion />}
                        />
                        <Route path="/orders" element={<Orders />} />
                        <Route
                            path="/order/:orderId"
                            element={<SingleOrder />}
                        />
                        <Route path="/credits" element={<ManageCredit />} />
                        <Route
                            path="/credit/:creditId"
                            element={<EditCredit />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
