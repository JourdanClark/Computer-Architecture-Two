module.exports = function() {
  let value = this.reg[this.mem[++this.reg.PC]] - this.reg[this.mem[++this.reg.PC]];
  while(value < 0)
    value += 256;
  return this.reg[this.reg.current] = value;
}

module.exports._code = 0b00000011;
module.exports._name = 'SUB';
