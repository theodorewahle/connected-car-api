// manufacturer names
export const GM = 'gm'

// manufacturer apis
const GM_BASE_URI = 'http://gmapi.azurewebsites.net'

export const GM_API = {
  VEHICLE_INFO: `${GM_BASE_URI}/getVehicleInfoService`,
  SECURITY_STATUS: `${GM_BASE_URI}/getSecurityStatusService`,
  ENERGY: `${GM_BASE_URI}/getEnergyService`,
  ENGINE_ACTION: `${GM_BASE_URI}/actionEngineService`
}

// misc
export const RESPONSE_TYPE = 'JSON'

export const gmEngineActions = {
  START: 'START_VEHICLE',
  STOP: 'STOP_VEHICLE'
}
