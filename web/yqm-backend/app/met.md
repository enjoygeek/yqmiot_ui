// mqtt.publish('yqmiot/to/remove', JSON.stringify({ name: '猫的灯' }));mqtt.publish('yqmiot/to/add', JSON.stringify({ name: '猫的灯', service_name: '灯', service: 'Switch' }));

Howto examples
add accessory

topic: homebridge/to/add
payload: {"name": "flex_lamp", "service_name": "light", "service": "Switch"}

response:

topic: homebridge/from/response
payload: {"ack": true, "message": "accessory 'flex_lamp' service_name 'light' is added."}

add service

Note: an accessory with the same name must be added before.

topic: homebridge/to/add/service
payload: {"name": "multi_sensor", "service_name": "humidity", "service": "HumiditySensor"}

response:

topic: homebridge/from/response
payload: {"ack": true, "message": "service_name 'humidity', service 'HumiditySensor' is added."}

remove accessory

topic: homebridge/to/remove
payload: {"name": "flex_lamp"}

response:

topic: homebridge/from/response
payload: {"ack": true, "message": "accessory 'flex_lamp' is removed."}

remove service

topic: homebridge/to/remove/service
payload: {"name": "multi_sensor", "service_name": "humidity"}

response:

topic: homebridge/from/response
payload: {"ack": true, "message": "accessory 'multi_sensor' service_name 'humidity' is removed."}

get accessory/accessories

The purpose of this topic is to retrieve accessory configurations. Use homebridge/from/set to control your devices.

topic: homebridge/to/get
payload: {"name": "outdoor_temp"}

homebridge sends the accessory configuration:

topic: homebridge/from/response
payload:
{
  "outdoor_temp": {
    "services": {
      "Temperature": "TemperatureSensor"
    },
    "characteristics": {
      "Temperature": {
        "CurrentTemperature": 13.4
      }
    }
  }
}

topic: homebridge/to/get
payload: {"name": "*"}

homebridge sends all accessory configurations:

topic: homebridge/from/response
payload:
{
  "node_switch": {
    "services": {
      "light": "Switch"
    },
    "characteristics": {
      "Light": {
        "On": true
      }
    }
  },
  "office_lamp": {
    "services": {
      "office_light": "Lightbulb"
    },
    "characteristics": {
      "office_light": {
        "On": "blank",
        "Brightness": 65
      }
    }
  },
  "living_temp": {
    "services": {
      "living_temperature": "TemperatureSensor"
    },
    "characteristics": {
      "living_temperature": {
        "CurrentTemperature": 19.6
      }
    }
  }
}

set value (to homebridge)

topic: homebridge/to/set
payload: {"name": "flex_lamp", "service_name": "light", "characteristic": "On", "value": true}

get value (from homebridge)

topic: homebridge/from/get
payload: {"name": "flex_lamp", "service_name": "light", "characteristic": "On"}

Homebridge-mqtt will return the cached value to HomeKit. Optionally you can publish the actual value using homebridge/to/set.
set value (from homebridge)

topic: homebridge/from/set
payload: {"name": "flex_lamp", "service_name": "light", "characteristic": "On", "value": true}

set reachability

topic: homebridge/to/set/reachability
payload: {"name": "flex_lamp", "reachable": true}
or
payload: {"name": "flex_lamp", "reachable": false}

set accessory information

topic: homebridge/to/set/accessoryinformation
payload: {"name": "flex_lamp", "manufacturer": "espressif", "model": "esp8266-12", "serialnumber": "4711"}

identify accessory

topic: homebridge/from/identify
payload: {"name":"indoor_temp","manufacturer":"homebridge-mqtt","model":"v0.3.0","serialnumber":"2017-02-13T12:17"}

define characterstic

The required characteristics are added with the default properties. If you need to change the default, define the characteristic-name with the properties. e.g.:

topic: homebridge/to/add
payload:
  {
    "name": "living_temp",
    "service_name": "temperature",
    "service": "TemperatureSensor",
    "CurrentTemperature": {"minValue": -20, "maxValue": 60, "minStep": 1}
  }

To add an optional charachteristic define the characteristic-name with "default" or with the properties. e.g.:

topic: homebridge/to/add
payload: 
  {
    "name": "living_lamp",
    "service_name": "light",
    "service": "Lightbulb",
    "Brightness": "default"
  }

topic: homebridge/to/add
payload:
  {
    "name": "bathroom_blind",
    "service_name": "blind",
    "service": "WindowCovering",
    "CurrentPosition": {"minStep": 5},
    "TargetPosition": {"minStep": 5},
    "CurrentHorizontalTiltAngle": {"minValue": 0, "minStep": 5},
    "TargetHorizontalTiltAngle": {"minValue": 0, "minStep": 5}
  }
