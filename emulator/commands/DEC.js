module.exports = function() {
  let value = this.reg[this.reg.current] - 1;
  if (value < 0)
    value = 255;
  return this.reg[this.reg.current] = value;
}

module.exports._code = 0b00011000;
module.exports._name = 'DEC';
