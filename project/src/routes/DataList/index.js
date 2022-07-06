import { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getExchangeRate } from '../../getExchangeRate';
import { getRate } from '../../getRate';
import { Main, Row, Spinner, Table } from './style';
import useShippingCost from '../../hooks/useShippingCost';
import ModalBox from './ModalBox';
import DataRow from './DataRow';
import useProductList from '../../hooks/useProductList';
import { HEADER_TITLE } from '../../constant';
import DataListHeader from './DataListHeader';
import { getCost, getObj } from './firebaseFns';

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

const loadRateData = async (productList, setRate) => {
  const hscodes = [];
  productList.forEach(async ({ hscode }) => {
    const code = hscode.substring(0, 4) + hscode.substring(5, 7) + hscode.substring(8);
    if (hscode.length === 12 && !hscodes.includes(code)) {
      hscodes.push(code);
    }
  });
  hscodes.forEach(code => {
    getRate(code, setRate);
  });
};

const DataList = () => {
  const [editable, setEditable] = useState(false);
  const [exchange, setExchange] = useState({ CNY: 0, USD: 0 });
  const [rate, setRate] = useState([]);
  const [loadingImg, setLoadingImg] = useState(false);
  const [isOpenNumber, setIsOpenNumber] = useState(-1);
  const [running, setRunning] = useState(false);
  const { shippingCosts, setShippingCosts, costInputChange } = useShippingCost();
  const { productList, setProductList, changedProduct, inputChange } = useProductList();

  useEffect(() => {
    getObj(setProductList);
    getCost(setShippingCosts);
    getExchangeRate(setExchange);
  }, [setShippingCosts, setExchange, setProductList]);

  useEffect(() => {
    console.log(productList);
  }, [productList]);

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
      loadRateData(productList, setRate);
      console.log(1);
    }
  }, [productList, editable, isOpenNumber]);

  const dataRows = () => {
    return productList.map((_, index) => {
      const props = {
        index,
        editable,
        inputChange,
        productList,
        shippingCosts,
        rate,
        exchange,
        setIsOpenNumber,
        key: index,
      };
      return <DataRow {...props} />;
    });
  };

  return (
    <>
      <Main running={running}>
        <DataListHeader
          exchange={exchange}
          editable={editable}
          shippingCosts={shippingCosts}
          costInputChange={costInputChange}
          productList={productList}
          setProductList={setProductList}
          setEditable={setEditable}
          setShippingCosts={setShippingCosts}
          setRunning={setRunning}
          changedProduct={changedProduct}
        />
        <Table>
          <thead>
            <Row>
              {HEADER_TITLE.map(title => (
                <th key={title}>{title}</th>
              ))}
            </Row>
          </thead>
          <tbody>{dataRows()}</tbody>
        </Table>
      </Main>
      <ModalBox
        isOpenNumber={isOpenNumber}
        setIsOpenNumber={setIsOpenNumber}
        productList={productList}
        inputChange={inputChange}
        setProductList={setProductList}
      />
      <Spinner running={running}>잠시만 기다려주세요.</Spinner>
    </>
  );
};

export { DataList };
