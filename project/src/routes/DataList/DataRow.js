import React, { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import useProduct from '../../hooks/useProduct';
import { getMaxRate, showRate } from '../../utils';
import SortBox from './SortBox';
import { ImgBox, Input, PriceInput, RateSpan, Row } from './style';

function DataRow({
  index,
  rate,
  editable,
  productList,
  shippingCosts,
  exchange,
  currentOption,
  setIsOpenNumber,
  eveningNumber,
  itemImg,
  changedProduct,
}) {
  const { product, inputChange, setProduct } = useProduct({
    productDefault: { ...productList[index] },
    changedProduct,
  });
  useEffect(() => {
    if (changedProduct[productList[index].id]) {
      setProduct(changedProduct[productList[index].id]);
    } else {
      setProduct(productList[index]);
    }
  }, [productList, index, setProduct, changedProduct]);

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
                onChange={e => inputChange(e)}
                id="ko"
                value={product['ko']}
              ></Input>
            </td>
            <td>
              <Input
                readOnly={!editable}
                onChange={e => inputChange(e)}
                id="en"
                value={product['en']}
              ></Input>
            </td>
            <td>
              <Input
                readOnly={!editable}
                onChange={e => inputChange(e)}
                id="ch"
                value={product['ch']}
              ></Input>
            </td>
            <td>
              <Input
                size={15}
                readOnly={!editable}
                id="number"
                onChange={e => inputChange(e)}
                value={product['number']}
              ></Input>
            </td>
            <td>
              <Input
                size={10}
                readOnly={!editable}
                onChange={e => inputChange(e)}
                id="texture"
                value={product['texture']}
                as="input"
              ></Input>
              <Input
                size={10}
                readOnly={!editable}
                onChange={e => inputChange(e)}
                id="Kotexture"
                value={product['Kotexture']}
                as="input"
              ></Input>
            </td>
            <td>
              <Input
                size={10}
                readOnly={!editable}
                onChange={e => inputChange(e)}
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
                onChange={e => inputChange(e)}
                id="price"
                value={product['price']}
              ></PriceInput>
            </td>
            <td>
              <Input
                size={1}
                readOnly={!editable}
                onChange={e => inputChange(e)}
                id="sortOfSize"
                value={product['sortOfSize']}
                as="input"
              ></Input>
              {editable && (
                <>
                  <button>+</button>
                  <button>-</button>
                </>
              )}
            </td>
            <td>
              <Input
                readOnly={!editable}
                onChange={e => inputChange(e)}
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
                onChange={e => inputChange(e)}
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

export default DataRow;
