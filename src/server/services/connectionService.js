/**
 * Service para gestionar las conexiones activas de usuarios
 */
export function createConnectionService() {
  // Map para almacenar sesiones conectadas: sessionId -> timestamp de última conexión
  const connectedSessions = new Map();

  // Configuración de timeout (5 segundos sin actividad = desconectado)
  const CONNECTION_TIMEOUT = 5000; // 5 segundos en milisegundos
  const CLEANUP_INTERVAL = 2000;    // Limpiar cada 2 segundos

  // Limpiar sesiones inactivas periódicamente
  const cleanupInterval = setInterval(() => {
    
    const disconnectedSessions = [];

    for (const [sessionId, lastActive] of connectedSessions.entries())
    {
      if (Date.now() - lastActive > CONNECTION_TIMEOUT)
      {
        disconnectedSessions.push(sessionId);
      }
    }

    disconnectedSessions.forEach(sessionId =>
      {
        connectedSessions.delete(sessionId);
        console.log("[ConnectionService] Sesion desconectada por timeout: ", sessionId);
      });

    if (disconnectedSessions.length > 0)
    {
      console.log(`[ConnectionService] Sesiones activas restantes: ${connectedSessions.size}`);
    }

  }, CLEANUP_INTERVAL);

  return {
    /**
     * Registrar o actualizar la conexión de una sesión
     * @param {string} sessionId - ID único de la sesión del cliente
     * @returns {number} Número total de sesiones conectadas
     */
    updateConnection(sessionId) {
      

      connectedSessions.set(sessionId, Date.now());
      return connectedSessions.size;
    },

    /**
     * Obtener el número de sesiones conectadas
     * @returns {number}
     */
    getConnectedCount() {
      return connectedSessions.size;
    },

    /**
     * Detener el cleanup interval (útil para testing o shutdown)
     */
    stopCleanup() {
      clearInterval(cleanupInterval);
    }
  };
}
