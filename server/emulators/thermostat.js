const got = require('got');

(async () => {
    const EXCHANGE_ENDPOINT = 'http://localhost:3000/control/exchange';
    const DEVICE_ID = "2";

    for (let i = 0; i < 20; i++) {
        await got.post(EXCHANGE_ENDPOINT,{
                json: {
                    deviceId: DEVICE_ID,
                    data: {
                        temp: Math.floor(Math.random() * (20 - 25 + 1)) + 20
                    }
                }
            });
    }
})()