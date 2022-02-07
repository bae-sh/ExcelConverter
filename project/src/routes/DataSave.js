import { Link } from "react-router-dom";
import styled from "styled-components";

let obj = [];
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
        border: none;
        :hover {
            cursor: pointer;
        }
    }
`;
const dataRows = () => {
    let rows = [];
    for (let i = 0; i < 20; i++) {
        rows.push(
            <Row key={i} id={i}>
                <td>{i + 1}</td>
                <td>
                    <ImgBox>
                        <img src="" alt="수정하기" onClick={selectImg} />
                    </ImgBox>
                </td>

                <td>
                    <input></input>
                </td>
                <td>
                    <input></input>
                </td>
                <td>
                    <input></input>
                </td>
                <td>
                    <input size={10}></input>
                </td>
                <td>
                    <input size={10}></input>
                </td>
                <td>
                    <input></input>
                </td>
            </Row>
        );
    }
    return rows;
};

const selectImg = (e) => {
    let img = prompt("이미지 주소");
    if (img !== null) {
        e.target.src = img;
    }
    //https://image2.coupangcdn.com/image/retail/images/8246913542454378-67b4060d-53a7-4de4-a3e9-1601a8b279d4.jpg
};

const getUrl = (url) => {
    let address = "";
    let check = false;
    for (let i = 0; i < url.length; i++) {
        if (url[i] === '"') {
            check = !check;
        } else {
            if (check) {
                address += url[i];
            }
        }
    }
    return address;
};
const onClick = () => {
    let arr = [];

    for (let i = 0; i < 20; i++) {
        let rows = document.getElementById(i);
        let url = getUrl(rows.childNodes[1].childNodes[0].style.background);
        let ko = rows.childNodes[2].childNodes[0].value;
        let en = rows.childNodes[3].childNodes[0].value;
        let ch = rows.childNodes[4].childNodes[0].value;
        let texture = rows.childNodes[4].childNodes[0].value;
        let price = rows.childNodes[5].childNodes[0].value;
        let hscode = rows.childNodes[6].childNodes[0].value;

        if (ko === "") {
            continue;
        }

        let obj = {
            url: url,
            ko: ko,
            en: en,
            ch: ch,
            texture: texture,
            price: price,
            hscode: hscode,
        };
        arr.push(obj);
    }
};
const DataSave = () => {
    return (
        <Main>
            <Title>
                <h1>데이터 작성</h1>
                <hr></hr>
                <SaveDiv>
                    <button>
                        <Link to="/">뒤로가기</Link>
                    </button>

                    <button onClick={onClick}>저장</button>
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
                        <th>제질</th>
                        <th>개당단가</th>
                        <th>HS코드</th>
                    </Row>
                </thead>
                <tbody>{dataRows()}</tbody>
            </Table>
        </Main>
    );
};

export default DataSave;
