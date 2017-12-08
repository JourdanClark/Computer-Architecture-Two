module.exports = function() {
  let value = ~~(this.reg[this.mem[++this.reg.PC]] / this.reg[this.mem[++this.reg.PC]]);
  return this.reg[this.reg.current] = value;
}

module.exports._code = 0b00000111;
module.exports._name = 'DIV';
