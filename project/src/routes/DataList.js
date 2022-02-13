import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import exceljs from "../excel";
import {
    collection,
    query,
    getDocs,
    doc,
    setDoc,
    orderBy,
    deleteDoc,
} from "firebase/firestore";
import { dbService } from "../firebase";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { getExchangeRate } from "../getExchangeRate";
import { getRate } from "../getRate";

const Main = styled.div`
    /* background-color: tomato; */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`;
const Title = styled.div`
    /* background-color: blue; */
    width: 70%;
    margin-top: 100px;
`;
const Table = styled.table`
    width: 90%;
    border: 1px solid #cccccc;
    margin-top: 330px;
    margin-bottom: 100px;
`;
const Header = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;
const Row = styled.tr`
    border: 1px solid #cccccc;
    &:first-child {
        & > th {
            padding: 10px;
            border: 1px solid #cccccc;
            background-color: #f9f9f9;
        }
    }
    & > td {
        :not(2) {
            padding: 20px;
            width: 100%;
            height: 100%;
        }
        text-align: center;
        border: 1px solid #cccccc;
        &:first-child {
            font-weight: 500;
        }
    }
`;
const SaveDiv = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        font-size: 18px;
        margin-top: 10px;
        margin-right: 20px;
    }
`;
const ImgBox = styled.div`
    width: 80px;
    height: 80px;

    img {
        width: 100%;
        height: 100%;
    }
`;
const Input = styled.textarea`
    text-align: center;
    resize: none;
    width: 100%;
    :read-only {
        background-color: white;
        border: none;
        outline: none;
        cursor: auto;
    }
`;
const PriceInput = styled.input`
    text-align: center;
    resize: none;
    width: 80%;
    :read-only {
        background-color: white;
        border: none;
        outline: none;
        cursor: auto;
    }
`;
const ImgBtn = styled.input`
    display: none;
`;
const LableForIgmBtn = styled.label`
    border: 1px solid #767676;
    border-radius: 5px;
    padding: 0px 3px;
    background-color: #efefef;
    :hover {
        cursor: pointer;
    }
    display: ${(props) => {
        if (!props.editable) {
            return "none";
        }
    }};
`;
const ExchangeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    div {
        width: 50%;
        text-align: center;
    }
    div:nth-child(1) {
        border-bottom: 1px solid gray;
        padding-bottom: 5px;
        margin-bottom: 5px;
    }
`;
const RateSpan = styled.span`
    font-size: 12px;
`;
const dataRows = (editable, productList, setProductList, rate) => {
    let rows = [];
    for (let i = 0; i < productList.length; i++) {
        rows.push(
            <Row key={i} id={i}>
                <td>
                    <input type={"checkbox"} />
                </td>
                <td>
                    <ImgBox>
                        <img src="" alt="" id={`img${i}`} />
                    </ImgBox>
                    <LableForIgmBtn htmlFor={`file${i}`} editable={editable}>
                        업로드
                    </LableForIgmBtn>
                    <ImgBtn
                        type="file"
                        id={`file${i}`}
                        onChange={(e) => {
                            selectImg(e, i);
                        }}
                    ></ImgBtn>
                </td>
                <td>
                    <Input
                        type="text"
                        readOnly={!editable}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        id={`ko${i}`}
                        value={productList[i]["ko"]}
                    ></Input>
                </td>
                <td>
                    <Input
                        readOnly={!editable}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        id={`en${i}`}
                        value={productList[i]["en"]}
                    ></Input>
                </td>
                <td>
                    <Input
                        readOnly={!editable}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        id={`ch${i}`}
                        value={productList[i]["ch"]}
                    ></Input>
                </td>
                <td>
                    <Input
                        size={15}
                        readOnly={!editable}
                        id={`number${i}`}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        value={productList[i]["number"]}
                    ></Input>
                </td>
                <td>
                    <Input
                        size={10}
                        readOnly={!editable}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        id={`texture${i}`}
                        value={productList[i]["texture"]}
                        as="input"
                    ></Input>
                    <Input
                        size={10}
                        readOnly={!editable}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        id={`Kotexture${i}`}
                        value={productList[i]["Kotexture"]}
                        as="input"
                    ></Input>
                </td>
                <td>
                    <Input
                        size={10}
                        readOnly={!editable}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        id={`amount${i}`}
                        value={productList[i]["amount"]}
                        as="input"
                    ></Input>
                </td>
                <td>
                    <span>¥</span>
                    <PriceInput
                        size={10}
                        readOnly={!editable}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        id={`price${i}`}
                        value={productList[i]["price"]}
                    ></PriceInput>
                </td>
                <td>
                    <Input
                        readOnly={!editable}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        id={`hscode${i}`}
                        value={productList[i]["hscode"]}
                        as="input"
                        maxLength="12"
                    ></Input>
                    <RateSpan>
                        {showRate(rate, productList[i]["hscode"])}
                    </RateSpan>
                </td>
                <td>
                    <Input
                        size={15}
                        readOnly={!editable}
                        id={`info${i}`}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        value={productList[i]["info"]}
                    ></Input>
                </td>
            </Row>
        );
        if (!editable) {
            downloadImg(productList, i);
        }
    }
    return rows;
};

const selectImg = (img, idx) => {
    let preview = new FileReader();
    preview.onload = (e) => {
        document.getElementById(`img${idx}`).src = e.target.result;
    };
    if (img.target.files[0]) {
        preview.readAsDataURL(img.target.files[0]);
    }
};
const getObj = async (setProductList) => {
    const q = query(collection(dbService, "items"), orderBy("date"));
    const querySnapshot = await getDocs(q);
    const obj = [];
    querySnapshot.forEach((doc) => {
        obj.push(doc.data());
    });
    setProductList(obj);
};
const downloadImg = (productList, i) => {
    const storage = getStorage();
    const starsRef = ref(storage, productList[i].id);
    getDownloadURL(starsRef)
        .then(async (url) => {
            const response = await fetch(url);
            const data = await response.blob();
            let f = new File([data], "null", { type: data.type });
            let preview = new FileReader();
            preview.onload = (e) => {
                document.getElementById(`img${i}`).src = e.target.result;
                i += 1;
            };
            preview.readAsDataURL(f);
        })
        .catch((error) => {
            // console.log(error);
        });
};
const inputChange = (e, productList, setProductList, i) => {
    let newProductList = [...productList];
    if (e.target.id[0] === "k") {
        newProductList[i]["ko"] = e.target.value;
    } else if (e.target.id[0] === "e") {
        newProductList[i]["en"] = e.target.value;
    } else if (e.target.id[0] === "c") {
        newProductList[i]["ch"] = e.target.value;
    } else if (e.target.id[0] === "n") {
        newProductList[i]["number"] = e.target.value;
    } else if (e.target.id[0] === "a") {
        newProductList[i]["amount"] = e.target.value;
    } else if (e.target.id[0] === "t") {
        newProductList[i]["texture"] = e.target.value;
    } else if (e.target.id[0] === "K") {
        newProductList[i]["Kotexture"] = e.target.value;
    } else if (e.target.id[0] === "p") {
        newProductList[i]["price"] = e.target.value;
    } else if (e.target.id[0] === "i") {
        newProductList[i]["info"] = e.target.value;
    } else if (e.target.id[0] === "h") {
        newProductList[i]["hscode"] = e.target.value;
        if (newProductList[i]["hscode"].length === 5) {
            if (newProductList[i]["hscode"][4] !== ".") {
                newProductList[i]["hscode"] =
                    newProductList[i]["hscode"].substring(0, 4) +
                    "." +
                    newProductList[i]["hscode"].substring(4);
            } else {
                newProductList[i]["hscode"] = newProductList[i][
                    "hscode"
                ].substring(0, 4);
            }
        } else if (newProductList[i]["hscode"].length === 8) {
            if (newProductList[i]["hscode"][7] !== "-") {
                newProductList[i]["hscode"] =
                    newProductList[i]["hscode"].substring(0, 7) +
                    "-" +
                    newProductList[i]["hscode"].substring(7);
            } else {
                newProductList[i]["hscode"] = newProductList[i][
                    "hscode"
                ].substring(0, 7);
            }
        }
    }
    setProductList(newProductList);
};
const onSave = async (productList, reset = false, setProductList) => {
    const storage = getStorage();
    for (let i = 0; i < productList.length; i++) {
        let rows = document.getElementById(i);
        let check = rows.childNodes[0].childNodes[0].checked;
        let file = rows.childNodes[1].childNodes[2].files[0];
        let ko = rows.childNodes[2].childNodes[0].value;
        let en = rows.childNodes[3].childNodes[0].value;
        let ch = rows.childNodes[4].childNodes[0].value;
        let number = rows.childNodes[5].childNodes[0].value;
        let texture = rows.childNodes[6].childNodes[0].value;
        let Kotexture = rows.childNodes[6].childNodes[1].value;
        let amount = rows.childNodes[7].childNodes[0].value;
        let price = rows.childNodes[8].childNodes[1].value;
        let hscode = rows.childNodes[9].childNodes[0].value;
        let info = rows.childNodes[10].childNodes[0].value;
        let id = productList[i].id;
        let date = productList[i].date;
        const storageRef = ref(storage, id);

        let obj = {
            ko: ko,
            en: en,
            ch: ch,
            number: number,
            texture: texture,
            amount: amount,
            price: price,
            hscode: hscode,
            id: id,
            date: date,
            info: info,
            Kotexture: Kotexture,
        };
        if (reset && check) {
            obj["number"] = "";
            obj["amount"] = "";
        }
        if (file) {
            uploadBytes(storageRef, file);
        }

        await setDoc(doc(dbService, "items", id), obj);
        downloadImg(productList, i);
    }
    getObj(setProductList);
    if (!reset) {
        alert("저장되었습니다.");
    }
};
const onDelete = async (productList, setProductList, setEditable) => {
    if (window.confirm("삭제하시겠습니까?")) {
        const storage = getStorage();

        for (let i = 0; i < productList.length; i++) {
            let rows = document.getElementById(i);
            let check = rows.childNodes[0].childNodes[0].checked;
            let id = productList[i].id;
            if (check) {
                const desertRef = ref(storage, id);
                rows.childNodes[0].childNodes[0].checked = false;
                deleteObject(desertRef)
                    .then(() => {
                        console.log("delete");
                    })
                    .catch((error) => {
                        // Uh-oh, an error occurred!
                    });
                await deleteDoc(doc(dbService, "items", id));
            }
        }
        getObj(setProductList);
        alert("삭제되었습니다.");
        setEditable((prev) => !prev);
    }
};
const onClickExcel = async (productList, exchange, setProductList) => {
    let newObj = [];
    productList.forEach((e, i) => {
        let rows = document.getElementById(i);
        let obj = JSON.parse(JSON.stringify(e));
        if (rows.childNodes[0].childNodes[0].checked) {
            let number = rows.childNodes[5].childNodes[0].value;
            let amount = rows.childNodes[7].childNodes[0].value;
            let price = rows.childNodes[8].childNodes[1].value;
            obj["number"] = number;
            obj["amount"] = amount;
            obj["price"] = `$ ${(
                (Number(price) * Number(exchange["CNY"])) /
                Number(exchange["USD"])
            ).toFixed(2)}`;
            obj["idx"] = i;
            newObj.push(obj);
        }
    });
    let isExcel = await exceljs(newObj);
    if (isExcel) {
        onSave(productList, true, setProductList);
    }
};
const loadRateData = (productList, rate, setRate) => {
    productList.forEach(({ hscode }) => {
        let code =
            hscode.substring(0, 4) +
            hscode.substring(5, 7) +
            hscode.substring(8);
        if (hscode.length === 12) {
            getRate(code, rate, setRate);
        }
    });
};
const showRate = (rate, hscode) => {
    let code =
        hscode.substring(0, 4) + hscode.substring(5, 7) + hscode.substring(8);
    let res;
    rate.forEach((e) => {
        if (e.hscode === code) {
            res = `${e.A}%(A) ${e.C}%(C) ${e.FCN1}%(FCN1)`;
        }
    });
    return res;
};
const DataList = ({ productList, setProductList }) => {
    const [editable, setEditable] = useState(false);
    const [exchange, setExchange] = useState({ CNY: 0, USD: 0 });
    const [rate, setRate] = useState([]);
    useEffect(() => {
        getObj(setProductList);
        loadRateData(productList, rate, setRate);
    }, []);
    useEffect(() => {
        if (!editable) {
            for (let i = 0; i < productList.length; i++) {
                downloadImg(productList, i);
            }
            loadRateData(productList, rate, setRate);
        }
        getExchangeRate(setExchange);
    }, [productList, editable]);
    return (
        <Main>
            <Header>
                <Title>
                    <h1>데이터 목록</h1>
                    <hr></hr>
                    <SaveDiv>
                        <div>
                            <button>
                                <Link to="/">뒤로가기</Link>
                            </button>
                        </div>

                        <ExchangeBox>
                            <div>현재 환율 정보</div>
                            <div>미국(USD) : {exchange.USD}</div>
                            <div>중국(CNY) : {exchange.CNY}</div>
                        </ExchangeBox>
                        <div>
                            {editable && (
                                <button
                                    onClick={() => {
                                        onDelete(
                                            productList,
                                            setProductList,
                                            setEditable
                                        );
                                    }}
                                >
                                    삭제
                                </button>
                            )}
                            <button
                                id="saveBtn"
                                onClick={() => {
                                    setEditable((prev) => !prev);
                                    if (editable) {
                                        getObj(setProductList);
                                    }
                                }}
                            >
                                {editable ? "취소" : "수정하기"}
                            </button>
                            {editable ? (
                                <button
                                    onClick={() => {
                                        setEditable((prev) => !prev);
                                        onSave(
                                            productList,
                                            false,
                                            setProductList
                                        );
                                    }}
                                >
                                    저장하기
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        onClickExcel(
                                            productList,
                                            exchange,
                                            setProductList
                                        )
                                    }
                                >
                                    Excel
                                </button>
                            )}
                        </div>
                    </SaveDiv>
                </Title>
            </Header>

            <Table>
                <thead>
                    <Row>
                        <th width={50}>체크</th>
                        <th>사진</th>
                        <th>제품이름</th>
                        <th>영어이름</th>
                        <th>중국어이름</th>
                        <th>운송장번호</th>
                        <th>재질</th>
                        <th>수량</th>
                        <th>개당단가</th>
                        <th>HS코드</th>
                        <th>특이사항</th>
                    </Row>
                </thead>
                <tbody>
                    {dataRows(editable, productList, setProductList, rate)}
                </tbody>
            </Table>
        </Main>
    );
};

export { DataList };
