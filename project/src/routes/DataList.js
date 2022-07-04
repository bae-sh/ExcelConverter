import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Box } from '@chakra-ui/react';
import styled from 'styled-components';
import exceljs from '../excel';
import Modal from 'react-modal';

import {
  collection,
  query,
  getDocs,
  doc,
  setDoc,
  orderBy,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { dbService } from '../firebase';
import { getStorage, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { getExchangeRate } from '../getExchangeRate';
import { getRate } from '../getRate';

const Main = styled.div`
  display: ${({ running }) => (running ? 'none' : 'flex')};
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
  margin-top: 330px;
  margin-bottom: 100px;
  z-index: 0;
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
  z-index: 1;
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
const InputCost = styled(Input)`
  width: 100px;
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
const SettingBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  label {
    margin-right: 10px;
  }
  input {
    text-align: center;
  }
`;
const ModalHeader = styled.div`
  img {
    width: 150px;
    height: 150px;
  }
  p {
    font-size: 20px;
  }
`;
const ModalLabel = styled.div`
  margin-bottom: 10px;
  label {
    margin-right: 16px;
  }
  input {
    width: 80px;
    text-align: center;
    margin: 0 5px;
  }
  button {
    margin-right: 10px;
  }
`;
const Spinner = styled.div`
  width: 100%;
  height: 100vh;
  background-color: lightgray;
  position: absolute;
  opacity: 0.8;
  z-index: 100;
  display: ${({ running }) => (running ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  font-size: 80px;
`;
const dataRows = (
  editable,
  productList,
  setProductList,
  rate,
  setIsOpen,
  shippingCosts,
  exchange,
) => {
  let rows = [];
  for (let i = 0; i < productList.length; i++) {
    let A =
      (5 * productList[i].countPerOne * 1000000) /
      (productList[i].size.x * productList[i].size.y * productList[i].size.z);
    let predictCost =
      ((A * (Number(productList[i].price) + Number(productList[i].shippingCost)) +
        (5 * Number(shippingCosts.aboardCost) + 400) +
        ((Number(productList[i].price) * A) / 10) *
          (1 + 0.11 * getMaxRate(rate, productList[i].hscode))) *
        Number(exchange.CNY) +
        33000 +
        Number(shippingCosts.domesticCost) +
        Number(shippingCosts.serviceCost)) /
      A;
    rows.push(
      <Row key={i} id={i}>
        <td>
          <Input
            type="text"
            readOnly={!editable}
            onChange={e => inputChange(e, productList, setProductList, i)}
            id={`indexNumber${i}`}
            size={5}
            as="input"
            value={productList[i]['indexNumber']}
          />
        </td>
        <td>
          <ImgBox>
            <img src="" alt="" id={`img${i}`} />
          </ImgBox>
        </td>
        <td>
          <Input
            type="text"
            readOnly={!editable}
            onChange={e => inputChange(e, productList, setProductList, i)}
            id={`ko${i}`}
            value={productList[i]['ko']}
          ></Input>
        </td>
        <td>
          <Input
            readOnly={!editable}
            onChange={e => inputChange(e, productList, setProductList, i)}
            id={`en${i}`}
            value={productList[i]['en']}
          ></Input>
        </td>
        <td>
          <Input
            readOnly={!editable}
            onChange={e => inputChange(e, productList, setProductList, i)}
            id={`ch${i}`}
            value={productList[i]['ch']}
          ></Input>
        </td>
        <td>
          <Input
            size={15}
            readOnly={!editable}
            id={`number${i}`}
            onChange={e => inputChange(e, productList, setProductList, i)}
            value={productList[i]['number']}
          ></Input>
        </td>
        <td>
          <Input
            size={10}
            readOnly={!editable}
            onChange={e => inputChange(e, productList, setProductList, i)}
            id={`texture${i}`}
            value={productList[i]['texture']}
            as="input"
          ></Input>
          <Input
            size={10}
            readOnly={!editable}
            onChange={e => inputChange(e, productList, setProductList, i)}
            id={`Kotexture${i}`}
            value={productList[i]['Kotexture']}
            as="input"
          ></Input>
        </td>
        <td>
          <Input
            size={10}
            readOnly={!editable}
            onChange={e => inputChange(e, productList, setProductList, i)}
            id={`amount${i}`}
            value={productList[i]['amount']}
            as="input"
          ></Input>
        </td>
        <td>
          <span>¥</span>
          <PriceInput
            size={10}
            readOnly={!editable}
            onChange={e => inputChange(e, productList, setProductList, i)}
            id={`price${i}`}
            value={productList[i]['price']}
          ></PriceInput>
        </td>
        <td>
          <Input
            readOnly={!editable}
            onChange={e => inputChange(e, productList, setProductList, i)}
            id={`hscode${i}`}
            value={productList[i]['hscode']}
            as="input"
            maxLength="12"
          ></Input>
          <RateSpan>{showRate(rate, productList[i]['hscode'])}</RateSpan>
        </td>
        <td>
          <Input
            size={15}
            readOnly={!editable}
            id={`info${i}`}
            onChange={e => inputChange(e, productList, setProductList, i)}
            value={productList[i]['info']}
          ></Input>
        </td>
        <td>
          <div>
            <p>{isNaN(predictCost) ? 'X' : `${Math.round(predictCost)} 원`}</p>
            <button onClick={() => setIsOpen(i)}>수정</button>
          </div>
        </td>
      </Row>,
    );
  }
  return rows;
};

const getObj = async setProductList => {
  const q = query(collection(dbService, 'items'), orderBy('indexNumber'), orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  const obj = [];
  querySnapshot.forEach(doc => {
    obj.push(doc.data());
  });
  setProductList(obj);
};
const getCost = async setShippingCosts => {
  const docRef = doc(dbService, 'cost', 'shippingCosts');
  const docSnap = await getDoc(docRef);
  setShippingCosts(docSnap.data());
};
const downloadImg = (productList, i) => {
  const storage = getStorage();
  const starsRef = ref(storage, productList[i].id);
  getDownloadURL(starsRef)
    .then(async url => {
      const response = await fetch(url);
      const data = await response.blob();
      let f = new File([data], 'null', { type: data.type });
      let preview = new FileReader();
      preview.onload = e => {
        document.getElementById(`img${i}`).src = e.target.result;
        i += 1;
      };
      preview.readAsDataURL(f);
    })
    .catch(error => {
      // console.log(error);
    });
};
const inputChange = (e, productList, setProductList, i) => {
  let newProductList = [...productList];
  if (e.target.id === `ko${i}`) {
    newProductList[i]['ko'] = e.target.value;
  } else if (e.target.id === `en${i}`) {
    newProductList[i]['en'] = e.target.value;
  } else if (e.target.id === `ch${i}`) {
    newProductList[i]['ch'] = e.target.value;
  } else if (e.target.id === `number${i}`) {
    newProductList[i]['number'] = e.target.value;
  } else if (e.target.id === `amount${i}`) {
    newProductList[i]['amount'] = e.target.value;
  } else if (e.target.id === `texture${i}`) {
    newProductList[i]['texture'] = e.target.value;
  } else if (e.target.id === `Kotexture${i}`) {
    newProductList[i]['Kotexture'] = e.target.value;
  } else if (e.target.id === `price${i}`) {
    newProductList[i]['price'] = e.target.value;
  } else if (e.target.id === `info${i}`) {
    newProductList[i]['info'] = e.target.value;
  } else if (e.target.id === `hscode${i}`) {
    newProductList[i]['hscode'] = e.target.value;
    if (newProductList[i]['hscode'].length === 5) {
      if (newProductList[i]['hscode'][4] !== '.') {
        newProductList[i]['hscode'] =
          newProductList[i]['hscode'].substring(0, 4) +
          '.' +
          newProductList[i]['hscode'].substring(4);
      } else {
        newProductList[i]['hscode'] = newProductList[i]['hscode'].substring(0, 4);
      }
    } else if (newProductList[i]['hscode'].length === 8) {
      if (newProductList[i]['hscode'][7] !== '-') {
        newProductList[i]['hscode'] =
          newProductList[i]['hscode'].substring(0, 7) +
          '-' +
          newProductList[i]['hscode'].substring(7);
      } else {
        newProductList[i]['hscode'] = newProductList[i]['hscode'].substring(0, 7);
      }
    }
  } else if (e.target.id === `shippingCost${i}`) {
    newProductList[i]['shippingCost'] = e.target.value;
  } else if (e.target.id === `countPerOne${i}`) {
    newProductList[i]['countPerOne'] = e.target.value;
  } else if (e.target.id === `x${i}`) {
    newProductList[i]['size']['x'] = e.target.value;
  } else if (e.target.id === `y${i}`) {
    newProductList[i]['size']['y'] = e.target.value;
  } else if (e.target.id === `z${i}`) {
    newProductList[i]['size']['z'] = e.target.value;
  } else if (e.target.id === `indexNumber${i}`) {
    newProductList[i]['indexNumber'] = e.target.value;
  }
  setProductList(newProductList);
};
const onSave = async (productList, reset = false, setProductList, setShippingCosts, setRunning) => {
  for (let i = 0; i < productList.length; i++) {
    let rows = document.getElementById(i);
    let indexNumber = rows.childNodes[0].childNodes[0].value;
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
    let shippingCost = productList[i].shippingCost;
    let countPerOne = productList[i].countPerOne;
    let size = productList[i].size;
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
      shippingCost: shippingCost,
      countPerOne: countPerOne,
      size: size,
      indexNumber: indexNumber,
    };
    if (reset && number) {
      obj['number'] = '';
      obj['amount'] = '';
    }
    setRunning(true);
    await setDoc(doc(dbService, 'items', id), obj);
    setRunning(false);
  }
  getObj(setProductList);
  getCost(setShippingCosts);
  if (!reset) {
    alert('저장되었습니다.');
  }
};
const onDelete = async (productList, setProductList, setEditable) => {
  if (window.confirm('삭제하시겠습니까?')) {
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
            console.log('delete');
          })
          .catch(error => {
            // Uh-oh, an error occurred!
          });
        await deleteDoc(doc(dbService, 'items', id));
      }
    }
    getObj(setProductList);
    alert('삭제되었습니다.');
    setEditable(prev => !prev);
  }
};
const onClickExcel = async (
  productList,
  exchange,
  setProductList,
  setShippingCosts,
  setRunning,
) => {
  let newObj = [];
  productList.forEach((e, i) => {
    let rows = document.getElementById(i);
    let obj = JSON.parse(JSON.stringify(e));
    if (rows.childNodes[5].childNodes[0].value) {
      let number = rows.childNodes[5].childNodes[0].value;
      let amount = rows.childNodes[7].childNodes[0].value;
      let price = rows.childNodes[8].childNodes[1].value;
      obj['number'] = number;
      obj['amount'] = amount;
      obj['price'] = `$ ${(
        (Number(price) * Number(exchange['CNY'])) /
        Number(exchange['USD'])
      ).toFixed(2)}`;
      obj['idx'] = i;
      newObj.push(obj);
    }
  });
  setRunning(true);
  let isExcel = await exceljs(newObj);
  if (isExcel) {
    onSave(productList, true, setProductList, setShippingCosts, setRunning);
  }
};
const loadRateData = (productList, setRate, hscodes) => {
  productList.forEach(({ hscode }) => {
    let code = hscode.substring(0, 4) + hscode.substring(5, 7) + hscode.substring(8);
    if (hscode.length === 12 && !hscodes.includes(code)) {
      getRate(code, setRate);
      hscodes.push(code);
    }
  });
};
const showRate = (rate, hscode) => {
  let code = hscode.substring(0, 4) + hscode.substring(5, 7) + hscode.substring(8);
  let res;
  rate.forEach(e => {
    if (e.hscode === code) {
      res = `${e.A}%(A) ${e.C}%(C) ${e.FCN1}%(FCN1)`;
    }
  });
  return res;
};
const getMaxRate = (rate, hscode) => {
  let code = hscode.substring(0, 4) + hscode.substring(5, 7) + hscode.substring(8);
  let minValue = 101;
  rate.forEach(e => {
    if (e.hscode === code) {
      if (!isNaN(e.A)) {
        minValue = Math.min(Number(e.A), minValue);
      }
      if (!isNaN(e.C)) {
        minValue = Math.min(Number(e.C), minValue);
      }
      if (!isNaN(e.FCN1)) {
        minValue = Math.min(Number(e.FCN1), minValue);
      }
    }
  });
  if (minValue === 101) {
    return 'X';
  } else {
    return minValue;
  }
};
const costInputChange = (e, shippingCosts, setShippingCosts) => {
  let id = e.target.id;
  let newCosts = {
    aboardCost: shippingCosts.aboardCost,
    domesticCost: shippingCosts.domesticCost,
    serviceCost: shippingCosts.serviceCost,
  };
  if (id === 'aboardCost') {
    newCosts.aboardCost = e.target.value;
  } else if (id === 'domesticCost') {
    newCosts.domesticCost = e.target.value;
  } else if (id === 'serviceCost') {
    newCosts.serviceCost = e.target.value;
  }
  setShippingCosts(newCosts);
};
const saveShippingCosts = async shippingCosts => {
  await setDoc(doc(dbService, 'cost', 'shippingCosts'), shippingCosts);
};
const DataList = () => {
  const [editable, setEditable] = useState(false);
  const [exchange, setExchange] = useState({ CNY: 0, USD: 0 });
  const [rate, setRate] = useState([]);
  const [loadingImg, setLoadingImg] = useState(false);
  const [productList, setProductList] = useState([]);
  const [shippingCosts, setShippingCosts] = useState({
    aboardCost: 0,
    domesticCost: 0,
    serviceCost: 0,
  });
  const [isOpen, setIsOpen] = useState(-1);
  const [running, setRunning] = useState(false);
  let hscodes = [];
  useEffect(() => {
    getObj(setProductList);
    getCost(setShippingCosts);
    getExchangeRate(setExchange);
  }, []);
  useEffect(() => {
    if (!loadingImg) {
      for (let i = 0; i < productList.length; i++) {
        downloadImg(productList, i);
      }
      if (productList.length !== 0) {
        setLoadingImg(true);
      }
    }
  }, [productList, loadingImg]);
  useEffect(() => {
    if (!editable && isOpen === -1) {
      loadRateData(productList, setRate, hscodes);
    }
  }, [productList, editable, isOpen]);
  return (
    <>
      <Main running={running}>
        <Modal isOpen={isOpen !== -1} style={{ overlay: { zIndex: 1000 } }} ariaHideApp={false}>
          {isOpen !== -1 && (
            <>
              <ModalHeader>
                <img src={document.getElementById(`img${isOpen}`).src} alt="" />
                <p>{productList[isOpen]['ko']}</p>
              </ModalHeader>
              <ModalLabel>
                <label htmlFor="shippingCost">- 개당 현지 배송비는 얼마인가요?</label>¥
                <input
                  type={'number'}
                  id={`shippingCost${isOpen}`}
                  onChange={e => inputChange(e, productList, setProductList, isOpen)}
                  value={productList[isOpen].shippingCost}
                ></input>
              </ModalLabel>
              <ModalLabel>
                <label htmlFor="countPerOne">- 한 박스에 몇개가 들어가나요?</label>
                <input
                  type={'number'}
                  id={`countPerOne${isOpen}`}
                  onChange={e => inputChange(e, productList, setProductList, isOpen)}
                  value={productList[isOpen].countPerOne}
                ></input>
                EA
              </ModalLabel>
              <ModalLabel>
                <label>- 한 박스의 크기가 어떻게 되나요?</label>
                <input
                  type={'number'}
                  id={`x${isOpen}`}
                  onChange={e => inputChange(e, productList, setProductList, isOpen)}
                  value={productList[isOpen].size.x}
                />
                *
                <input
                  type={'number'}
                  id={`y${isOpen}`}
                  onChange={e => inputChange(e, productList, setProductList, isOpen)}
                  value={productList[isOpen].size.y}
                />
                *
                <input
                  type={'number'}
                  id={`z${isOpen}`}
                  onChange={e => inputChange(e, productList, setProductList, isOpen)}
                  value={productList[isOpen].size.z}
                />
                cm
              </ModalLabel>
              <ModalLabel>
                <button
                  onClick={async () => {
                    await setDoc(
                      doc(dbService, 'items', productList[isOpen].id),
                      productList[isOpen],
                    );
                    setIsOpen(-1);
                    alert('저장 되었습니다.');
                  }}
                >
                  저장
                </button>
                <button onClick={() => setIsOpen(-1)}>취소</button>
              </ModalLabel>
            </>
          )}
        </Modal>
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
                <SettingBox>
                  <label>CBM당 해운비 설정</label>
                  <InputCost
                    type="number"
                    readOnly={!editable}
                    onChange={e => costInputChange(e, shippingCosts, setShippingCosts)}
                    id="aboardCost"
                    value={shippingCosts.aboardCost}
                    as="input"
                  />
                </SettingBox>
                <SettingBox>
                  <label>국내운송비</label>
                  <InputCost
                    type="number"
                    readOnly={!editable}
                    onChange={e => costInputChange(e, shippingCosts, setShippingCosts)}
                    id="domesticCost"
                    value={shippingCosts.domesticCost}
                    as="input"
                  />
                </SettingBox>
                <SettingBox>
                  <label>용역비</label>
                  <InputCost
                    type="number"
                    readOnly={!editable}
                    onChange={e => costInputChange(e, shippingCosts, setShippingCosts)}
                    id="serviceCost"
                    value={shippingCosts.serviceCost}
                    as="input"
                  />
                </SettingBox>
              </div>

              <div>
                {editable && (
                  <button
                    onClick={() => {
                      onDelete(productList, setProductList, setEditable);
                    }}
                  >
                    삭제
                  </button>
                )}
                <button
                  id="saveBtn"
                  onClick={() => {
                    setEditable(prev => !prev);
                    if (editable) {
                      getObj(setProductList);
                      getCost(setShippingCosts);
                    }
                  }}
                >
                  {editable ? '취소' : '수정하기'}
                </button>
                {editable ? (
                  <button
                    onClick={() => {
                      saveShippingCosts(shippingCosts);
                      setEditable(prev => !prev);
                      onSave(productList, false, setProductList, setShippingCosts, setRunning);
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
                        setProductList,
                        setShippingCosts,
                        setRunning,
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
              <th>넘버</th>
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
              <th>예상원가</th>
            </Row>
          </thead>
          <tbody>
            {dataRows(
              editable,
              productList,
              setProductList,
              rate,
              setIsOpen,
              shippingCosts,
              exchange,
            )}
          </tbody>
        </Table>
      </Main>
      <Spinner running={running}>잠시만 기다려주세요.</Spinner>
    </>
  );
};

export { DataList };
