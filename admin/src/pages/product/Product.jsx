import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { useAlert } from "react-alert";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Login from "../login/LogIn";

function Product() {
    let { productId } = useParams();
    const alert = useAlert();

    const { brands, categories, promotions, checkLogin } = useGlobalContext();

    const [product, setProduct] = useState({
        productName: "",
        price: 0,
        quantity: 0,
        description: "",
        screen: "",
        operatingSystem: "",
        cpu: "",
        ram: "",
        brand: { id: 0, brand: "" },
        category: { id: 0, category: "" },
        promotion: {},
        images: {},
    });

    const [name, setName] = useState(undefined);
    const [price, setPrice] = useState(undefined);
    const [qty, setQty] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [screen, setScreen] = useState(undefined);
    const [operatingSystem, setOperatingSystem] = useState(undefined);
    const [cpu, setCpu] = useState(undefined);
    const [ram, setRam] = useState(undefined);
    const [brand, setBrand] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const [promotion, setPromotion] = useState(undefined);
    const [keyType, setKeyType] = useState("");
    const [color, setColor] = useState("");
    const [refreshRate, setRefreshRate] = useState("");
    const [images, setImages] = useState(null);

    const fetchProduct = useCallback(async () => {
        const res = await axios.get(
            `http://localhost:8080/doubleK/api/product/${productId}`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: document?.cookie
                        .split("; ")
                        .find((token) => token.includes("doubleKToken"))
                        .split("=")[1],
                },
            }
        );

        if (res.data) {
            setProduct(res.data);
        } else {
            setProduct({});
        }
    }, [productId]);

    useEffect(() => {
        if (checkLogin()) {
            fetchProduct();
        }
    }, [checkLogin, fetchProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = new FormData();
        if (images) {
            data.append("multipartFile", images, images.name);
        }
        data.append("productName", name ? name : product.productName);
        data.append("price", price ? price : product.price);
        data.append("quantity", qty ? qty : product.quantity);
        data.append("screen", screen ? screen : product.screen);
        data.append(
            "operatingSystem",
            operatingSystem ? operatingSystem : product.operatingSystem
        );
        data.append("cpu", cpu ? cpu : product.cpu);
        data.append("ram", ram ? ram : product.ram);
        data.append("category", category ? category : product.category.id);
        data.append("brand", brand ? brand : product.brand.id);
        data.append(
            "promotion",
            promotion ? promotion : product.promotion.promotionId
        );
        data.append("keyType", keyType ? keyType : product.keyType);
        data.append("color", color ? color : product.color);
        data.append(
            "refreshRate",
            refreshRate ? refreshRate : product.refreshRate
        );

        data.append(
            "description",
            description ? description : product.description
        );

        await axios
            .put(
                `http://localhost:8080/doubleK/api/product/${product.id}`,
                data,
                {
                    headers: {
                        accept: "application/json",
                        Authorization: document?.cookie
                            .split("; ")
                            .find((token) => token.includes("doubleKToken"))
                            .split("=")[1],
                    },
                }
            )
            .then((res) => {
                alert.success(res.data.status);
            })
            .catch((e) => alert.error(e.response.data.errorMessages));
    };

    if (!checkLogin()) {
        return <Login />;
    }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
            </div>
            <div className="productTop">
                {/* <div className="productTopLeft">
                    <Chart
                        data={pStats}
                        dataKey="Sales"
                        title="Sales Performance"
                    />
                </div> */}
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img
                            src={
                                product.imagelist?.length &&
                                `http://127.0.0.1:8887/images/${
                                    product.imagelist[
                                        product.imagelist?.length - 1
                                    ]?.path
                                }`
                            }
                            alt=""
                            className="productInfoImg"
                        />
                        <span className="productName">
                            {product.productName}
                        </span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">ID:</span>
                            <span className="productInfoValue">
                                {product.id}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Qty:</span>
                            <span className="productInfoValue">
                                {product.quantity}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Category id:</span>
                            <span className="productInfoValue">
                                {product.category?.category}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Brand:</span>
                            <span className="productInfoValue">
                                {product.brand?.brand}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form
                    className="productForm"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <FormControl className="leftForm">
                        <div className="addProductItem">
                            <input
                                type="file"
                                onChange={(e) => {
                                    setImages(e.target.files[0]);
                                }}
                            />
                        </div>
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            placeholder={product.productName}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Product Price"
                            variant="outlined"
                            type="number"
                            placeholder={product.price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            label="CPU"
                            variant="outlined"
                            placeholder={product.cpu}
                            onChange={(e) => setCpu(e.target.value)}
                        />
                        <TextField
                            label="RAM"
                            variant="outlined"
                            placeholder={product.ram}
                            onChange={(e) => setRam(e.target.value)}
                        />
                    </FormControl>
                    <FormControl className="midForm">
                        <TextField
                            label="Qty"
                            variant="outlined"
                            type="number"
                            value={product.quantity}
                            onChange={(e) => setQty(e.target.value)}
                        />
                        <TextField
                            label="Operating System"
                            variant="outlined"
                            value={product.operatingSystem}
                            onChange={(e) => setOperatingSystem(e.target.value)}
                        />
                        <FormControl>
                            <InputLabel id="category-label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                value={product.category.id || ""}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        value={category.id}
                                        key={category.id}
                                    >
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
                                value={product.brand.id || ""}
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
                            <InputLabel id="promotion-label">
                                Promotion
                            </InputLabel>
                            <Select
                                labelId="promotion-label"
                                id="promotion"
                                value={product.promotion.promotionId || ""}
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
                            placeholder={product.screen}
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
                        <button type="submit" className="productButton">
                            Update
                        </button>
                    </FormControl>
                </form>
            </div>
        </div>
    );
}

export default Product;
