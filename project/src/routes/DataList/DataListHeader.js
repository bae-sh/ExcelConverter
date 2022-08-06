import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import exceljs from '../../excel';
import { dbService } from '../../firebase';
import { saveOrder, saveShippingCosts } from './firebaseFns';
import ShippingWarpper from './ShippingWrapper';
import { ExchangeBox, Header, SaveDiv, Title } from './style';

const onClickExcel = async ({ productList, exchange, setRunning, currentOption }) => {
  const newObj = [];
  const changedProduct = [];

  productList.forEach((product, i) => {
    const { number, price } = product;
    const obj = { ...product };

    if (currentOption === '전체' || currentOption === obj.sort) {
      if (number) {
        changedProduct.push({ ...product });

        obj['price'] = `$ ${(
          (Number(price) * Number(exchange['CNY'])) /
          Number(exchange['USD'])
        ).toFixed(2)}`;
        obj['idx'] = i;
        newObj.push(obj);
      }
    }
  });

  const isExcel = await exceljs(newObj);
  if (isExcel) {
    onSave({ productList, reset: true, setRunning, changedProduct });
  } else {
    setRunning(false);
  }
};

const onSave = async ({ productList, reset = false, setRunning, changedProduct }) => {
  setRunning(true);
  if (!reset) {
    saveOrder(productList);
  }

  for (const product of changedProduct) {
    const obj = { ...product };
    if (obj['sort'] === '삭제') {
      await deleteDoc(doc(dbService, 'items', obj['id']));
    } else {
      if (reset) {
        if (obj['number']) {
          obj['number'] = '';
          obj['amount'] = obj['amount'].map(() => '');
        }
      }
      await setDoc(doc(dbService, 'items', obj['id']), obj);
    }
  }
  setRunning(false);

  if (!reset) {
    alert('저장되었습니다.');
  } else {
    alert('완료하였습니다.');
  }
};
function DataListHeader({
  exchange,
  editable,
  shippingCosts,
  costInputChange,
  productList,
  setEditable,
  setRunning,
  setCurrentOption,
  changedProduct,
  currentOption,
}) {
  return (
    <Header>
      <Title>
        <h1>데이터 목록</h1>
        <hr></hr>
        <SaveDiv>
          <div>
            <button>
              <Link to="/">뒤로가기</Link>
            </button>
            <select onChange={e => setCurrentOption(e.target.value)}>
              <option>전체</option>
              <option>루시아이</option>
              <option>더이브닝</option>
            </select>
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
            <button
              id="saveBtn"
              onClick={() => {
                setEditable(prev => !prev);
              }}
            >
              {editable ? '취소' : '수정하기'}
            </button>
            {editable ? (
              <button
                onClick={() => {
                  saveShippingCosts(shippingCosts);
                  setEditable(prev => !prev);
                  onSave({
                    productList,
                    reset: false,
                    setRunning,
                    changedProduct: Object.values(changedProduct),
                  });
                }}
              >
                저장하기
              </button>
            ) : (
              <button
                onClick={() => {
                  onClickExcel({ productList, exchange, setRunning, currentOption });
                }}
              >
                Excel
              </button>
            )}
          </div>
        </SaveDiv>
      </Title>
    </Header>
  );
}

export default DataListHeader;
