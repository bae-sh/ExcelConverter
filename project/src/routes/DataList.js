import { Link } from "react-router-dom";
import styled from "styled-components";

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
const Img = styled.td`
    width: 80px;
    height: 80px;
    button {
        width: 100%;
        height: 100%;
        border: none;
        background-color: white;
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
                <td>
                    <input type={"checkbox"} />
                </td>
                <Img>
                    <button onClick={selectImg}>수정하기</button>
                </Img>
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
                    <input size={15}></input>
                </td>
                <td>
                    <input size={10}></input>
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
        e.target.style.background = `no-repeat center/100% url(${img})`;
    }
    //https://image2.coupangcdn.com/image/retail/images/8246913542454378-67b4060d-53a7-4de4-a3e9-1601a8b279d4.jpg
};
const DataList = () => {
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
                        <button>수정하기</button>
                        <button>Excel</button>
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
                <tbody>{dataRows()}</tbody>
            </Table>
        </Main>
    );
};

export default DataList;
