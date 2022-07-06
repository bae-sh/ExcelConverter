export const exchangeHscodeFormat = ({ hscode }) => {
  let chagnedHscode = hscode;

  if (chagnedHscode.length === 5) {
    if (chagnedHscode[4] !== '.') {
      chagnedHscode = chagnedHscode.substring(0, 4) + '.' + chagnedHscode.substring(4);
    } else {
      chagnedHscode = chagnedHscode.substring(0, 4);
    }
  } else if (chagnedHscode.length === 8) {
    if (chagnedHscode[7] !== '-') {
      chagnedHscode = chagnedHscode.substring(0, 7) + '-' + chagnedHscode.substring(7);
    } else {
      chagnedHscode = chagnedHscode.substring(0, 7);
    }
  }

  return chagnedHscode;
};

export const getMaxRate = (rate, hscode) => {
  let code = hscode.substring(0, 4) + hscode.substring(5, 7) + hscode.substring(8);
  let minValue = 101;
  rate.forEach(e => {
    if (e.hscode === code) {
      if (!isNaN(e.A)) {
        minValue = Math.min(Number(e.A), minValue);
      }
      if (!isNaN(e.C)) {
        minValue = Math.min(Number(e.C), minValue);
      }
      if (!isNaN(e.FCN1)) {
        minValue = Math.min(Number(e.FCN1), minValue);
      }
    }
  });
  if (minValue === 101) {
    return 'X';
  } else {
    return minValue;
  }
};

export const showRate = (rate, hscode) => {
  let code = hscode.substring(0, 4) + hscode.substring(5, 7) + hscode.substring(8);
  let res;
  rate.forEach(e => {
    if (e.hscode === code) {
      res = `${e.A}%(A) ${e.C}%(C) ${e.FCN1}%(FCN1)`;
    }
  });
  return res;
};
