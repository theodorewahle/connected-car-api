import axios from 'axios';
import { GM_API, RESPONSE_TYPE as responseType, gmEngineActions } from 'constants';
import {
  vehicleInfoReshape, securityStatusReshape, batteryReshape, fuelReshape,
} from 'utils/controller/gm';
import { EngineActionTypeError, EngineActionExecutionError } from 'errors';
import logger from 'utils/logging'

const postData = {
  id: null,
  responseType,
};

const getVehicleInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    postData.id = id;

    logger.info(`getting vehicle info for vehicleId: ${id}`)

    const response = await axios.post(GM_API.VEHICLE_INFO, postData);
    const reshaped = vehicleInfoReshape(response.data);
    res.json(reshaped);
  } catch (err) {
    next(err);
  }
};


const getDoors = async (req, res, next) => {
  try {
    const { id } = req.params;
    postData.id = id;

    logger.info(`getting doors/security info for vehicleId: ${id}`)

    const response = await axios.post(GM_API.SECURITY_STATUS, postData);
    const reshaped = securityStatusReshape(response.data);
    res.json(reshaped);
  } catch (err) {
    next(err);
  }
};

const getBatteryRange = async (req, res, next) => {
  try {
    const { id } = req.params;
    postData.id = id;

    logger.info(`getting battery range info for vehicleId: ${id}`)

    const response = await axios.post(GM_API.ENERGY, postData);
    const reshaped = batteryReshape(response.data);
    res.json(reshaped);
  } catch (err) {
    next(err);
  }
};

const getFuelRange = async (req, res, next) => {
  try {
    const { id } = req.params;
    postData.id = id;

    logger.info(`getting fuel range info for vehicleId: ${id}`)

    const response = await axios.post(GM_API.ENERGY, postData);
    const reshaped = fuelReshape(response.data);
    res.json(reshaped);
  } catch (err) {
    next(err);
  }
};

const engineAction = async (req, res, next) => {
  try {
    const { action } = req.body;
    if (!(action in gmEngineActions)) {
      throw new EngineActionTypeError('Please provide a valid action value (i.e. START or STOP).');
    }
    postData.command = gmEngineActions[action];
    const { id } = req.params;
    postData.id = id;

    logger.info(`executing engine action for vehicleId: ${id}`)


    const response = await axios.post(GM_API.ENGINE_ACTION, postData);
    const { status } = response.data.actionResult;
    if (status === 'EXECUTED') {
      res.send({ status: 'success' });
    } else {
      throw new EngineActionExecutionError(`The engine was not able to ${action.toLowerCase()}.`);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.gm = {
  getVehicleInfo, getDoors, getBatteryRange, getFuelRange, engineAction,
};
