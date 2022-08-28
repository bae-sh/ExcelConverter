import { Main, SaveDiv, Title } from './style';
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { dbService } from '../../firebase';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import DataSaveTable from './DataSaveTable';
import { getOrder } from '../DataList/firebaseFns';

const dataArr = new Array(20).fill({});
const onClick = async navigate => {
  const storage = getStorage();
  const orderObj = await getOrder();

  for (let i = 0; i < 20; i++) {
    const rows = document.getElementById(i);
    const file = rows.childNodes[1].childNodes[2].files[0];
    const { ko, en, ch, number, texture, Kotexture, amount, price, hscode, info, sortOfSize } =
      dataArr[i];
    const sort = rows.childNodes[12].childNodes[0].value;
    const id = uuidv4();
    const date = new Date();

    const storageRef = ref(storage, id);
    if (file) {
      const obj = {
        ko,
        en,
        ch,
        texture,
        price,
        hscode,
        id,
        date,
        number,
        amount,
        info,
        Kotexture,
        sort,
        sortOfSize,
        shippingCost: 1,
        countPerOne: 1,
        size: { x: 1, y: 1, z: 1 },
      };
      orderObj[id] = -1;
      await setDoc(doc(dbService, 'items', id), obj);
      uploadBytes(storageRef, file);
    }
  }
  await setDoc(doc(dbService, 'order', 'order'), orderObj);
  alert('저장되었습니다.');
  navigate('/');
};

const DataSave = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Title>
        <h1>데이터 작성</h1>
        <hr></hr>
        <SaveDiv>
          <button>
            <Link to="/">뒤로가기</Link>
          </button>

          <button onClick={() => onClick(navigate)}>저장</button>
        </SaveDiv>
      </Title>
      <DataSaveTable dataArr={dataArr} />
    </Main>
  );
};

export default DataSave;
