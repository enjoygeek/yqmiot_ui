#! /usr/bin/env Node
'use strict';
const IOT = require('./methods.js');
const pkg = require('../package.json');
const config = require('./config.js');
const log = require('yalm');
// const fs = require('fs');
const Mqtt = require('mqtt');

let mqttConneted;
log.setLevel(config.verbosity);
log(`${pkg.name} ${pkg.version} starting`);
log.info('mqtt trying to connect', config.url);
const mqtt = Mqtt.connect(config.url, { will: { topic: `${config.name}/${config.account}/0/${config.nodeId}/event`, payload: JSON.stringify({ action: IOT.YQMIOT_EVENT_OFFLINE, callseq: undefined, params: {} }) } });

mqtt.on('connect', () => {
  mqttConneted = true;
  log.info(`mqtt conneted ${config.url}`);
  mqtt.subscribe(`${config.name}/#`);
  log.info(`mqtt subscribe ${config.name}/#`);
  mqtt.publish(`${config.name}/${config.account}/0/${config.nodeId}/event`, JSON.stringify({ action: IOT.YQMIOT_EVENT_ONLINE, callseq: undefined, params: {} }));
});

mqtt.on('reconnect', () => {
  log.info('mqtt reconnect');
});

mqtt.on('offline', () => {
  log.info('mqtt offline');
});

mqtt.on('close', () => {
  if (mqttConneted) {
    mqttConneted = false;
    log.info(`mqtt close ${config.url}`);
  }
});

mqtt.on('error', (err) => {
  log.error(`mqtt error ${err}`);
});

mqtt.on('message', (topic, payload) => {
  const tip = topic.split('/');
  const pd = JSON.parse(payload.toString());
  log.info(topic.split('/'));
  log.info(pd);
  switch (tip[1]) {
    case 'from':
      if (tip[2] === 'set') {
        log.info(pd);
        const receiver = pd.name;
        mqtt.publish(`${config.name}/${config.account}/${receiver}/${config.nodeId}/call`, JSON.stringify({ action: IOT.YQMIOT_METHOD_TOGGLE, callseq: Math.ceil(Math.random() * 200), params: { val: pd.value } }));
      }
      break;
    case `${config.account}`:
      if (tip[4] === 'property') {
        mqtt.publish('yqmiot/to/set', JSON.stringify({ name: tip[3], service_name: '灯', characteristic: 'On', value: pd.params.switch }));
      }
      break;
    default:
      break;
  }
});
