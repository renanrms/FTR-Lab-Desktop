/**
 * UNIX time em segundos quando o processo main foi iniciado.
 *
 * Importar esta constante no processo main causará erros.
 */
export const { appStartTime } = await window.api.app.getStartTime()
