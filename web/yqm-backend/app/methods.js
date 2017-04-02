'use strict';
const say = require('say');

const IOT = {
  YQMIOT_COMMAND_PROPERTY: 'property',
  YQMIOT_COMMAND_EVENT: 'event',
  YQMIOT_COMMAND_CALL: 'call',
  YQMIOT_COMMAND_ACK: 'ack',
  YQMIOT_EVENT_ONLINE: 'yqmiot.event.online',
  YQMIOT_EVENT_OFFLINE: 'yqmiot.event.offline',
  YQMIOT_EVENT_TEST: 'yqmiot.event.test',
  YQMIOT_PROPERTY_NODEID: 'yqmiot.property.nodeid',
  YQMIOT_PROPERTY_ACCOUNTID: 'yqmiot.property.accountid',
  YQMIOT_PROPERTY_MODEL: 'yqmiot.property.model',
  YQMIOT_PROPERTY_VERSION: 'yqmiot.property.version',
  YQMIOT_METHOD_PING: 'yqmiot.method.ping',
  YQMIOT_METHOD_TEST: 'yqmiot.method.test',
  YQMIOT_METHOD_TOGGLE: 'yqmiot.method.toggle',
  YQMIOT_EVNET_TOGGLE: 'yqmiot.event.toggle',
  decode: (payload) => {
    const load = payload.toString();
    if (load) {
      return JSON.parse(load);
    }
    return undefined;
  },
  decodeEvent: (message) => {
    const topic = message.topic.split('/');
    const payload = IOT.decode(message.payload);
    const action = payload.action;
    const sender = topic[3];
    const receiver = topic[2];
    let eventType = '';
    const params = payload.params;
    const callseq = payload.callseq;
    if (action) {
      eventType = action.split('.')[2];
    }

    return {
      eventType,
      sender,
      receiver,
      action,
      params,
      callseq,
    }
  },
  speek: (text) => {
    const promise = new Promise((resolve, reject) => {
      say.speak(text, '', 1.0, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
    return promise;
  },
};

module.exports = IOT;
