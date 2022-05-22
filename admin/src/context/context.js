import axios from "axios";
import React, { useContext, useState, useEffect, useRef } from "react";
import { useAlert } from "react-alert";

const AppContext = React.createContext();

function AppProvider({ children }) {
    const [brands, setBrands] = useState([]);
    const [categories, setCategory] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [laptops, setLaptops] = useState([]);
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState({});
    const orders = useRef();
    // const alert = useAlert();
    const [credits, setCredits] = useState([]);

    const checkLogin = () => {
        if (
            !(
                document.cookie &&
                document.cookie
                    .split("; ")
                    .find((item) => item.includes("doubleKToken"))
                    .split("=")[1] !== "" &&
                localStorage.roles &&
                localStorage.roles.includes("ROLE_ADMIN")
            )
        ) {
            document.cookie = `doubleKToken=;expires=${new Date(
                new Date().setFullYear() - 100
            ).toUTCString()};Secure`;
            localStorage.removeItem("id");
            localStorage.removeItem("username");
            localStorage.removeItem("roles");
            localStorage.removeItem("email");
            localStorage.removeItem("imageUser");
            return false;
        }

        return true;
    };

    const logOut = () => {
        document.cookie = `doubleKToken=;expires=${new Date(
            new Date().setFullYear() - 100
        ).toUTCString()};Secure`;
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("roles");
        localStorage.removeItem("email");
        localStorage.removeItem("imageUser");
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const formatCreditNumber = (num) => {
        return num.match(new RegExp(".{1,4}", "g")).join("-");
    };

    const fetchBrands = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/brand/all",
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((item) => item.includes("doubleKToken"))
                        .split("=")[1],
                },
            }
        );

        if (res.data) {
            setBrands(res.data);
        } else {
            setBrands([]);
        }
    };

    const fetchCategory = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/category/all",
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((item) => item.includes("doubleKToken"))
                        .split("=")[1],
                },
            }
        );

        if (res.data) {
            setCategory(res.data);
        } else {
            setCategory([]);
        }
    };

    const fetchPromotions = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/promotion/all",
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((item) => item.includes("doubleKToken"))
                        .split("=")[1],
                },
            }
        );

        if (res.data) {
            setPromotions(res.data);
        } else {
            setPromotions([]);
        }
    };

    const fetchLaptops = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/product/all",
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((item) => item.includes("doubleKToken"))
                        .split("=")[1],
                },
            }
        );

        if (res.data) {
            setLaptops(res.data);
        } else {
            setLaptops([]);
        }
    };

    const fetchUsers = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/user/all",
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((item) => item.includes("doubleKToken"))
                        .split("=")[1],
                },
            }
        );

        if (res.data) {
            setUsers(res.data);
        } else {
            setUsers([]);
        }
    };

    const fetchOrders = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/order/all",
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((item) => item.includes("doubleKToken"))
                        .split("=")[1],
                },
            }
        );

        if (res.data) {
            if (res.data.length > orders.current?.length){
                alert("New Order !")
            }
            orders.current =res.data
        } else {
            orders.current = []
        }
    };

    const fetchCredits = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/credit/all",
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((item) => item.includes("doubleKToken"))
                        .split("=")[1],
                },
            }
        );

        if (res.data) {
            setCredits(res.data);
        } else {
            setCredits([]);
        }
    };

    useEffect(() => {
        if (checkLogin()) {
            fetchBrands();
            fetchCredits();
            fetchCategory();
            fetchPromotions();
            fetchLaptops();
            fetchOrders();
        }
    }, [laptops]);

    useEffect(() => {
        if (
            document.cookie &&
            document.cookie
                .split("; ")
                .find((item) => item.includes("doubleKToken"))
        ) {
            fetchUsers();
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                brands,
                categories,
                promotions,
                laptops,
                users,
                orders,
                credits,
                fetchUsers,
                admin,
                setAdmin,
                logOut,
                fetchOrders,
                formatNumber,
                formatCreditNumber,
                checkLogin,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
