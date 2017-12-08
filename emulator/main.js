const CPU = require('./CPU');
const path = require('path');

const cpu = new CPU();

cpu.debug = true;

cpu.load(path.resolve(__dirname, '../test.ems'));
