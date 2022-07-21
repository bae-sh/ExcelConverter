import { useState } from 'react';
import { exchangeHscodeFormat } from '../utils';

function useProductList() {
  const [productList, setProductList] = useState([]);
  const [changedProduct, setChangedProduct] = useState([]);

  const inputChange = (e, i) => {
    const newProductList = [...productList];
    const target = e.target.id;
    const isSize = target === 'x' || target === 'y' || target === 'z';
    let value = e.target.value;
    if (target === 'hscode') {
      value = exchangeHscodeFormat({ hscode: value });
    } else if (target === 'indexNumber') {
      value = Number(value);
    }

    if (isSize) {
      newProductList[i]['size'][target] = value;
    } else {
      newProductList[i][target] = value;
    }
    setProductList(newProductList);
    setChangedProduct(prev => new Set([...prev, i]));
  };

  return { changedProduct, productList, setProductList, inputChange, setChangedProduct };
}

export default useProductList;
