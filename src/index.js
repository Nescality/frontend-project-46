const parseFile = require('./parsers.js');
const buildTree = require('./treeBuilder.js');
const getFormatter = require('./formatters/index.js');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  
  const tree = buildTree(data1, data2);
  const format = getFormatter(formatName);
  
  return format(tree);
};

module.exports = genDiff;
