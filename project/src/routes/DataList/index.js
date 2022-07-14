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
const hscodes = [];
const downloadImg = async (productList, i) => {
  const storage = getStorage();
  const starsRef = ref(storage, productList[i].id);
  return getDownloadURL(starsRef)
    .then(async url => {
      const response = await fetch(url);
      const data = await response.blob();
      let f = new File([data], 'null', { type: data.type });
      let preview = new FileReader();
      preview.onload = e => {
        if (document.getElementById(`img${i}`))
          document.getElementById(`img${i}`).src = e.target.result;
      };
      preview.readAsDataURL(f);
    })
    .catch(error => {
      // console.log(error);
    });
};

const loadRateData = async (productList, setRate) => {
  const promises = [];
  productList.forEach(async ({ hscode }) => {
    const code = hscode.substring(0, 4) + hscode.substring(5, 7) + hscode.substring(8);
    if (hscode.length === 12 && !hscodes.includes(code)) {
      hscodes.push(code);
      promises.push(getRate(code));
    }
  });

  const result = await Promise.all(promises);
  const newRates = result.filter(rate => rate);
  setRate(newRates);
};

const DataList = () => {
  const [editable, setEditable] = useState(false);
  const [exchange, setExchange] = useState({ CNY: 0, USD: 0 });
  const [rate, setRate] = useState([]);
  const [isOpenNumber, setIsOpenNumber] = useState(-1);
  const [running, setRunning] = useState(false);
  const [currentOption, setCurrentOption] = useState('전체');
  const [eveningNumber, setEveningNumber] = useState([]);
  const { shippingCosts, setShippingCosts, costInputChange } = useShippingCost();
  const { productList, setProductList, changedProduct, inputChange, setChangedProduct } =
    useProductList();

  useEffect(() => {
    setChangedProduct([]);
    getObj({ setProductList, setEveningNumber });
    getCost(setShippingCosts);
    getExchangeRate(setExchange);
    console.log('product 불러오기');
  }, [setShippingCosts, setExchange, setProductList, setChangedProduct, running, editable]);

  useEffect(() => {
    if (!editable) {
      for (let i = 0; i < productList.length; i++) {
        downloadImg(productList, i);
      }
      console.log('이미지 불러오기');
    }
  }, [productList, editable, currentOption]);

  useEffect(() => {
    if (!editable && isOpenNumber === -1) {
      loadRateData(productList, setRate);
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
        currentOption,
        key: index,
        eveningNumber: eveningNumber,
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
          setCurrentOption={setCurrentOption}
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
