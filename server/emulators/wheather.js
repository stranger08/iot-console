const got = require('got');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

(async () => {
    const EXCHANGE_ENDPOINT = 'http://localhost:3000/control/exchange';
    const DEVICE_ID = "13";

    for (let i = 0; i < 30; i++) {
        await got.post(EXCHANGE_ENDPOINT,{
                json: {
                    deviceId: DEVICE_ID,
                    data: {
                        wind: getRandomInt(15, 30),
                        press: getRandomInt(0, 100),
                        temp: getRandomInt(0, 50),
                        humidity: getRandomInt(0, 100),
                        uv: getRandomInt(800, 1200),
                    }
                }
            });
    }
})()