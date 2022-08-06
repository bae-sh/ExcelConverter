import { useState } from 'react';
import { exchangeHscodeFormat } from '../utils';

function useProduct({ productDefault, changedProduct }) {
  const [product, setProduct] = useState(productDefault);
  const [lengthOfSize, setLengthOfSize] = useState(product.amount.length);
  const inputChange = (e, idx) => {
    const newProduct = { ...product };
    const target = e.target.id;
    const isSize = target === 'x' || target === 'y' || target === 'z';
    const isArray = target === 'amount' || target === 'price' || target === 'sortOfSize';
    let value = e.target.value;
    if (target === 'hscode') {
      value = exchangeHscodeFormat({ hscode: value });
    }
    if (isSize) {
      newProduct['size'][target] = value;
    } else if (isArray) {
      newProduct[target][idx] = value;
    } else {
      newProduct[target] = value;
    }
    setProduct(newProduct);
    changedProduct[newProduct.id] = newProduct;
  };

  const onClickPlusBtn = () => {
    const newProduct = { ...product };

    newProduct['amount'].push('');
    newProduct['price'].push('');
    newProduct['sortOfSize'].push('');
    setProduct(newProduct);
    setLengthOfSize(prev => prev + 1);
    changedProduct[newProduct.id] = newProduct;
  };
  const onClickMinusBtn = () => {
    const newProduct = { ...product };
    if (newProduct['sortOfSize'].length !== 1) {
      newProduct['amount'].pop();
      newProduct['price'].pop();
      newProduct['sortOfSize'].pop();
      setProduct(newProduct);
      setLengthOfSize(prev => prev - 1);
      changedProduct[newProduct.id] = newProduct;
    }
  };
  return { product, inputChange, setProduct, onClickPlusBtn, onClickMinusBtn, lengthOfSize };
}

export default useProduct;
