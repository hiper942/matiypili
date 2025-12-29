import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

// Servicios (factory functions)
import { createUserService } from './services/userService.js';
import { createMessageService } from './services/messageService.js';
import { createConnectionService } from './services/connectionService.js';
import { createGameRoomService } from './services/gameRoomService.js';
import { createMatchmakingService } from './services/matchmakingService.js';

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
const gameRoomService = createGameRoomService();
const matchmakingService = createMatchmakingService(gameRoomService);

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

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.sendStatus(401);
  }

  const token = auth.replace('Bearer ', '');

  const user = userService.getUserById(token);

  if (!user) {
    return res.sendStatus(401);
  }

  req.user = user;
  next();
}

// ==================== RUTAS ====================

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/connected', connectionRoutes);

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==================== AUTH ====================

// LOGIN
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const user = userService.getUserByUsername(username);

  if (!user) {
    return res.status(401).json({ error: 'Usuario no existe' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  // Token simple (id del usuario)
  res.json({
    token: user.id,
    username: user.username
  });
});

// REGISTER
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    userService.createUser({ username, password });
    res.sendStatus(201);
  } catch (e) {
    res.status(409).json({ error: 'Usuario ya existe' });
  }
});


// CHECK TOKEN
app.get('/api/me', (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.sendStatus(401);
  }

  res.sendStatus(200);
});

// INFO CUENTA
app.post('/api/record', authMiddleware, (req, res) => {
  const { time } = req.body;
  const user = req.user;

  if (!time || time <= 0) {
    return res.status(400).json({ error: 'Tiempo inválido' });
  }

  if (!user.bestTime || time < user.bestTime) {
    user.bestTime = time;
    return res.json({ newRecord: true, bestTime: time });
  }

  res.json({ newRecord: false, bestTime: user.bestTime });
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

// ==================== WEBSOCKET SERVER ====================

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Cliente WebSocket conectado');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      // Aqui hay que cambiar todo
      switch (data.type) {
        case 'joinQueue':
          matchmakingService.joinQueue(ws);
          break;

        case 'leaveQueue':
          matchmakingService.leaveQueue(ws);
          break;

        case 'selectCharacter':
          gameRoomService.handleCharacterSelect(ws, data.character);
          break;

        case 'playerReady':
          gameRoomService.handlePlayerReady(ws);
          break;

        default:
          console.log('Mensaje desconocido:', data.type);
      }
    } catch (error) {
      console.error('Error procesando mensaje:', error);
    }
  });

  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado');
    matchmakingService.leaveQueue(ws);
    gameRoomService.handleDisconnect(ws);
  });

  ws.on('error', (error) => {
    console.error('Error en WebSocket:', error);
  });
});

// ==================== INICIO DEL SERVIDOR ====================

server.listen(PORT, () => {
  console.log('========================================');
  console.log('  SERVIDOR DE CHAT PARA VIDEOJUEGO');
  console.log('========================================');
  console.log(`  Servidor corriendo en http://localhost:${PORT}`);
  console.log(`  WebSocket disponible en ws://localhost:${PORT}`);
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