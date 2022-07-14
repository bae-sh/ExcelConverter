import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { Link } from 'react-router-dom';
import exceljs from '../../excel';
import { dbService } from '../../firebase';
import { saveShippingCosts } from './firebaseFns';
import ShippingWarpper from './ShippingWrapper';
import { ExchangeBox, Header, SaveDiv, Title } from './style';

const onDelete = async ({ productList, setEditable, setRunning }) => {
  if (window.confirm('삭제하시겠습니까?')) {
    const storage = getStorage();
    setRunning(true);
    for (const product of productList) {
      const { sort, id } = product;
      if (sort === '삭제') {
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
    setRunning(false);
    alert('삭제되었습니다.');
    setEditable(prev => !prev);
  }
};

const onClickExcel = async ({ productList, exchange, setRunning }) => {
  const newObj = [];
  const changedProduct = [];

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
      changedProduct.push(i);
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
  for (const index of changedProduct) {
    const obj = { ...productList[index] };
    if (reset) {
      if (obj['number']) {
        obj['number'] = '';
        obj['amount'] = '';
      }
    }
    await setDoc(doc(dbService, 'items', obj['id']), obj);
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
  setProductList,
  setEditable,
  setRunning,
  changedProduct,
  setCurrentOption,
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
            {editable && (
              <button
                onClick={() => {
                  onDelete({ productList, setProductList, setEditable, setRunning });
                }}
              >
                삭제
              </button>
            )}
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
                  onSave({ productList, reset: false, setRunning, changedProduct });
                }}
              >
                저장하기
              </button>
            ) : (
              <button
                onClick={() => {
                  onClickExcel({ productList, exchange, setRunning });
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
