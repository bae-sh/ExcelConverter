import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataList } from "../routes/DataList";
import DataSave from "../routes/DataSave";
import Home from "../routes/Home";
import GlobalStyle from "./GlobalStyle";
function App() {
    return (
        <div>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/datalist" element={<DataList />}></Route>
                    <Route path="/datasave" element={<DataSave />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
