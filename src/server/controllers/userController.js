/**
 * Controlador de usuarios usando closures
 * Este controlador maneja las peticiones HTTP relacionadas con usuarios
 * y utiliza el userService para las operaciones de datos
 *
 * Patrón: Inyección de dependencias - recibe el servicio como parámetro
 */

export function createUserController(userService) {
  /**
   * POST /api/users - Crear nuevo usuario
   */
  async function create(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          error: 'Los campos username y password son obligatorios'
        });
      }

      const newUser = userService.createUser({
        username,
        password,
        bestTime: null
      });

      res.status(201).json(newUser);
    } catch (error) {
      if (error.message === 'El usuario ya está registrado') {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  }

  /**
   * GET /api/users - Obtener todos los usuarios
   */
  async function getAll(req, res, next) {
    try {
      const users = userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/users/:id - Obtener un usuario por ID
   */
  async function getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/users/:id - Actualizar un usuario
   */
  async function update(req, res, next) {
    try {
      const { id } = req.params;
      const { bestTime } = req.body;

      const updatedUser = userService.updateUser(id, { bestTime });

      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/users/:id - Eliminar un usuario
   */
  async function remove(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = userService.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  // Exponer la API pública del controlador
  return {
    create,
    getAll,
    getById,
    update,
    remove
  };
}
