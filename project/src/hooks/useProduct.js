import { useState } from 'react';
import { exchangeHscodeFormat } from '../utils';

function useProduct({ productDefault, changedProduct }) {
  const [product, setProduct] = useState(productDefault);

  const inputChange = e => {
    const newProduct = { ...product };
    console.log(newProduct);
    const target = e.target.id;
    const isSize = target === 'x' || target === 'y' || target === 'z';
    let value = e.target.value;
    if (target === 'hscode') {
      value = exchangeHscodeFormat({ hscode: value });
    } else if (target === 'indexNumber') {
      value = Number(value);
    }

    if (isSize) {
      newProduct['size'][target] = value;
    } else {
      newProduct[target] = value;
    }
    setProduct(newProduct);
    changedProduct[newProduct.id] = newProduct;
  };

  return { product, inputChange, setProduct };
}

export default useProduct;
