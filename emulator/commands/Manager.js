const Commands = require('./');

class Manager {
  constructor(commands = []) {
    if (!Array.isArray(commands))
      commands = [commands];
    this.commands = Commands.concat(commands);
  }

  get commands() {
    return this._commands || [];
  }

  set commands(commands) {
    if (!Array.isArray(commands))
      throw new Error('CommandError: commands must be an Array! To register a single command, use registerCommand(command).');
    this._commands = commands;
    this.commands.forEach((command) => this.registerCommand(command));
  }

  getCommand(nameOrCode) {
    let code = nameOrCode;
    if (isNaN(parseInt(nameOrCode, 2))) // passed in a string that wasn't a code
      code = ~~this[code]._code;
    else if (typeof code === 'string')
      code = code.startsWith('0b') ? ~~code : parseInt(code, 2);
    return this[code];
  }

  getCommandCodeFromName(name) {
    return this[name]._code;
  }

  getCommandNameFromCode(code) {
    if (isNaN(parseInt(nameOrCode, 2)))
      throw new Error('CommandError: code must be a Number!');
    return this[~~code]._name;
  }

  registerCommand(command) {
    if (this[command._name] !== undefined || this[command._code] !== undefined) {
      this._deleteCommand(command);
    }
    this._addCommand(command);
  }

  _checkCommand(command) {
    if (command._code === undefined)
      throw new Error('CommandError: command must have a _code property!');
    if (command._name === undefined)
      throw new Error('CommandError: command must have a _name property!')
    if (typeof command !== 'function')
      throw new Error('CommandError: command must be a function!');
    if (this[command._code] !== undefined)
      throw new Error('CommandError: there is already a command registered with the code: ' + command._code);
    if (this[command._name] !== undefined)
      throw new Error('CommandError: there is already a command registered with the name: ' + command._name);
    return true;
  }

  _deleteCommand(command) {
    this._checkCommand(command);
    Object.defineProperty(this, command._code, {
      get: undefined,
      set: undefined,
      emmutable: true,
      configurable: true
    });
    Object.defineProperty(this, command._name, {
      get: undefined,
      set: undefined,
      emmutable: true,
      configurable: true
    });
  }

  _addCommand(command) {
    this._checkCommand(command);
    Object.defineProperty(this, command._code, {
      get: () => command,
      set: this.registerCommand,
      emmutable: true,
      configurable: true
    });
    Object.defineProperty(this, command._name, {
      get: () => command,
      set: this.registerCommand,
      emmutable: true,
      configurable: true
    });
  }
}

module.exports = Manager;
