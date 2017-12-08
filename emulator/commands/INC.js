module.exports = function() {
  let value = this.reg[this.reg.current] + 1;
  if (value > 255)
    value = 0;
  return this.reg[this.reg.current] = value;
}

module.exports._code = 0b00010000;
module.exports._name = 'INC';
