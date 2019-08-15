export class VehicleNotFoundError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, VehicleNotFoundError);
    this.name = 'VehicleNotFoundError'
    this.message = message
    this.status = 400;
  }
}
