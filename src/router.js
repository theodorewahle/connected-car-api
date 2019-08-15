import { Router } from 'express';
import { getControllerById } from 'utils/router';
import logger from 'utils/logging'

const router = Router();

// these funcs redirect the routes to the correct controller, based on manufacturer
const vehicleInfoRedirect = async (req, res, next) => {
  try {
    const controller = await getControllerById(req.params.id);
    logger.info('redirecting to vehicle info controller', controller)
    return controller.getVehicleInfo(req, res, next);
  } catch (err) {
    next(err);
  }
};

const batteryRangeRedirect = async (req, res, next) => {
  try {
    const controller = await getControllerById(req.params.id);
    logger.info('redirecting to battery range controller', controller)
    return controller.getBatteryRange(req, res, next);
  } catch (err) {
    next(err);
  }
};

const fuelRangeRedirect = async (req, res, next) => {
  try {
    const controller = await getControllerById(req.params.id);
    logger.info('redirecting to fuel range controller', controller)
    return controller.getFuelRange(req, res, next);
  } catch (err) {
    next(err);
  }
};

const doorsRedirect = async (req, res, next) => {
  try {
    const controller = await getControllerById(req.params.id);
    logger.info('redirecting to doors/security controller', controller)
    return controller.getDoors(req, res, next);
  } catch (err) {
    next(err);
  }
};

const engineActionRedirect = async (req, res, next) => {
  try {
    const controller = await getControllerById(req.params.id);
    logger.info('redirecting to engine action controller', controller)
    return controller.engineAction(req, res, next);
  } catch (err) {
    next(err);
  }
};

// these routes don't have any knowledge of the manufacturer
router.route('/:id').get(vehicleInfoRedirect);

router.route('/:id/battery').get(batteryRangeRedirect);

router.route('/:id/fuel').get(fuelRangeRedirect);

router.route('/:id/doors').get(doorsRedirect);

router.route('/:id/engine').post(engineActionRedirect);

export default router;
