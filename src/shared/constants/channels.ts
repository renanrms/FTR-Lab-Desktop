export const CHANNELS = {
  APP: {
    GET_START_TIME: 'app:get-start-time',
  },
  DEVICES: {
    INFO: {
      // REQUEST: 'devices:info:request',
      UPDATE: 'devices:info:update',
    },
    CONNECTION: {
      OPEN: 'devices:connection:open',
      CLOSE: 'devices:connection:close',
    },
    UPDATE_SETTINGS: 'devices:update-settings',
  },
  MEASUREMENTS: {
    UPDATE: 'measurements:update',
    GET_ALL: 'measurements:get-all',
    DELETE_ALL: 'measurements:delete-all',
    EXPORT: 'measurements:export',
  },
}
