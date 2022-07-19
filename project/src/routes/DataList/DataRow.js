import { getMaxRate, showRate } from '../../utils';
import SortBox from './SortBox';
import { ImgBox, Input, PriceInput, RateSpan, Row } from './style';

function DataRow({
  index,
  editable,
  inputChange,
  productList,
  shippingCosts,
  rate,
  exchange,
  currentOption,
  setIsOpenNumber,
  eveningNumber,
}) {
  const A =
    (5 * productList[index].countPerOne * 1000000) /
    (productList[index].size.x * productList[index].size.y * productList[index].size.z);
  const predictCost =
    ((A * (Number(productList[index].price) + Number(productList[index].shippingCost)) +
      (5 * Number(shippingCosts.aboardCost) + 400) +
      ((Number(productList[index].price) * A) / 10) *
        (1 + 0.11 * getMaxRate(rate, productList[index].hscode))) *
      Number(exchange.CNY) +
      33000 +
      Number(shippingCosts.domesticCost) +
      Number(shippingCosts.serviceCost)) /
    A;
  const isEvening = eveningNumber.includes(productList[index].id);
  const isView =
    currentOption === '전체' ||
    (currentOption === '루시아이' && !isEvening) ||
    (currentOption === '더이브닝' && isEvening);
  return (
    isView && (
      <Row key={index} id={index}>
        <td>
          <Input
            type="number"
            readOnly={!editable}
            onChange={e => inputChange(e, index)}
            id="indexNumber"
            as="input"
            value={productList[index]['indexNumber']}
            style={{ width: '40px' }}
          />
        </td>
        <td>
          <ImgBox>
            <img src="" alt="" id={`img${index}`} />
          </ImgBox>
        </td>
        <td>
          <Input
            type="text"
            readOnly={!editable}
            onChange={e => inputChange(e, index)}
            id="ko"
            value={productList[index]['ko']}
          ></Input>
        </td>
        <td>
          <Input
            readOnly={!editable}
            onChange={e => inputChange(e, index)}
            id="en"
            value={productList[index]['en']}
          ></Input>
        </td>
        <td>
          <Input
            readOnly={!editable}
            onChange={e => inputChange(e, index)}
            id="ch"
            value={productList[index]['ch']}
          ></Input>
        </td>
        <td>
          <Input
            size={15}
            readOnly={!editable}
            id="number"
            onChange={e => inputChange(e, index)}
            value={productList[index]['number']}
          ></Input>
        </td>
        <td>
          <Input
            size={10}
            readOnly={!editable}
            onChange={e => inputChange(e, index)}
            id="texture"
            value={productList[index]['texture']}
            as="input"
          ></Input>
          <Input
            size={10}
            readOnly={!editable}
            onChange={e => inputChange(e, index)}
            id="Kotexture"
            value={productList[index]['Kotexture']}
            as="input"
          ></Input>
        </td>
        <td>
          <Input
            size={10}
            readOnly={!editable}
            onChange={e => inputChange(e, index)}
            id="amount"
            value={productList[index]['amount']}
            as="input"
          ></Input>
        </td>
        <td>
          <span>¥</span>
          <PriceInput
            size={10}
            readOnly={!editable}
            onChange={e => inputChange(e, index)}
            id="price"
            value={productList[index]['price']}
          ></PriceInput>
        </td>
        <td>
          <Input
            readOnly={!editable}
            onChange={e => inputChange(e, index)}
            id="hscode"
            value={productList[index]['hscode']}
            as="input"
            maxLength="12"
          ></Input>
          <RateSpan>{showRate(rate, productList[index]['hscode'])}</RateSpan>
        </td>
        <td>
          <Input
            size={15}
            readOnly={!editable}
            id="info"
            onChange={e => inputChange(e, index)}
            value={productList[index]['info']}
          ></Input>
        </td>
        <td>
          <div>
            <p>{isNaN(predictCost) ? 'X' : `${Math.round(predictCost)} 원`}</p>
            <button onClick={() => setIsOpenNumber(index)}>수정</button>
          </div>
        </td>
        <td>
          <SortBox
            editable={editable}
            inputChange={inputChange}
            index={index}
            productList={productList}
          />
        </td>
      </Row>
    )
  );
}

export default DataRow;
