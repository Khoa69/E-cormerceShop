import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newProduct.css";
import { useGlobalContext } from "../../context/context";
import axios from "axios";
import { useAlert } from "react-alert";
import ProductSubMenu from "../../components/subMenu/ProductSubMenu";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Login from "../login/LogIn";

function NewProduct() {
    const { brands, categories, promotions, checkLogin } = useGlobalContext();
    const navigate = useNavigate();
    const alert = useAlert();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [description, setDescription] = useState("");
    const [screen, setScreen] = useState("");
    const [operatingSystem, setOperatingSystem] = useState("");
    const [cpu, setCpu] = useState("");
    const [ram, setRam] = useState("");
    const [keyType, setKeyType] = useState("");
    const [color, setColor] = useState("");
    const [refreshRate, setRefreshRate] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [promotion, setPromotion] = useState("");
    const [images, setImages] = useState(null);

    // const handleInputImgs = (e) => {
    //     setImages(
    //         Array.from(e.target.files).forEach(file => )
    //     )
    // }

    // const handleInputImages = (e) => {
    //     setImages(Array.from(e.target.files));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = new FormData();
        if (images) {
            data.append("multipartFile", images);
        }
        data.append("productName", name);
        data.append("price", price);
        data.append("quantity", qty);
        data.append("screen", screen);
        data.append("operatingSystem", operatingSystem);
        data.append("cpu", cpu);
        data.append("ram", ram);
        data.append("category", category);
        data.append("brand", brand);
        data.append("promotion", promotion);
        data.append("description", description);
        data.append("keyType", keyType);
        data.append("color", color);
        data.append("refreshRate", refreshRate);

        // for (let pair of data.entries()) {
        //     console.log(pair[0], pair[1]);
        // }

        console.log(images);

        await axios
            .post("http://localhost:8080/doubleK/api/product/save", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            })
            .then((res) => {
                alert.success("Product created!");
            })
            .catch((e) => console.log(e.response));

        return navigate("/products");
    };

    if (!checkLogin()) {
        return <Login />;
    }

    return (
        <div className="newProduct">
            <ProductSubMenu subMenuName="New Product" />
            <form
                className="addProductForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <FormControl className="leftForm">
                    <div className="addProductItem">
                        <input
                            type="file"
                            onChange={(e) => setImages(e.target.files[0])}
                        />
                    </div>
                    <TextField
                        label="Product Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Product Price"
                        variant="outlined"
                        value={price}
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        label="CPU"
                        variant="outlined"
                        value={cpu}
                        onChange={(e) => setCpu(e.target.value)}
                    />
                    <TextField
                        label="RAM"
                        variant="outlined"
                        value={ram}
                        onChange={(e) => setRam(e.target.value)}
                    />
                </FormControl>
                <FormControl className="midForm">
                    <TextField
                        label="Qty"
                        variant="outlined"
                        value={qty}
                        type="number"
                        onChange={(e) => setQty(e.target.value)}
                    />
                    <TextField
                        label="Operating System"
                        variant="outlined"
                        value={operatingSystem}
                        onChange={(e) => setOperatingSystem(e.target.value)}
                    />
                    <FormControl>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((category) => (
                                <MenuItem value={category.id} key={category.id}>
                                    {category.category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="brand-label">Brand</InputLabel>
                        <Select
                            labelId="brand-label"
                            id="brand"
                            value={brand}
                            label="Brand"
                            onChange={(e) => setBrand(e.target.value)}
                        >
                            {brands.map((brand) => (
                                <MenuItem value={brand.id} key={brand.id}>
                                    {brand.brand}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="promotion-label">Promotion</InputLabel>
                        <Select
                            labelId="promotion-label"
                            id="promotion"
                            value={promotion}
                            label="Promotion"
                            onChange={(e) => setPromotion(e.target.value)}
                        >
                            {promotions.map((promotion) => (
                                <MenuItem
                                    value={promotion.promotionId}
                                    key={promotion.promotionId}
                                >
                                    {promotion.content}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </FormControl>
                <FormControl className="rightForm">
                    <TextField
                        label="Screen"
                        variant="outlined"
                        value={screen}
                        onChange={(e) => setScreen(e.target.value)}
                    />
                    <TextField
                        label="Switch"
                        variant="outlined"
                        value={keyType}
                        onChange={(e) => setKeyType(e.target.value)}
                    />
                    <TextField
                        label="Color"
                        variant="outlined"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <TextField
                        label="Refresh rate"
                        variant="outlined"
                        value={refreshRate}
                        onChange={(e) => setRefreshRate(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        maxRows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type="submit" className="addProductButton">
                        Create
                    </button>
                </FormControl>
            </form>
        </div>
    );
}

export default NewProduct;
