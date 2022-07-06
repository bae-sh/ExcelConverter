import { ImgBox, Input, PriceInput, RateSpan, Row } from './style';

function DataRow({
  i,
  editable,
  inputChange,
  productList,
  shippingCosts,
  getMaxRate,
  rate,
  exchange,
  showRate,
  setIsOpenNumber,
}) {
  let A =
    (5 * productList[i].countPerOne * 1000000) /
    (productList[i].size.x * productList[i].size.y * productList[i].size.z);
  let predictCost =
    ((A * (Number(productList[i].price) + Number(productList[i].shippingCost)) +
      (5 * Number(shippingCosts.aboardCost) + 400) +
      ((Number(productList[i].price) * A) / 10) *
        (1 + 0.11 * getMaxRate(rate, productList[i].hscode))) *
      Number(exchange.CNY) +
      33000 +
      Number(shippingCosts.domesticCost) +
      Number(shippingCosts.serviceCost)) /
    A;
  return (
    <Row key={i} id={i}>
      <td>
        <Input
          type="text"
          readOnly={!editable}
          onChange={e => inputChange(e, i)}
          id="indexNumber"
          size={5}
          as="input"
          value={productList[i]['indexNumber']}
        />
      </td>
      <td>
        <ImgBox>
          <img src="" alt="" id={`img${i}`} />
        </ImgBox>
      </td>
      <td>
        <Input
          type="text"
          readOnly={!editable}
          onChange={e => inputChange(e, i)}
          id="ko"
          value={productList[i]['ko']}
        ></Input>
      </td>
      <td>
        <Input
          readOnly={!editable}
          onChange={e => inputChange(e, i)}
          id="en"
          value={productList[i]['en']}
        ></Input>
      </td>
      <td>
        <Input
          readOnly={!editable}
          onChange={e => inputChange(e, i)}
          id="ch"
          value={productList[i]['ch']}
        ></Input>
      </td>
      <td>
        <Input
          size={15}
          readOnly={!editable}
          id="number"
          onChange={e => inputChange(e, i)}
          value={productList[i]['number']}
        ></Input>
      </td>
      <td>
        <Input
          size={10}
          readOnly={!editable}
          onChange={e => inputChange(e, i)}
          id="texture"
          value={productList[i]['texture']}
          as="input"
        ></Input>
        <Input
          size={10}
          readOnly={!editable}
          onChange={e => inputChange(e, i)}
          id="Kotexture"
          value={productList[i]['Kotexture']}
          as="input"
        ></Input>
      </td>
      <td>
        <Input
          size={10}
          readOnly={!editable}
          onChange={e => inputChange(e, i)}
          id="amount"
          value={productList[i]['amount']}
          as="input"
        ></Input>
      </td>
      <td>
        <span>¥</span>
        <PriceInput
          size={10}
          readOnly={!editable}
          onChange={e => inputChange(e, i)}
          id="price"
          value={productList[i]['price']}
        ></PriceInput>
      </td>
      <td>
        <Input
          readOnly={!editable}
          onChange={e => inputChange(e, i)}
          id="hscode"
          value={productList[i]['hscode']}
          as="input"
          maxLength="12"
        ></Input>
        <RateSpan>{showRate(rate, productList[i]['hscode'])}</RateSpan>
      </td>
      <td>
        <Input
          size={15}
          readOnly={!editable}
          id="info"
          onChange={e => inputChange(e, i)}
          value={productList[i]['info']}
        ></Input>
      </td>
      <td>
        <div>
          <p>{isNaN(predictCost) ? 'X' : `${Math.round(predictCost)} 원`}</p>
          <button onClick={() => setIsOpenNumber(i)}>수정</button>
        </div>
      </td>
    </Row>
  );
}

export default DataRow;
