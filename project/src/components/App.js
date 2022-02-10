import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataList } from "../routes/DataList";
import DataSave from "../routes/DataSave";
import Home from "../routes/Home";
import GlobalStyle from "./GlobalStyle";
import getExchangeRate from "../getExchangeRate";
function App() {
    const [productList, setProductList] = useState([]);
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
