import React, { useState, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/cartReducer";

const AppContext = React.createContext();

function AppProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [credits, setCredits] = useState([]);
    const [categories, setCategory] = useState([]);

    const initialState = {
        loading: false,
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        total: 0,
        amount: 0,
    };

    const checkLogin = () => {
        if (
            !(
                (
                    document.cookie &&
                    document.cookie
                        .split("; ")
                        .find((item) => item.includes("doubleKToken"))
                        .split("=")[1] !== "" &&
                    localStorage.roles &&
                    localStorage.roles.includes("ROLE_USER")
                )

                // localStorage.id
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
        localStorage.removeItem("avatar");
        localStorage.removeItem("cart");
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };
    const remove = (id) => {
        dispatch({ type: "REMOVE", payload: id });
    };
    const increase = (id) => {
        dispatch({ type: "INCREASE", payload: id });
    };
    const decrease = (id) => {
        dispatch({ type: "DECREASE", payload: id });
    };
    const toggleAmount = (id, type) => {
        dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
    };
    const addToCart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart));
        dispatch({ type: "GET_TOTALS" });
    }, [state.cart]);

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const fetchProducts = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/product/all",
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        ?.split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        ?.split("=")[1],
                },
            }
        );

        if (res.data) {
            setProducts(res.data);
        } else {
            setProducts([]);
        }
    };

    const fetchCategory = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/category/all",
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        ?.split("; ")
                        .find((token) => token.includes("doubleKToken"))
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

    const fetchCredits = async () => {
        const res = await axios.get(
            "http://localhost:8080/doubleK/api/credit/all",
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        ?.split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        ?.split("=")[1],
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
        fetchProducts();
        fetchCredits();
        fetchCategory();
    }, []);

    return (
        <AppContext.Provider
            value={{
                ...state,
                clearCart,
                remove,
                increase,
                decrease,
                toggleAmount,
                addToCart,
                products,
                setCartItems,
                cartItems,
                credits,
                fetchCredits,
                logOut,
                categories,
                formatNumber,
                fetchProducts,
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
