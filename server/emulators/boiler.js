const got = require('got');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

(async () => {
    const EXCHANGE_ENDPOINT = 'http://localhost:3000/control/exchange';
    const DEVICE_ID = "16";


    for (let i = 0; i < 20; i++) {
        await got.post(EXCHANGE_ENDPOINT,{
                json: {
                    deviceId: DEVICE_ID,
                    data: {
                        "temp": getRandomInt(13, 21)
                    }
                }
            });
    }
})()