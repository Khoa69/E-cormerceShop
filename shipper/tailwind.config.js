module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                nightMode: {
                    dark: "#2A0944",
                    default: "#3B185F",
                    light: "#577BC1",
                    hightLight: "#EBE645",
                },
                green: {
                    dark: "#D9DD6B",
                    default: "#BCFFB9",
                    semiLight: "#D8F8B7",
                    light: "#F5FDB0",
                    chalk: "#B6EB7A",
                    hightLight: "#F7E6AD",
                },
                white: {
                    semiLight: "#F7F7F7",
                },
                instagram: {
                    first: "#f09433",
                    second: "#e6683c",
                    third: "#dc2743",
                    forth: "#cc2366",
                    fifth: "#bc1888",
                },
            },
            spacing: {
                150: "600px",
                75: "300px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
