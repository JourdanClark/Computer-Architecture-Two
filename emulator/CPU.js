const fs = require('fs');
const CommandManager = require('./commands/Manager');

class CPU {
  constructor() {
    this.mem = new Array(256);
    this.mem.fill(0);

    this.reg = new Array(256);
    this.reg.fill(0);

    this.reg.PC = 0;
    this.reg.current = 0;

    this.cm = new CommandManager();
    this.startClock();
  }

  get inst() {
    return this.mem || [];
  }

  set inst(instructions) {
    if (!Array.isArray(instructions))
      throw new Error('CPUError: instructions must be an Array! Use load(file) to load instructions.');
    instructions.forEach((instruction, index) => this.mem[index] = instruction);
  }

  load(file) {
    if (!fs.existsSync(file))
      throw new Error('CPUError: file does not exist!\n' + file);
    this.loadFromString(fs.readFileSync(file).toString());
  }

  loadFromString(string) {
    const inst = string.split('\n').reduce((arr, val) => {
      const comment = val.indexOf('#');
      if (comment >= 0)
        val = val.substring(0, comment);
      val = val.trim();
      if (val !== '')
        arr.push(parseInt(val, 2));
      return arr;
    }, []);
    this.inst = inst;
    console.info(`Loaded ${inst.length} instructions.`);
  }

  hasNext() {
    return this.inst.length - 1 > this.reg.PC;
  }

  next() {
    if (this.hasNext())
      return this.inst[++this.reg.PC];
  }

  exec(cmd) {
    const func = typeof cmd === 'function' ? cmd : this.cm[cmd];
    if (func === undefined)
      throw new Error('CPUError: Unknown command ' + cmd);
    if (this.debug === true)
      console.log(`00000000${func._code.toString(2)}`.slice(-8), func._name, '\n', ~~func.call(this));
    else
      func.call(this);
  }

  startClock() {
    this.stopClock();
    this.clock = setInterval(() => this.hasNext() ? this.exec(this.next()) : undefined, 100);
  }

  stopClock() {
    clearInterval(this.clock);
  }
}

module.exports = CPU;
