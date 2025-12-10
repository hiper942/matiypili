import express from 'express';

/**
 * Rutas para gestionar conexiones de usuarios
 */
export function createConnectionRoutes(connectionController) {
  const router = express.Router();

  // POST /connected - Registrar conexión de sesión y obtener número de sesiones conectadas
  router.post('/', (req, res) => connectionController.handleConnected(req, res));

  return router;
}
