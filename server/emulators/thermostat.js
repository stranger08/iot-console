const got = require('got');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

(async () => {
    const EXCHANGE_ENDPOINT = 'http://localhost:8050/control/exchange';
    const DEVICE_ID = "34";

    const DEVICES_IDS = ["1", "2", "3", "6", "4", "7", "8", "10", "12", "11", "9"];

    for (let deviceId of DEVICES_IDS) {
        console.log(deviceId)
        for (let i = 0; i < 10; i++) {
            await got.post(EXCHANGE_ENDPOINT,{
                    json: {
                        deviceId: deviceId,
                        data: {
                            temp: getRandomInt(15, 30),
                            // humidity: getRandomInt(0, 100),
                            // dust: getRandomInt(0, 50),
                            // power: getRandomInt(0, 1000),
                            // ventilator: getRandomInt(75, 80)
                        }
                    }
                });
        }
    }
})()