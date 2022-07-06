import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { Link } from 'react-router-dom';
import exceljs from '../../excel';
import { dbService } from '../../firebase';
import { getCost, getObj, saveShippingCosts } from './firebaseFns';
import ShippingWarpper from './ShippingWrapper';
import { ExchangeBox, Header, SaveDiv, Title } from './style';

const onDelete = ({ productList, setProductList, setEditable }) => {
  if (window.confirm('삭제하시겠습니까?')) {
    const storage = getStorage();

    productList.forEach(async product => {
      const { indexNumber, id } = product;
      if (indexNumber === 'x') {
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
    });

    getObj(setProductList);
    alert('삭제되었습니다.');
    setEditable(prev => !prev);
  }
};

export const onClickExcel = async (
  productList,
  exchange,
  setProductList,
  setShippingCosts,
  setRunning,
) => {
  const newObj = [];
  productList.forEach((product, i) => {
    const { number, price } = product;
    const obj = { ...product };

    if (number) {
      obj['price'] = `$ ${(
        (Number(price) * Number(exchange['CNY'])) /
        Number(exchange['USD'])
      ).toFixed(2)}`;
      obj['idx'] = i;
      newObj.push(obj);
    }
  });
  setRunning(true);
  const isExcel = await exceljs(newObj);
  if (isExcel) {
    onSave(productList, true, setProductList, setShippingCosts, setRunning);
  }
};
const onSave = async (
  productList,
  reset = false,
  setProductList,
  setShippingCosts,
  setRunning,
  changedProduct,
) => {
  changedProduct.forEach(async index => {
    const obj = { ...productList[index] };
    if (reset && obj['number']) {
      obj['number'] = '';
      obj['amount'] = '';
    }

    setRunning(true);
    await setDoc(doc(dbService, 'items', obj['id']), obj);
    setRunning(false);
  });

  getObj(setProductList);
  getCost(setShippingCosts);
  if (!reset) {
    alert('저장되었습니다.');
  }
};
function DataListHeader({
  exchange,
  editable,
  shippingCosts,
  costInputChange,
  productList,
  setProductList,
  setEditable,
  setShippingCosts,
  setRunning,
  changedProduct,
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
              <button onClick={() => onDelete({ productList, setProductList, setEditable })}>
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
                  onSave(
                    productList,
                    false,
                    setProductList,
                    setShippingCosts,
                    setRunning,
                    changedProduct,
                  );
                }}
              >
                저장하기
              </button>
            ) : (
              <button
                onClick={() =>
                  onClickExcel(productList, exchange, setProductList, setShippingCosts, setRunning)
                }
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
