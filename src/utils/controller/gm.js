import { parseNum, parseBool } from 'utils/parse';
import { VehicleEnergyTypeError } from 'errors';
import logger from 'utils/logging'

export const vehicleInfoReshape = (gmResponse) => {
  const {
    vin, color, fourDoorSedan, driveTrain,
  } = gmResponse.data;

  logger.info('reshaping JSON data for vehicle info response', gmResponse.data)

  return {
    vin: vin.value,
    color: color.value,
    doorCount: parseBool(fourDoorSedan.value) ? 4 : 2,
    driveTrain: driveTrain.value,
  };
};

export const securityStatusReshape = (gmResponse) => {
  const { doors } = gmResponse.data;

  logger.info('reshaping JSON data for doors/security response', gmResponse.data)

  return doors.values.map((door) => {
    return {
      location: door.location.value,
      locked: parseBool(door.locked.value),
    };
  });
};

export const batteryReshape = (gmResponse) => {
  const { value } = gmResponse.data.batteryLevel;

  logger.info('reshaping JSON data for batetry range response', gmResponse.data)

  if (value === 'null') {
    throw new VehicleEnergyTypeError('There is no electric battery data for this vehicle.');
  }
  return { percent: parseNum(value) };
};

export const fuelReshape = (gmResponse) => {
  const { value } = gmResponse.data.tankLevel;

  logger.info('reshaping JSON data for fuel range response', gmResponse.data)

  if (value === 'null') {
    throw new VehicleEnergyTypeError('There is no fuel tank data for this vehicle.');
  }
  return { percent: parseNum(value) };
};
