export class EngineActionExecutionError extends TypeError {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, EngineActionExecutionError);
    this.name = 'EngineActionExecutionError'
    this.message = message
    this.status = 500;
  }
}
