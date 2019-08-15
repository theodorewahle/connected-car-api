# Smartcar API

[![Build Status](https://travis-ci.com/theodorewahle/smartcar-api.svg?token=E6siJqse9TCUMKVppzx2&branch=master)](https://travis-ci.com/theodorewahle/smartcar-api)
 
 ## API Reference
 
This README.md contains developer documentation. For API Documentation, checkout out our [API Reference](http://smartcar.surge.sh).

___

## Developer Documentation

### Code Structure

This diagram illustrates the overrall project structure:

![diagram](https://github.com/theodorewahle/smartcar-api/blob/master/assets/diagram.png)

#### Error Handling

All errors are handled and the logged by the project's `errorHandler` middleware (found in the `src/middlewares` folder). When an error occurs in synchronous code, don't `.catch()` it, just it bubble up to the middleware. But when an error occurs in _asynchronous_ code, make sure to pass it to `next()` so that it can reach the `errorHandler` middleware.

### Code Style

#### Async 
This project uses `async`/`await` insead of `.then()` when possible to keep the code more legible.

#### Errors

This project contains custom `Error` types in the `src/errors` folder. The reason for custom errors is that it gives more clear feedback to the user and makes it cleaner to include custom status codes. That said, custom errors should only be written for the most common errors. Use the 80/20 rule.

#### Module aliases

Any direct that is a _direct_ sub-directory of the source folder has been aliased so that it can be imported like a module. Accordingy, do not use relative imports for these folders. (Includes: `utils`, `middlewares`, `controllers`, etc.).

#### Logging

This project uses `winston` for asynchronous logging. The general heurestic for deciding what to log is this question: would this be useful for debugging? With that in mind, include as much relevant information as possible in logs. Use `logger.info()` for non-errors and `logger.error()` for error logging.

HTTP requests are also logged using `morgan`.
# connected-car-api
