const pkg = require('../package.json');
const config = require('yargs')
    .usage(`${pkg.name}${pkg.version}\n${pkg.description}\n\nUsage: $0 [options]`)
    .describe('v', 'possible values: "error", "warn", "info", "debug"')
    .describe('m', 'JSON file containing HomeKit Services to MQTT mapping definitions. See Readme.')
    .describe('n', 'instance name. used as mqtt client id and as prefix for connected topic')
    .describe('u', 'mqtt broker url. See https://github.com/mqttjs/MQTT.js#connect-using-a-url')
    .describe('s', 'directory to store homekit data')
    .describe('h', 'show help')
    .alias({
      h: 'help',
      n: 'name',
      m: 'mapfile',
      u: 'url',
      v: 'verbosity',
      c: 'pincode',
      a: 'username',
      b: 'bridgename',
      p: 'port',
      s: 'storagedir',
      ct: 'account',
      id: 'nodeId',
    })
    .default({
      c: '031-45-154',
      u: 'ws://yqmiot.com:8888',
      n: 'yqmiot',
      m: `${__dirname}/device.json`,
      v: 'info',
      a: 'CC:22:3D:E3:CE:F6',
      b: 'MQTT Bridge',
      p: 51826,
      ct: 2,
      id: '8',
    })
    // .config('config')
    .version()
    .help('help')
    .argv;

module.exports = config;
