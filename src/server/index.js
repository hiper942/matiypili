import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Servicios (factory functions)
import { createUserService } from './services/userService.js';
import { createMessageService } from './services/messageService.js';
import { createConnectionService } from './services/connectionService.js';

// Controladores (factory functions)
import { createUserController } from './controllers/userController.js';
import { createMessageController } from './controllers/messageController.js';
import { createConnectionController } from './controllers/connectionController.js';

// Rutas (factory functions)
import { createUserRoutes } from './routes/users.js';
import { createMessageRoutes } from './routes/messages.js';
import { createConnectionRoutes } from './routes/connections.js';

// Para obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== CONFIGURACIÓN DE DEPENDENCIAS ====================
// Aquí se construye toda la cadena de dependencias de la aplicación
// Esto facilita el testing al permitir inyectar mocks en cualquier nivel

// 1. Crear servicios (capa de datos)
const userService = createUserService();
const messageService = createMessageService(userService);  // messageService depende de userService
const connectionService = createConnectionService();

// 2. Crear controladores inyectando servicios (capa de lógica)
const userController = createUserController(userService);
const messageController = createMessageController(messageService);
const connectionController = createConnectionController(connectionService);

// 3. Crear routers inyectando controladores (capa de rutas)
const userRoutes = createUserRoutes(userController);
const messageRoutes = createMessageRoutes(messageController);
const connectionRoutes = createConnectionRoutes(connectionController);

// ==================== SERVIDOR ====================

const app = express();
const PORT = 3000;

// ==================== MIDDLEWARE ====================

// Parse JSON bodies
app.use(express.json());

// Log de peticiones (simple logger)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// CORS simple (permitir todas las peticiones)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Servir archivos estáticos del juego (dist/)
app.use(express.static(path.join(__dirname, '../../dist')));

// ==================== RUTAS ====================

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/connected', connectionRoutes);

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA Fallback - Servir index.html para todas las rutas que no sean API
// Esto debe ir DESPUÉS de las rutas de la API y ANTES del error handler
app.use((req, res, next) => {
  // Si la petición es a /api/*, pasar al siguiente middleware (404 para APIs)
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint no encontrado' });
  }

  // Para cualquier otra ruta, servir el index.html del juego
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// ==================== ERROR HANDLER ====================

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

// ==================== INICIO DEL SERVIDOR ====================

app.listen(PORT, () => {
  console.log('========================================');
  console.log('  SERVIDOR DE CHAT PARA VIDEOJUEGO');
  console.log('========================================');
  console.log(`  Servidor corriendo en http://localhost:${PORT}`);
  console.log(`  `);
  console.log(`  🎮 Juego: http://localhost:${PORT}`);
  console.log(`  `);
  console.log(`  API Endpoints disponibles:`);
  console.log(`   - GET    /health`);
  console.log(`   - GET    /api/connected`);
  console.log(`   - GET    /api/users`);
  console.log(`   - POST   /api/users`);
  console.log(`   - GET    /api/users/:id`);
  console.log(`   - PUT    /api/users/:id`);
  console.log(`   - DELETE /api/users/:id`);
  console.log(`   - GET    /api/messages`);
  console.log(`   - POST   /api/messages`);
  console.log('========================================\n');
});
