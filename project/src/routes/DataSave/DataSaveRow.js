import { useState } from 'react';
import { exchangeHscodeFormat } from '../../utils';
import { ImgBox, ImgBtn, Input, LableForIgmBtn, PriceInput, Row } from './style';

const selectImg = (img, i) => {
  const preview = new FileReader();
  preview.onload = e => {
    document.getElementById(`img${i}`).src = e.target.result;
  };
  preview.readAsDataURL(img.target.files[0]);
};

const inputChange = ({ e, hscodes, setHscodes, index }) => {
  const newcodes = [...hscodes];
  const hscode = e.target.value;
  const newCode = exchangeHscodeFormat({ hscode });

  newcodes[index] = newCode;
  setHscodes(newcodes);
};

function DataSaveRow({ index, hscodes, setHscodes, countSize, setCountSize }) {
  const [product, setProduct] = useState({});
  const onClickPlusBtn = () => {
    const newProduct = { ...product };

    newProduct['amount'].push('');
    newProduct['price'].push('');
    newProduct['sortOfSize'].push('');
    setProduct(newProduct);
  };
  const onClickMinusBtn = () => {
    const newProduct = { ...product };
    if (newProduct['sortOfSize'].length !== 1) {
      newProduct['amount'].pop();
      newProduct['price'].pop();
      newProduct['sortOfSize'].pop();
      setProduct(newProduct);
    }
  };
  return (
    <Row id={index} key={index}>
      <td>{index + 1}</td>
      <td>
        <ImgBox>
          <img src="" alt="" id={`img${index}`} />
        </ImgBox>
        <LableForIgmBtn htmlFor={`file${index}`}>업로드</LableForIgmBtn>
        <ImgBtn type="file" id={`file${index}`} onChange={img => selectImg(img, index)}></ImgBtn>
      </td>

      <td>
        <Input id="ko"></Input>
      </td>
      <td>
        <Input id="en"></Input>
      </td>
      <td>
        <Input id="ch"></Input>
      </td>

      <td>
        <Input id="number"></Input>
      </td>
      <td>
        <Input size={10} id="texture" as="input"></Input>
        <Input size={10} id="Kotexture" as="input"></Input>
      </td>
      <td>
        <Input id="amount" as="input" type="number"></Input>
      </td>
      <td>
        <span>¥</span>
        <PriceInput size={10} id="price" type="number"></PriceInput>
      </td>
      <td>
        <Input id="sizeOfSort" as="input"></Input>
        <div>
          <button onClick={onClickPlusBtn}>+</button>
          <button onClick={onClickMinusBtn}>-</button>
        </div>
      </td>
      <td>
        <Input
          value={hscodes[index]}
          id="hscode"
          onChange={e => inputChange({ e, hscodes, setHscodes, index })}
          maxLength="12"
          as="input"
        ></Input>
      </td>
      <td>
        <Input size={10} id="info"></Input>
      </td>
      <td>
        <select>
          <option>루시아이</option>
          <option>더이브닝</option>
        </select>
      </td>
    </Row>
  );
}

export default DataSaveRow;
