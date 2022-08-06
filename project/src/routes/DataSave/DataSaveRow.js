import { useEffect, useState } from 'react';
import { exchangeHscodeFormat } from '../../utils';
import { ImgBox, ImgBtn, Input, LableForIgmBtn, PriceInput, Row } from './style';

const initailProduct = {
  ko: '',
  en: '',
  ch: '',
  number: '',
  texture: '',
  Kotexture: '',
  amount: [''],
  price: [''],
  sortOfSize: [''],
  hscode: '',
  info: '',
};
const selectImg = (img, i) => {
  const preview = new FileReader();
  preview.onload = e => {
    document.getElementById(`img${i}`).src = e.target.result;
  };
  preview.readAsDataURL(img.target.files[0]);
};

function DataSaveRow({ index: rowIndex, dataArr }) {
  const [product, setProduct] = useState(initailProduct);

  const onClickPlusBtn = () => {
    const newProduct = { ...product };
    newProduct['amount'].push('');
    newProduct['price'].push('');
    newProduct['sortOfSize'].push('');
    setProduct(newProduct);
    dataArr[rowIndex] = newProduct;
  };

  const onClickMinusBtn = () => {
    const newProduct = { ...product };
    if (newProduct['amount'].length !== 1) {
      newProduct['amount'].pop();
      newProduct['price'].pop();
      newProduct['sortOfSize'].pop();
      setProduct(newProduct);
      dataArr[rowIndex] = newProduct;
    }
  };

  const onChange = (e, index = 0) => {
    const newProduct = { ...product };
    const target = e.target.id;
    const isArray = target === 'amount' || target === 'price' || target === 'sortOfSize';
    let value = e.target.value;

    if (isArray) {
      newProduct[target][index] = value;
    } else {
      if (target === 'hscode') {
        value = exchangeHscodeFormat({ hscode: value });
      }
      newProduct[target] = value;
    }
    setProduct(newProduct);
    dataArr[rowIndex] = newProduct;
  };

  return (
    <Row id={rowIndex}>
      <td>{rowIndex + 1}</td>
      <td>
        <ImgBox>
          <img src="" alt="" id={`img${rowIndex}`} />
        </ImgBox>
        <LableForIgmBtn htmlFor={`file${rowIndex}`}>업로드</LableForIgmBtn>
        <ImgBtn
          type="file"
          id={`file${rowIndex}`}
          onChange={img => selectImg(img, rowIndex)}
        ></ImgBtn>
      </td>

      <td>
        <Input id="ko" value={product.ko} onChange={e => onChange(e)}></Input>
      </td>
      <td>
        <Input id="en" value={product.en} onChange={e => onChange(e)}></Input>
      </td>
      <td>
        <Input id="ch" value={product.ch} onChange={e => onChange(e)}></Input>
      </td>

      <td>
        <Input id="number" value={product.number} onChange={e => onChange(e)}></Input>
      </td>
      <td>
        <Input
          size={10}
          id="texture"
          value={product.texture}
          as="input"
          onChange={e => onChange(e)}
        ></Input>
        <Input
          size={10}
          id="Kotexture"
          value={product.Kotexture}
          as="input"
          onChange={e => onChange(e)}
        ></Input>
      </td>
      <td>
        {product.amount.map((amount, index) => (
          <div key={'amount' + index}>
            <Input
              id="amount"
              value={amount}
              as="input"
              type="number"
              onChange={e => onChange(e, index)}
            />
          </div>
        ))}
      </td>
      <td>
        {product.price.map((price, index) => (
          <div key={'price' + index}>
            <span>¥</span>
            <PriceInput
              size={10}
              id="price"
              type="number"
              value={price}
              onChange={e => onChange(e, index)}
            />
          </div>
        ))}
      </td>
      <td>
        {product.sortOfSize.map((size, index) => (
          <div key={'sortOfSize' + index}>
            <Input id="sortOfSize" as="input" value={size} onChange={e => onChange(e, index)} />
          </div>
        ))}

        <div>
          <button onClick={() => onClickPlusBtn({ product, setProduct })}>+</button>
          <button onClick={() => onClickMinusBtn({ product, setProduct })}>-</button>
        </div>
      </td>
      <td>
        <Input
          value={product.hscode}
          id="hscode"
          onChange={e => onChange(e)}
          maxLength="12"
          as="input"
        ></Input>
      </td>
      <td>
        <Input size={10} id="info" value={product.info} onChange={e => onChange(e)}></Input>
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
