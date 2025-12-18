const { readFileSync } = require('fs');
const path = require('path');
const genDiff = require('../index.js');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('gendiff', () => {
  test('should compare flat JSON files with stylish format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFixture('expected_flat_stylish.txt');
    
    expect(genDiff(file1, file2)).toBe(expected);
  });
  
  test('should compare flat YAML files with stylish format', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    const expected = readFixture('expected_flat_stylish.txt');
    
    expect(genDiff(file1, file2)).toBe(expected);
  });
  
  test('should compare nested JSON files with stylish format', () => {
    const file1 = getFixturePath('nested1.json');
    const file2 = getFixturePath('nested2.json');
    const expected = readFixture('expected_nested_stylish.txt');
    
    expect(genDiff(file1, file2)).toBe(expected);
  });
  
  test('should compare nested YAML files with stylish format', () => {
    const file1 = getFixturePath('nested1.yml');
    const file2 = getFixturePath('nested2.yml');
    const expected = readFixture('expected_nested_stylish.txt');
    
    expect(genDiff(file1, file2)).toBe(expected);
  });
  
  test('should compare nested files with plain format', () => {
    const file1 = getFixturePath('nested1.json');
    const file2 = getFixturePath('nested2.json');
    const expected = readFixture('expected_plain.txt');
    
    expect(genDiff(file1, file2, 'plain')).toBe(expected);
  });
  
  test('should compare nested files with json format', () => {
    const file1 = getFixturePath('nested1.json');
    const file2 = getFixturePath('nested2.json');
    const result = genDiff(file1, file2, 'json');
    
    expect(() => JSON.parse(result)).not.toThrow();
    expect(typeof result).toBe('string');
  });
});
