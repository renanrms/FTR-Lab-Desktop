export const CHANNELS = {
  APP: {
    GET_START_TIME: 'app:get-start-time',
  },
  DEVICES: {
    INFO: {
      GET_ALL: 'devices:info:get-all',
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
    FIND_LAST_BY_DEVICE: 'measurements:find-last-by-device',
    DELETE_ALL: 'measurements:delete-all',
    EXPORT: 'measurements:export',
  },
}
