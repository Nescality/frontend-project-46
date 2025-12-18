const { readFileSync } = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const getFileExtension = (filepath) => path.extname(filepath).toLowerCase();

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const parse = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

const parseFile = (filepath) => {
  const data = readFile(filepath);
  const format = getFileExtension(filepath);
  return parse(data, format);
};

module.exports = parseFile;
