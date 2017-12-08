module.exports = function() {
  return this.reg[this.reg.current] = this.mem[++this.reg.PC];
}

module.exports._code = 0b10100000;
module.exports._name = 'SAVE';
