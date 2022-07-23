import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { getMaxRate, showRate } from '../../utils';
import SortBox from './SortBox';
import { ImgBox, Input, PriceInput, RateSpan, Row } from './style';

function DataRow({
  index,
  editable,
  inputChange,
  product,
  shippingCosts,
  rate,
  exchange,
  currentOption,
  setIsOpenNumber,
  eveningNumber,
  itemImg,
}) {
  const A =
    (5 * product.countPerOne * 1000000) / (product.size.x * product.size.y * product.size.z);
  const predictCost =
    ((A * (Number(product.price) + Number(product.shippingCost)) +
      (5 * Number(shippingCosts.aboardCost) + 400) +
      ((Number(product.price) * A) / 10) * (1 + 0.11 * getMaxRate(rate, product.hscode))) *
      Number(exchange.CNY) +
      33000 +
      Number(shippingCosts.domesticCost) +
      Number(shippingCosts.serviceCost)) /
    A;
  const isEvening = eveningNumber.includes(product.id);
  const isView =
    currentOption === '전체' ||
    (currentOption === '루시아이' && !isEvening) ||
    (currentOption === '더이브닝' && isEvening);
  console.log('row');
  return (
    isView && (
      <Draggable key={product.id} draggableId={product.id} index={index} isDragDisabled={!editable}>
        {provided => (
          <Row
            key={index}
            id={index}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <td>{index + 1}</td>
            <td>
              <ImgBox>
                <img src={itemImg[product.id]} alt="" id={`img${index}`} />
              </ImgBox>
            </td>
            <td>
              <Input
                type="text"
                readOnly={!editable}
                onChange={e => inputChange(e, index)}
                id="ko"
                value={product['ko']}
              ></Input>
            </td>
            <td>
              <Input
                readOnly={!editable}
                onChange={e => inputChange(e, index)}
                id="en"
                value={product['en']}
              ></Input>
            </td>
            <td>
              <Input
                readOnly={!editable}
                onChange={e => inputChange(e, index)}
                id="ch"
                value={product['ch']}
              ></Input>
            </td>
            <td>
              <Input
                size={15}
                readOnly={!editable}
                id="number"
                onChange={e => inputChange(e, index)}
                value={product['number']}
              ></Input>
            </td>
            <td>
              <Input
                size={10}
                readOnly={!editable}
                onChange={e => inputChange(e, index)}
                id="texture"
                value={product['texture']}
                as="input"
              ></Input>
              <Input
                size={10}
                readOnly={!editable}
                onChange={e => inputChange(e, index)}
                id="Kotexture"
                value={product['Kotexture']}
                as="input"
              ></Input>
            </td>
            <td>
              <Input
                size={10}
                readOnly={!editable}
                onChange={e => inputChange(e, index)}
                id="amount"
                value={product['amount']}
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
                value={product['price']}
              ></PriceInput>
            </td>
            <td>
              <Input
                readOnly={!editable}
                onChange={e => inputChange(e, index)}
                id="hscode"
                value={product['hscode']}
                as="input"
                maxLength="12"
              ></Input>
              <RateSpan>{showRate(rate, product['hscode'])}</RateSpan>
            </td>
            <td>
              <Input
                size={15}
                readOnly={!editable}
                id="info"
                onChange={e => inputChange(e, index)}
                value={product['info']}
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
                product={product}
              />
            </td>
          </Row>
        )}
      </Draggable>
    )
  );
}

export default React.memo(DataRow);
