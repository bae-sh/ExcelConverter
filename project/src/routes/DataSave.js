import { Link } from "react-router-dom";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

let temp = Array(20).fill("");

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`;
const Title = styled.div`
    width: 70%;
    margin-top: 100px;
`;
const Table = styled.table`
    width: 90%;
    border: 1px solid #cccccc;
    margin-top: 30px;
    margin-bottom: 100px;
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
`;
const Input = styled.textarea`
    text-align: center;
    resize: none;
    width: 100%;
`;
const PriceInput = styled.input`
    text-align: center;
    resize: none;
    width: 80%;
`;
const dataRows = (hscodes, setHscodes) => {
    let rows = [];

    for (let i = 0; i < 20; i++) {
        rows.push(
            <Row key={i} id={i}>
                <td>{i + 1}</td>
                <td>
                    <ImgBox>
                        <img src="" alt="" id={`img${i}`} />
                    </ImgBox>
                    <LableForIgmBtn htmlFor={`file${i}`}>업로드</LableForIgmBtn>
                    <ImgBtn
                        type="file"
                        id={`file${i}`}
                        onChange={(img) => selectImg(img, i)}
                    ></ImgBtn>
                </td>

                <td>
                    <Input></Input>
                </td>
                <td>
                    <Input></Input>
                </td>
                <td>
                    <Input></Input>
                </td>
                <td>
                    <Input size={10} as="input"></Input>
                    <Input size={10} as="input"></Input>
                </td>
                <td>
                    <span>¥</span>
                    <PriceInput size={10}></PriceInput>
                </td>
                <td>
                    <Input
                        value={hscodes[i]}
                        onChange={(e) => inputChange(e, hscodes, setHscodes, i)}
                        maxLength="12"
                        as="input"
                    ></Input>
                </td>
                <td>
                    <Input size={10}></Input>
                </td>
            </Row>
        );
    }
    return rows;
};
const inputChange = (e, hscodes, setHscodes, i) => {
    let newcodes = [...hscodes];
    newcodes[i] = e.target.value;
    if (newcodes[i].length === 5) {
        if (newcodes[i][4] !== ".") {
            newcodes[i] =
                newcodes[i].substring(0, 4) + "." + newcodes[i].substring(4);
        } else {
            newcodes[i] = newcodes[i].substring(0, 4);
        }
    } else if (newcodes[i].length === 8) {
        if (newcodes[i][7] !== "-") {
            newcodes[i] =
                newcodes[i].substring(0, 7) + "-" + newcodes[i].substring(7);
        } else {
            newcodes[i] = newcodes[i].substring(0, 7);
        }
    }
    setHscodes(newcodes);
};
const selectImg = (img, i) => {
    let preview = new FileReader();
    preview.onload = (e) => {
        document.getElementById(`img${i}`).src = e.target.result;
    };
    preview.readAsDataURL(img.target.files[0]);
};

const onClick = async (navigate) => {
    const storage = getStorage();

    for (let i = 0; i < 20; i++) {
        let rows = document.getElementById(i);
        let file = rows.childNodes[1].childNodes[2].files[0];
        let ko = rows.childNodes[2].childNodes[0].value;
        let en = rows.childNodes[3].childNodes[0].value;
        let ch = rows.childNodes[4].childNodes[0].value;
        let texture = rows.childNodes[5].childNodes[0].value;
        let Kotexture = rows.childNodes[5].childNodes[1].value;
        let price = rows.childNodes[6].childNodes[1].value;
        let hscode = rows.childNodes[7].childNodes[0].value;
        let info = rows.childNodes[7].childNodes[0].value;
        let id = uuidv4();
        let date = new Date();
        const storageRef = ref(storage, id);

        if (file) {
            let obj = {
                ko: ko,
                en: en,
                ch: ch,
                texture: texture,
                price: price,
                hscode: hscode,
                id: id,
                date: date,
                number: "",
                amount: "",
                info: info,
                Kotexture: Kotexture,
                shippingCost: 0,
                countPerOne: 0,
                size: { x: 0, y: 0, z: 0 },
            };
            await setDoc(doc(dbService, "items", id), obj);
            uploadBytes(storageRef, file);
        }
    }
    alert("저장되었습니다.");
    navigate("/");
};

const DataSave = () => {
    const navigate = useNavigate();
    const [hscodes, setHscodes] = useState(temp);
    return (
        <Main>
            <Title>
                <h1>데이터 작성</h1>
                <hr></hr>
                <SaveDiv>
                    <button>
                        <Link to="/">뒤로가기</Link>
                    </button>

                    <button onClick={() => onClick(navigate)}>저장</button>
                </SaveDiv>
            </Title>
            <Table>
                <thead>
                    <Row>
                        <th width={50}>넘버</th>
                        <th>사진</th>
                        <th>제품이름</th>
                        <th>영어이름</th>
                        <th>중국어이름</th>
                        <th>재질</th>
                        <th>개당단가</th>
                        <th>HS코드</th>
                        <th>특이사항</th>
                    </Row>
                </thead>
                <tbody>{dataRows(hscodes, setHscodes)}</tbody>
            </Table>
        </Main>
    );
};

export default DataSave;
