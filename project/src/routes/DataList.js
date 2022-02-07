import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import exceljs from "../excel";
import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const dataRows = (editable, productList, setProductList) => {
    let rows = [];
    for (let i = 0; i < productList.length; i++) {
        rows.push(
            <Row key={i} id={i}>
                <td>
                    <Input type={"checkbox"} />
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
                    ></Input>
                </td>
                <td>
                    <Input
                        size={10}
                        readOnly={!editable}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        id={`price${i}`}
                        value={productList[i]["price"]}
                    ></Input>
                </td>
                <td>
                    <Input
                        readOnly={!editable}
                        onChange={(e) =>
                            inputChange(e, productList, setProductList, i)
                        }
                        id={`hscode${i}`}
                        value={productList[i]["hscode"]}
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
    preview.readAsDataURL(img.target.files[0]);
};
const getObj = async (productList, setProductList) => {
    const q = query(collection(dbService, "items"));
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
            console.log(error);
        });
};
const inputChange = (e, productList, setProductList, i) => {
    let newProductList = [...productList];
    console.log(newProductList);
    if (e.target.id[0] === "k") {
        newProductList[i]["ko"] = e.target.value;
    } else if (e.target.id[0] === "e") {
        newProductList[i]["en"] = e.target.value;
    } else if (e.target.id[0] === "c") {
        newProductList[i]["ch"] = e.target.value;
    } else if (e.target.id[0] === "t") {
        newProductList[i]["texture"] = e.target.value;
    } else if (e.target.id[0] === "p") {
        newProductList[i]["price"] = e.target.value;
    } else if (e.target.id[0] === "h") {
        newProductList[i]["hscode"] = e.target.value;
    }
    setProductList(newProductList);
};
const onSave = async (productList) => {
    const storage = getStorage();

    for (let i = 0; i < productList.length; i++) {
        let rows = document.getElementById(i);
        let file = rows.childNodes[1].childNodes[2].files[0];
        let ko = rows.childNodes[2].childNodes[0].value;
        let en = rows.childNodes[3].childNodes[0].value;
        let ch = rows.childNodes[4].childNodes[0].value;
        let texture = rows.childNodes[6].childNodes[0].value;
        let price = rows.childNodes[8].childNodes[0].value;
        let hscode = rows.childNodes[9].childNodes[0].value;
        let id = productList[i].id;
        const storageRef = ref(storage, id);
        console.log(file);
        if (ko === "") {
            continue;
        }

        let obj = {
            ko: ko,
            en: en,
            ch: ch,
            texture: texture,
            price: price,
            hscode: hscode,
            id: id,
        };
        if (file) {
            uploadBytes(storageRef, file);
        }
        await setDoc(doc(dbService, "items", id), obj);
    }
    alert("저장되었습니다.");
};
const DataList = ({ productList, setProductList }) => {
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        getObj(productList, setProductList);
    }, []);
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
                                    onSave(productList);
                                }}
                            >
                                저장하기
                            </button>
                        ) : (
                            <button onClick={() => exceljs(productList)}>
                                Excel
                            </button>
                        )}
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
                <tbody>{dataRows(editable, productList, setProductList)}</tbody>
            </Table>
        </Main>
    );
};

export { DataList };
