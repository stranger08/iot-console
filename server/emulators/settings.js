const got = require('got');
let i = 0;

(async () => {
    const SETTINGS_ENDPOINT = 'http://localhost:8050/control/settings';

    const DEVICES_IDS = ["1", "2", "3", "6", "4", "7", "8", "10", "12", "11", "9"];
    // const DEVICES_IDS = ["13", "13", "13", "13", "13", "13", "13", "13", "13", "13", "13"];

    const start = Date.now();
    let PROMISES = [];
    for (let i = 0; i < 50; i++) {
        for (let deviceId of DEVICES_IDS) {
            PROMISES.push(got.get(`${SETTINGS_ENDPOINT}/${deviceId}`));
        }
    }
    await Promise.all(PROMISES);

    PROMISES = [];
    for (let i = 0; i < 50; i++) {
        for (let deviceId of DEVICES_IDS) {
            PROMISES.push(got.get(`${SETTINGS_ENDPOINT}/${deviceId}`));
        }
    }
    await Promise.all(PROMISES);

    PROMISES = [];
    for (let i = 0; i < 50; i++) {
        for (let deviceId of DEVICES_IDS) {
            PROMISES.push(got.get(`${SETTINGS_ENDPOINT}/${deviceId}`));
        }
    }
    await Promise.all(PROMISES);
    const duration = Date.now() - start;
    console.log(`duration ${duration} ms`);
})()