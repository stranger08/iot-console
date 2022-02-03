const got = require('got');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

(async () => {
    const EXCHANGE_ENDPOINT = 'http://localhost:3000/control/exchange';
    const DEVICE_ID = "7";


    for (let i = 0; i < 20; i++) {
        await got.post(EXCHANGE_ENDPOINT,{
                json: {
                    deviceId: DEVICE_ID,
                    data: {
                        "water-temp": getRandomInt(80, 100),
                        "milk-supplies": getRandomInt(0, 3000),
                        "cream-supplies": getRandomInt(40, 100),
                        "power": getRandomInt(100, 1000),
                        "change": getRandomInt(140, 2401),
                        "orders": getRandomInt(0, 4),
                        "sugar-supplies": getRandomInt(35, 249),
                    }
                }
            });
    }
})()