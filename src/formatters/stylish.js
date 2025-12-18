const stylish = (tree) => {
  const formatValue = (value, depth) => {
    if (value === null) return 'null';
    if (typeof value === 'boolean') return value.toString();
    if (typeof value !== 'object') return String(value);
    
    const indent = ' '.repeat(depth * 4);
    const bracketIndent = ' '.repeat((depth - 1) * 4);
    
    const entries = Object.entries(value);
    const formattedEntries = entries.map(([key, val]) => {
      return `${indent}${key}: ${formatValue(val, depth + 1)}`;
    });
    
    return `{\n${formattedEntries.join('\n')}\n${bracketIndent}}`;
  };
  
  const iter = (nodes, depth) => {
    const indent = ' '.repeat(depth * 4);
    const bracketIndent = ' '.repeat((depth - 1) * 4);
    
    const lines = nodes.map((node) => {
      const { key, type } = node;
      
      switch (type) {
        case 'added':
          return `${indent.slice(0, -2)}+ ${key}: ${formatValue(node.value, depth + 1)}`;
        case 'removed':
          return `${indent.slice(0, -2)}- ${key}: ${formatValue(node.value, depth + 1)}`;
        case 'updated':
          return [
            `${indent.slice(0, -2)}- ${key}: ${formatValue(node.oldValue, depth + 1)}`,
            `${indent.slice(0, -2)}+ ${key}: ${formatValue(node.value, depth + 1)}`,
          ].join('\n');
        case 'nested':
          return `${indent}${key}: {\n${iter(node.children, depth + 1)}\n${indent}}`;
        case 'unchanged':
          return `${indent}${key}: ${formatValue(node.value, depth + 1)}`;
        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });
    
    return lines.flat().join('\n');
  };
  
  return `{\n${iter(tree, 1)}\n}`;
};

module.exports = stylish;
