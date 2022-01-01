exports.formatFloat = (number) => {
  return parseFloat(parseFloat(number.replace(' ', '').replace(',', '.')).toFixed(2));
};

exports.formatInt = (number) => {
  return parseInt(number.replace(' ', ''), 10);
};
