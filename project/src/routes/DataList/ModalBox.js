import { ModalHeader, ModalLabel } from './style';
import Modal from 'react-modal';
import { doc, setDoc } from 'firebase/firestore';
import { dbService } from '../../firebase';

function ModalBox({ isOpenNumber, setIsOpenNumber, productList, inputChange, setProductList }) {
  return (
    <Modal isOpen={isOpenNumber !== -1} style={{ overlay: { zIndex: 1000 } }} ariaHideApp={false}>
      {isOpenNumber !== -1 && (
        <>
          <ModalHeader>
            <img src={document.getElementById(`img${isOpenNumber}`).src} alt="" />
            <p>{productList[isOpenNumber]['ko']}</p>
          </ModalHeader>
          <ModalLabel>
            <label htmlFor="shippingCost">- 개당 현지 배송비는 얼마인가요?</label>¥
            <input
              type={'number'}
              id={`shippingCost${isOpenNumber}`}
              onChange={e => inputChange(e, productList, setProductList, isOpenNumber)}
              value={productList[isOpenNumber].shippingCost}
            ></input>
          </ModalLabel>
          <ModalLabel>
            <label htmlFor="countPerOne">- 한 박스에 몇개가 들어가나요?</label>
            <input
              type={'number'}
              id={`countPerOne${isOpenNumber}`}
              onChange={e => inputChange(e, productList, setProductList, isOpenNumber)}
              value={productList[isOpenNumber].countPerOne}
            ></input>
            EA
          </ModalLabel>
          <ModalLabel>
            <label>- 한 박스의 크기가 어떻게 되나요?</label>
            <input
              type={'number'}
              id={`x${isOpenNumber}`}
              onChange={e => inputChange(e, productList, setProductList, isOpenNumber)}
              value={productList[isOpenNumber].size.x}
            />
            *
            <input
              type={'number'}
              id={`y${isOpenNumber}`}
              onChange={e => inputChange(e, productList, setProductList, isOpenNumber)}
              value={productList[isOpenNumber].size.y}
            />
            *
            <input
              type={'number'}
              id={`z${isOpenNumber}`}
              onChange={e => inputChange(e, productList, setProductList, isOpenNumber)}
              value={productList[isOpenNumber].size.z}
            />
            cm
          </ModalLabel>
          <ModalLabel>
            <button
              onClick={async () => {
                await setDoc(
                  doc(dbService, 'items', productList[isOpenNumber].id),
                  productList[isOpenNumber],
                );
                setIsOpenNumber(-1);
                alert('저장 되었습니다.');
              }}
            >
              저장
            </button>
            <button onClick={() => setIsOpenNumber(-1)}>취소</button>
          </ModalLabel>
        </>
      )}
    </Modal>
  );
}
export default ModalBox;
