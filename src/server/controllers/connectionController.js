/**
 * Controller para gestionar las conexiones de usuarios
 */
export function createConnectionController(connectionService) {
  return {
    /**
     * Handler para el endpoint /connected
     * Registra la conexión de la sesión y devuelve el número de sesiones conectadas
     */
    handleConnected(req, res) {
      const { sessionId } = req.body;

      // Validar que se envió un sessionId
      if (!sessionId) {
        return res.status(400).json({
          error: 'sessionId es requerido'
        });
      }

      // Actualizar el timestamp de la última conexión de esta sesión
      const connectedCount = connectionService.updateConnection(sessionId);

      res.json({
        connected: connectedCount
      });
    }
  };
}
