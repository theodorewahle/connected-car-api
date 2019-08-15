import Vehicle from 'models/vehicle';
import { GM } from 'constants';
import { gm } from 'controllers';
import { VehicleNotFoundError } from 'errors'
import logger from 'utils/logging'

const getControllerByManufacturer = (name) => {
  logger.info(`returning controller for manufacturer: ${name}`)
  switch (name) {
    case GM:
      return gm;
    default:
      throw new Error('This manufacturer is not yet supported.');
  }
};

export const getControllerById = async (vehicleId) => {
  logger.info(`getting controller for vehicleId: ${vehicleId}`)
  const vehicle = await Vehicle.findOne({ id: vehicleId });
  if (!vehicle) {
    throw new VehicleNotFoundError('Vehicle not found. Please us a valid vehicle id.');
  }
  return getControllerByManufacturer(vehicle.manufacturer);
};
