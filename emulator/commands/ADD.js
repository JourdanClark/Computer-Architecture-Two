module.exports = function() {
  let value = this.reg[this.mem[++this.reg.PC]] + this.reg[this.mem[++this.reg.PC]];
  while(value > 255)
    value -= 256;
  return this.reg[this.reg.current] = value;
}

module.exports._code = 0b00000001;
module.exports._name = 'ADD';
