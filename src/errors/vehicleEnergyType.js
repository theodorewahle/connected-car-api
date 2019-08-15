export class VehicleEnergyTypeError extends TypeError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, VehicleEnergyTypeError);
    this.name = 'VehicleEnergyTypeError'
    this.message = message
    this.status = 400;
  }
}
