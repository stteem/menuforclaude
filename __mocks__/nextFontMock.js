// Mock for next/font
module.exports = function() {
  return {
    className: 'mocked-font',
    variable: '--mocked-font-variable',
    style: { fontFamily: 'mocked-font' }
  };
};

// Add named exports for specific font functions
module.exports.Inter = module.exports;
module.exports.Lora = module.exports;
module.exports.Work_Sans = module.exports;
module.exports.default = module.exports;