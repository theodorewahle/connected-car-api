export class EngineActionTypeError extends TypeError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, EngineActionTypeError);
    this.name = 'EngineActionTypeError'
    this.message = message
    this.status = 400;
  }
}
