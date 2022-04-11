const data = {
  temp: 27,
  humidity: 39,
  dust: 33,
  power: 429,
  ventilator: 75,
}

const device = {
    telemetry: [
      {
        name: "Temperature",
        path: "temp",
      },
    //   {
    //     name: "Humidity",
    //     path: "humidity",
    //   },
    //   {
    //     name: "Dust",
    //     path: "dust",
    //   },
    //   {
    //     name: "Power",
    //     path: "power",
    //   },
    //   {
    //     name: "Ventilator",
    //     path: "ventilator",
    //   },
    ]
  }

const lodash = require('lodash');

const DEVICE_DATA_SETTINGS = device.telemetry || [];
const DEVICE_DATA_PATHS = DEVICE_DATA_SETTINGS.map(t => t.path);
const CAPTURED_DATA = lodash.pick(data, DEVICE_DATA_PATHS);
console.log(CAPTURED_DATA);
