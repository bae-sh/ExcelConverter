import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataList } from "../routes/DataList";
import DataSave from "../routes/DataSave";
import Home from "../routes/Home";
import GlobalStyle from "./GlobalStyle";
function App() {
    const [productList, setProductList] = useState([
        {
            // photo: url(
            //     "https://image2.coupangcdn.com/image/retail/images/8246913542454378-67b4060d-53a7-4de4-a3e9-1601a8b279d4.jpg"
            // ),
            ko: "John Doe",
            en: "John Doe",
            texture: "texture",
            mount: "mount",
            number: "number",
            price: "price",
            hscode: "hscode",
        },
        {
            // photo: url(
            //     "https://image2.coupangcdn.com/image/retail/images/8246913542454378-67b4060d-53a7-4de4-a3e9-1601a8b279d4.jpg"
            // ),
            ko: "John Doe",
            en: "John Doe",
            texture: "texture",
            mount: "mount",
            number: "number",
            price: "price",
            hscode: "hscode",
        },
    ]);
    return (
        <div>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                productList={productList}
                                setProductList={setProductList}
                            />
                        }
                    ></Route>
                    <Route
                        path="/datalist"
                        element={
                            <DataList
                                productList={productList}
                                setProductList={setProductList}
                            />
                        }
                    ></Route>
                    <Route
                        path="/datasave"
                        element={
                            <DataSave
                                productList={productList}
                                setProductList={setProductList}
                            />
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
