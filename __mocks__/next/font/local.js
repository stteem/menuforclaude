// Mock for next/font/local
module.exports = function() {
  return {
    className: 'mocked-font',
    variable: '--mocked-font-variable',
    style: { fontFamily: 'mocked-font' }
  };
};

module.exports.default = module.exports;