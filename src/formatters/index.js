const stylish = require('./stylish.js');
const plain = require('./plain.js');
const jsonFormatter = require('./json.js');

const formatters = {
  stylish,
  plain,
  json: jsonFormatter,
};

module.exports = (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter;
};
