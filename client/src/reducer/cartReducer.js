const reducer = (state, action) => {
    if (action.type === "CLEAR_CART") {
        return { ...state, cart: [] };
    }
    if (action.type === "REMOVE") {
        return {
            ...state,
            cart: state.cart.filter(
                (cartItem) => cartItem.id !== action.payload
            ),
        };
    }
    if (action.type === "INCREASE") {
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                return { ...cartItem, amount: cartItem.amount + 1 };
            }
            return cartItem;
        });
        return { ...state, cart: tempCart };
    }
    if (action.type === "DECREASE") {
        let tempCart = state.cart
            .map((cartItem) => {
                if (cartItem.id === action.payload) {
                    return { ...cartItem, amount: cartItem.amount - 1 };
                }
                return cartItem;
            })
            .filter((cartItem) => cartItem.amount !== 0);
        return { ...state, cart: tempCart };
    }
    if (action.type === "GET_TOTALS") {
        let total = 0;
        let amount = 0;

        for (let i = 0; i < state.cart.length; ++i) {
            const { price, amount: itemAmount } = state.cart[i];
            const itemTotal = price * itemAmount;

            total += itemTotal;
            amount += itemAmount;
        }

        return { ...state, total, amount };
    }
    if (action.type === "LOADING") {
        return { ...state, loading: true };
    }
    if (action.type === "ADD_TO_CART") {
        const existProduct = state.cart.find(
            (product) => product.id === action.payload.id
        );
        const amount = existProduct ? existProduct.amount : 0;

        return {
            ...state,
            cart: [
                ...state.cart.filter(
                    (product) => product.id !== action.payload.id
                ),
                { ...action.payload, amount: amount + action.payload.amount },
            ],
        };
    }
    if (action.type === "DISPLAY_ITEMS") {
        return { ...state, cart: action.payload, loading: false };
    }
    if (action.type === "TOGGLE_AMOUNT") {
        let tempCart = state.cart
            .map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    if (action.payload.type === "inc") {
                        return { ...cartItem, amount: cartItem.amount + 1 };
                    }
                    if (action.payload.type === "dec") {
                        return { ...cartItem, amount: cartItem.amount - 1 };
                    }
                }
                return cartItem;
            })
            .filter((cartItem) => cartItem.amount !== 0);
        return { ...state, cart: tempCart };
    }
    throw new Error("no matching action type");
};

export default reducer;
