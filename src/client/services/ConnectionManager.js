/**
 * Servicio para gestionar la conexión con el servidor
 * Maneja el polling al endpoint /api/connected y detecta pérdidas de conexión
 */
export class ConnectionManager {
  constructor() {
    this.connectedCount = 0;
    this.isConnected = false;
    this.lastCheckTime = 0;
    this.checkInterval = 2000; // Comprobar cada 2 segundos
    this.listeners = [];
    this.sessionId = this.generateSessionId();
    this.intervalId = null;

    // Iniciar el polling automático
    this.startPolling();
  }

  /**
   * Generar un ID único de sesión para este cliente
   * @returns {string}
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Comprobar conexión con el servidor
   * @returns {Promise<{connected: number, success: boolean}>}
   */
  async checkConnection() {
    try {
      const response = await fetch('/api/connected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: this.sessionId
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.connectedCount = data.connected;
        this.isConnected = true;
        this.lastCheckTime = Date.now();

        // Notificar a los listeners
        this.notifyListeners({ connected: true, count: this.connectedCount });

        return { connected: this.connectedCount, success: true };
      } else {
        this.handleDisconnection();
        return { connected: 0, success: false };
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      this.handleDisconnection();
      return { connected: 0, success: false };
    }
  }

  /**
   * Manejar desconexión
   */
  handleDisconnection() {
    this.isConnected = false;
    this.connectedCount = 0;
    this.notifyListeners({ connected: false, count: 0 });
  }

  /**
   * Registrar un listener para cambios de conexión
   * @param {Function} callback - Función que se llamará cuando cambie el estado
   */
  addListener(callback) {
    this.listeners.push(callback);
  }

  /**
   * Eliminar un listener
   * @param {Function} callback - Función a eliminar
   */
  removeListener(callback) {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Notificar a todos los listeners
   * @param {Object} data - Datos del estado de conexión
   */
  notifyListeners(data) {
    this.listeners.forEach(listener => listener(data));
  }

  /**
   * Obtener el estado actual de conexión
   * @returns {Object}
   */
  getStatus() {
    return {
      isConnected: this.isConnected,
      connectedCount: this.connectedCount,
      lastCheckTime: this.lastCheckTime
    };
  }

  /**
   * Iniciar el polling automático de conexión
   */
  startPolling() {
    if (this.intervalId) {
      return; // Ya está corriendo
    }

    // Comprobar inmediatamente
    this.checkConnection();

    // Luego comprobar cada X segundos
    this.intervalId = setInterval(() => {
      this.checkConnection();
    }, this.checkInterval);
  }

  /**
   * Detener el polling automático
   */
  stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Crear instancia singleton
export const connectionManager = new ConnectionManager();
