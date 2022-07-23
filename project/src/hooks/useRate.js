import { useState } from 'react';
import { getRate } from '../getRate';
import { exchangeHscodeFormat } from '../utils';

function useRate({ hscode }) {
  const [rate, setRate] = useState([]);

  const loadRateData = async (productList, setRate) => {
    const code = hscode.substring(0, 4) + hscode.substring(5, 7) + hscode.substring(8);
    if (hscode.length === 12) {
      const result = await getRate(code);
    }
    // console.log(result);
    // setRate(newRates);
  };

  return { rate };
}

export default useRate;
