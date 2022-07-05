import { Main, SaveDiv, Title } from './style';
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { dbService } from '../../firebase';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DataSaveTable from './DataSaveTable';

const initialCode = Array(20).fill('');

const onClick = async navigate => {
  const storage = getStorage();

  for (let i = 0; i < 20; i++) {
    let rows = document.getElementById(i);
    let file = rows.childNodes[1].childNodes[2].files[0];
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
    let id = uuidv4();
    let date = new Date();
    const storageRef = ref(storage, id);

    if (file) {
      let obj = {
        ko: ko,
        en: en,
        ch: ch,
        texture: texture,
        price: price,
        hscode: hscode,
        id: id,
        date: date,
        number: number,
        amount: amount,
        info: info,
        Kotexture: Kotexture,
        shippingCost: 1,
        countPerOne: 1,
        size: { x: 1, y: 1, z: 1 },
        indexNumber: 0,
      };
      await setDoc(doc(dbService, 'items', id), obj);
      uploadBytes(storageRef, file);
    }
  }
  alert('저장되었습니다.');
  navigate('/');
};

const DataSave = () => {
  const navigate = useNavigate();
  const [hscodes, setHscodes] = useState(initialCode);
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
      <DataSaveTable hscodes={hscodes} setHscodes={setHscodes} />
    </Main>
  );
};

export default DataSave;
