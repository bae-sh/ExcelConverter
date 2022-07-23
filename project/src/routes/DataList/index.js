import { useCallback, useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getExchangeRate } from '../../getExchangeRate';
import { getRate } from '../../getRate';
import { Main, Row, Spinner, Table } from './style';
import useShippingCost from '../../hooks/useShippingCost';
import ModalBox from './ModalBox';
import DataRow from './DataRow';
import { HEADER_TITLE } from '../../constant';
import DataListHeader from './DataListHeader';
import { getCost, getObj } from './firebaseFns';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import { changedProductRecoil } from '../../atom';

const hscodes = [];
// new Set([...prev, i]);

const downloadImg = async ({ productList, setItemImg }) => {
  const storage = getStorage();
  const newItemImgs = {};
  productList.forEach(product => {
    const starsRef = ref(storage, product.id);
    getDownloadURL(starsRef)
      .then(async url => {
        const response = await fetch(url);
        const data = await response.blob();
        let f = new File([data], 'null', { type: data.type });
        let preview = new FileReader();
        preview.onload = e => {
          newItemImgs[product.id] = e.target.result;

          if (Object.keys(newItemImgs).length === productList.length) {
            setItemImg(newItemImgs);
          }
        };
        preview.readAsDataURL(f);
      })
      .catch(error => {
        // console.log(error);
      });
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
  const [itemImg, setItemImg] = useState({});
  const { shippingCosts, setShippingCosts, costInputChange } = useShippingCost();
  const [productList, setProductList] = useState([]);

  const setChangedProduct = useSetRecoilState(changedProductRecoil);

  useEffect(() => {
    setChangedProduct([]);
    getObj({ setProductList, setEveningNumber });
    getCost(setShippingCosts);
    getExchangeRate(setExchange);
    console.log('product 불러오기');
  }, [setShippingCosts, setExchange, setProductList, setChangedProduct, running, editable]);

  useEffect(() => {
    if (productList.length !== 0) {
      if (Object.keys(itemImg).length === 0) {
        console.log('itemImg');
        downloadImg({ productList, setItemImg });
      }
    }
  }, [productList, itemImg]);

  // useEffect(() => {
  //   if (productList.length !== 0) {
  //     if (rate.length === 0) {
  //       console.log('loadRateData');
  //       loadRateData(productList, setRate);
  //     }
  //   }
  // }, [productList, rate]);

  const dataRows = ({ itemImg }) => {
    return productList.map((_, index) => {
      const props = {
        index,
        editable,
        productList,
        shippingCosts,
        rate,
        exchange,
        setIsOpenNumber,
        currentOption,
        key: index,
        eveningNumber: eveningNumber,
        itemImg,
      };
      return <DataRow {...props} />;
    });
  };

  const onDragEnd = useCallback(
    result => {
      if (!result.destination) return;
      const items = [...productList];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setProductList(items);
    },
    [productList, setProductList],
  );
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="datas">
              {provided => (
                <tbody className="datas" {...provided.droppableProps} ref={provided.innerRef}>
                  {dataRows({ itemImg })}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </Main>
      {/* <ModalBox
        isOpenNumber={isOpenNumber}
        setIsOpenNumber={setIsOpenNumber}
        productList={productList}
        inputChange={inputChange}
        setProductList={setProductList}
      /> */}
      <Spinner running={running}>잠시만 기다려주세요.</Spinner>
    </>
  );
};

export { DataList };
