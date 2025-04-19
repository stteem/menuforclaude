// Mock for next/font/google
const createFont = function() {
  return {
    className: 'mocked-font',
    variable: '--mocked-font-variable',
    style: { fontFamily: 'mocked-font' }
  };
};

module.exports.Inter = createFont;
module.exports.Lora = createFont;
module.exports.Work_Sans = createFont;
module.exports.default = createFont;