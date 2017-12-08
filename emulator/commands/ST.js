module.exports = function() {
  return this.mem[this.mem[++this.reg.PC]] = this.reg[this.reg.current];
}

module.exports._code = 0b11000000;
module.exports._name = 'ST';
