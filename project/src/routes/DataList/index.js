import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import exceljs from '../../excel';

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
import { dbService } from '../../firebase';
import { getStorage, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { getExchangeRate } from '../../getExchangeRate';
import { getRate } from '../../getRate';
import {
  ExchangeBox,
  Header,
  ImgBox,
  Input,
  Main,
  PriceInput,
  RateSpan,
  Row,
  SaveDiv,
  Spinner,
  Table,
  Title,
} from './style';
import ShippingWarpper from './ShippingWrapper';
import useShippingCost from '../../hooks/useShippingCost';
import ModalBox from './ModalBox';
import DataRow from './DataRow';
import useProductList from '../../hooks/useProductList';

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
      let check = rows.childNodes[0].childNodes[0].value;
      let id = productList[i].id;
      if (check === 'x') {
        const desertRef = ref(storage, id);
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
const saveShippingCosts = async shippingCosts => {
  await setDoc(doc(dbService, 'cost', 'shippingCosts'), shippingCosts);
};
const DataList = () => {
  const [editable, setEditable] = useState(false);
  const [exchange, setExchange] = useState({ CNY: 0, USD: 0 });
  const [rate, setRate] = useState([]);
  const [loadingImg, setLoadingImg] = useState(false);
  const [isOpenNumber, setIsOpenNumber] = useState(-1);
  const [running, setRunning] = useState(false);
  const { shippingCosts, setShippingCosts, costInputChange } = useShippingCost();
  const { productList, setProductList, inputChange } = useProductList();
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
    if (!editable && isOpenNumber === -1) {
      loadRateData(productList, setRate, hscodes);
    }
  }, [productList, editable, isOpenNumber]);
  console.log(editable);
  const dataRows = () => {
    let rows = [];
    for (let i = 0; i < productList.length; i++) {
      rows.push(
        <DataRow
          i={i}
          editable={editable}
          inputChange={inputChange}
          productList={productList}
          setProductList={setProductList}
          shippingCosts={shippingCosts}
          getMaxRate={getMaxRate}
          rate={rate}
          exchange={exchange}
          showRate={showRate}
          setIsOpenNumber={setIsOpenNumber}
        />,
      );
    }
    return rows;
  };
  return (
    <>
      <Main running={running}>
        <ModalBox
          isOpenNumber={isOpenNumber}
          setIsOpenNumber={setIsOpenNumber}
          productList={productList}
          inputChange={inputChange}
          setProductList={setProductList}
        />
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
              <ShippingWarpper
                editable={editable}
                shippingCosts={shippingCosts}
                costInputChange={costInputChange}
              />
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
              setIsOpenNumber,
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
