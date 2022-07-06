import { useEffect, useState } from 'react';
import { exchangeHscodeFormat } from '../utils';

function useProductList() {
  const [productList, setProductList] = useState([]);
  const [changedProduct, setChangedProduct] = useState([]);

  useEffect(() => {
    console.log(changedProduct);
  }, [changedProduct]);
  const inputChange = (e, i) => {
    const newProductList = [...productList];
    const target = e.target.id;
    const isSize = target === 'x' || target === 'y' || target === 'z';
    let value = e.target.value;

    if (target === 'hscode') {
      value = exchangeHscodeFormat({ hscode: value });
    }
    if (isSize) {
      newProductList[i]['size'][target] = value;
    } else {
      newProductList[i][target] = value;
    }
    setProductList(newProductList);
    setChangedProduct(prev => [...prev, i]);
  };

  return { changedProduct, productList, setProductList, inputChange };
}

export default useProductList;
