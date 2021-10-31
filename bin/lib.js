const chalk = require('chalk');

const info = (msg) => {
  console.log(chalk.bgGreen('INFO'), chalk.green(msg));
};

const error = (msg) => {
  console.log(chalk.bgRed('ERROR'), chalk.red(msg));
};

const warning = (msg) => {
  console.log(chalk.bgYellow('WARNING'), chalk.yellow(msg));
};

const br = () => {
  console.log('\n');
};

const log = console.log;

module.exports = {
  info,
  error,
  warning,
  br,
  log,
};

