import axios from 'axios';

let exchange = { CNY: 0, USD: 0 };
const getExchangeRate = async setExchange => {
  let response = await axios.get(
    'https://28460bjqo6.execute-api.ap-northeast-2.amazonaws.com/default/getExchangeRate',
  );
  let arr = response.data.elements[0].elements;
  arr.forEach(e => {
    if (e.elements) {
      if (e.elements.length > 2) {
        if (e.elements[3].elements[0].text === 'CNY') {
          exchange['CNY'] = e.elements[2].elements[0].text;
        } else if (e.elements[3].elements[0].text === 'USD') {
          exchange['USD'] = e.elements[2].elements[0].text;
        }
      }
    }
  });
  setExchange(exchange);
};

export { getExchangeRate };
