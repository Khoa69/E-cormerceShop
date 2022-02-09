import React, { useContext } from "react";

const AppContext = React.createContext();

function AppProvider({ children }) {
    const checkLogin = () => {
        if (
            !(
                document.cookie &&
                document.cookie
                    .split("; ")
                    .find((item) => item.includes("doubleKToken"))
                    .split("=")[1] !== "" &&
                localStorage.roles &&
                localStorage.roles.includes("ROLE_SHIPPER")
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

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <AppContext.Provider
            value={{
                logOut,
                formatNumber,
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
