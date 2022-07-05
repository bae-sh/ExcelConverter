const exchangeHscodeFormat = ({ hscode }) => {
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

export { exchangeHscodeFormat };
