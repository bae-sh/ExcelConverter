import { Link } from "react-router-dom";
import styled from "styled-components";

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

let arr = [];

const dataRows = () => {
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
                        onChange={selectImg}
                    ></ImgBtn>
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

const selectImg = (img) => {
    console.log(img.target);
    let preview = new FileReader();
    preview.onload = (e) => {
        document.getElementById("img0").src = e.target.result;
    };
    preview.readAsDataURL(img.target.files[0]);
};

const onClick = () => {
    for (let i = 0; i < 20; i++) {
        let rows = document.getElementById(i);
        let file = rows.childNodes[1].childNodes[2].files[0];
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
            file: file,
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
