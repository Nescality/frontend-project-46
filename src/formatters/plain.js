const plain = (tree) => {
  const formatValue = (value) => {
    if (value === null) return 'null';
    if (typeof value === 'string') return `'${value}'`;
    if (typeof value === 'object' && !Array.isArray(value)) {
      return '[complex value]';
    }
    return String(value);
  };
  
  const iter = (nodes, path = '') => {
    const lines = nodes.flatMap((node) => {
      const currentPath = path ? `${path}.${node.key}` : node.key;
      
      switch (node.type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'updated':
          return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.value)}`;
        case 'nested':
          return iter(node.children, currentPath);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });
    
    return lines.filter(Boolean).join('\n');
  };
  
  return iter(tree);
};

module.exports = plain;
