const ramda = require('ramda');

const { controlsService } = require('./');
const { devicesService } = require('../devices');
/**
 * Check if configured rule conditions
 * 
 * @param {control rule id} controlId 
 * @returns boolean if rule has been applied or not
 */
const applyControl = async (controlId) => {
    //console.log(`[Controls application service] Applying control ${controlId}`);
    const CONTROL = await controlsService.findById(controlId);
    const CONDITIONS = ramda.pathOr([], ['conditions'], CONTROL);

    if (CONDITIONS.length == 0) {
        //console.log(`Rule has no conditions and is incorrect`);
        return false;
    }

    for (let condition of CONDITIONS) {
        let isConditionApplied = await applyCondition(condition);
        if (!isConditionApplied) {
            //console.log(`Not all conditions are applied for control rule ${controlId}`);
            return false;
        }
    }

    const ACTIONS = ramda.path(['actions'], CONTROL);

    for (let action of ACTIONS) {
        await applyAction(action);
    }

    //console.log(`All conditions of ${controlId} are true, returning true`);
    // TODO run control rule actions => change settings of the devices.
    return true;
}

const applyCondition = async (condition) => {
    const DEVICE_ID = ramda.path(['device'], condition);
    const DEVICE_LATEST_DATA = await devicesService.findLatestDataPacket(DEVICE_ID);

    if (!DEVICE_LATEST_DATA) {
        //console.log('Device did not sent any data yet, condition not applied');
        return false;
    }
    
    if (process.env.DEBUG == true) {
        // console.log(`Latest device data packet is:`, DEVICE_LATEST_DATA);
        // console.log(`Condition is:`, condition);
    }

    const VALUE_PATH = ramda.path(['path'], condition);
    const DATA_PACKET_VALUE = ramda.path(['data', VALUE_PATH], DEVICE_LATEST_DATA);
    if (!DATA_PACKET_VALUE) {
        // console.log(`Device latest data packet does not have specified attribute, condition not applied`);
        return false;
    }
    const CONDITION_ASSERT_VALUE = ramda.path(['value'], condition);
    const OPERATOR = ramda.path(['operator'], condition);

    switch (OPERATOR) {
        case 'eq':
            return DATA_PACKET_VALUE == CONDITION_ASSERT_VALUE;
        case 'ne':
            return DATA_PACKET_VALUE != CONDITION_ASSERT_VALUE;
        case 'gt':
            return DATA_PACKET_VALUE > CONDITION_ASSERT_VALUE;
        case 'le':
            return DATA_PACKET_VALUE < CONDITION_ASSERT_VALUE;
    }
}

const applyAction = async (action) => {
    const DEVICE_ID = ramda.path(['device'], action);
    const DEVICE = await devicesService.findById(DEVICE_ID);

    const ACTION_SETTING = ramda.path(['setting'], action);
    const ACTION_NEW_VALUE = ramda.path(['value'], action);

    for (let s of DEVICE.settings) {
        if (ACTION_SETTING == s.path) {
            s.value = ACTION_NEW_VALUE;
            await devicesService.update(DEVICE);
            return true;
        }
    }

    return false;
}

const applyControls = async (controlIds) => {
    for (let cId of controlIds) {
        await applyControl(cId);
    }
}

module.exports = {
    applyControl,
    applyControls,
}