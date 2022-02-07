import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import exceljs from "../excel";
let obj = [
    {
        photo: "https://image2.coupangcdn.com/image/retail/images/8246913542454378-67b4060d-53a7-4de4-a3e9-1601a8b279d4.jpg",
        ko: "John Doe",
        en: "John Doe",
        texture: "texture",
        mount: "mount",
        number: "number",
        price: "price",
        hscode: "hscode",
    },
    {
        photo: "https://image2.coupangcdn.com/image/retail/images/8246913542454378-67b4060d-53a7-4de4-a3e9-1601a8b279d4.jpg",
        ko: "John Doe",
        en: "John Doe",
        texture: "texture",
        mount: "mount",
        number: "number",
        price: "price",
        hscode: "hscode",
    },
];
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
            cursor: ${(props) => (props.editable ? "pointer" : "auto")};
        }
    }
`;
const Input = styled.input`
    text-align: center;
    :read-only {
        background-color: white;
        border: none;
        outline: none;
        cursor: auto;
    }
`;
const dataRows = (editable) => {
    let rows = [];
    for (let i = 0; i < 5; i++) {
        rows.push(
            <Row key={i} id={i}>
                <td>
                    <Input type={"checkbox"} />
                </td>
                <td>
                    <ImgBox editable={editable}>
                        <img src="" alt="수정하기" onClick={selectImg} />
                    </ImgBox>
                </td>
                <td>
                    <Input readOnly={!editable}></Input>
                </td>
                <td>
                    <Input readOnly={!editable}></Input>
                </td>
                <td>
                    <Input readOnly={!editable}></Input>
                </td>
                <td>
                    <Input size={15} readOnly={!editable}></Input>
                </td>
                <td>
                    <Input size={10} readOnly={!editable}></Input>
                </td>
                <td>
                    <Input size={10} readOnly={!editable}></Input>
                </td>
                <td>
                    <Input size={10} readOnly={!editable}></Input>
                </td>
                <td>
                    <Input readOnly={!editable}></Input>
                </td>
            </Row>
        );
    }
    return rows;
};

const selectImg = (e) => {
    let isEditable = document.querySelector("#saveBtn");
    if (isEditable.innerHTML === "저장하기") {
        let img = prompt("이미지 주소");
        if (img !== null) {
            e.target.src = img;
        }
        //https://image2.coupangcdn.com/image/retail/images/8246913542454378-67b4060d-53a7-4de4-a3e9-1601a8b279d4.jpg
    }
};
const DataList = () => {
    const [editable, setEditable] = useState(false);
    return (
        <Main>
            <Title>
                <h1>데이터 목록</h1>
                <hr></hr>
                <SaveDiv>
                    <button>
                        <Link to="/">뒤로가기</Link>
                    </button>
                    <div>
                        {editable && <button>삭제</button>}
                        <button
                            id="saveBtn"
                            onClick={() => {
                                setEditable((prev) => !prev);
                            }}
                        >
                            {editable ? "저장하기" : "수정하기"}
                        </button>
                        <button onClick={exceljs}>Excel</button>
                    </div>
                </SaveDiv>
            </Title>
            <Table>
                <thead>
                    <Row>
                        <th width={50}>체크</th>
                        <th>사진</th>
                        <th>제품이름</th>
                        <th>영어이름</th>
                        <th>중국어이름</th>
                        <th>운송장번호</th>
                        <th>제질</th>
                        <th>수량</th>
                        <th>개당단가</th>
                        <th>HS코드</th>
                    </Row>
                </thead>
                <tbody>{dataRows(editable)}</tbody>
            </Table>
        </Main>
    );
};

export { DataList, obj };
