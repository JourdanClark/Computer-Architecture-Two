module.exports = function() {
  return this.reg.current = this.mem[++this.reg.PC];
}

module.exports._code = 0b11111111;
module.exports._name = 'SET';
