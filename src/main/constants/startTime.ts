/**
 * UNIX time em segundos quando o processo main foi iniciado.
 *
 * Importar esta constante no processo renderer causará erros.
 */
export const startTime = Math.floor(
  (process.getCreationTime() || Date.now()) / 1000,
)
