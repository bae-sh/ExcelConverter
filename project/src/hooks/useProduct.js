import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { changedProductRecoil } from '../atom';
import { exchangeHscodeFormat } from '../utils';

function useProduct({ productDefault }) {
  const [product, setProduct] = useState(productDefault);

  const setChangedProduct = useSetRecoilState(changedProductRecoil);

  const inputChange = e => {
    const newProduct = { ...product };
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
    setChangedProduct(prev => {
      const newProducts = [newProduct];
      prev.forEach(curItem => {
        if (curItem.id !== newProduct.id) newProducts.push(curItem);
      });
      return newProducts;
    });
  };

  return { product, inputChange };
}

export default useProduct;
