/**
 * Game Room service - manages active game rooms and game state
 */
export function createGameRoomService() {
  const rooms = new Map(); // roomId -> room data
  let nextRoomId = 1;

  /**
   * Create a new game room with two players
   * @param {WebSocket} player1Ws - Player 1's WebSocket
   * @param {WebSocket} player2Ws - Player 2's WebSocket
   * @returns {string} Room ID
   */
  function createRoom(player1Ws, player2Ws) {
    const roomId = `room_${nextRoomId++}`;

    const room = {
      id: roomId,
      player1: {
        ws: player1Ws,
        score: 0
      },
      player2: {
        ws: player2Ws,
        score: 0
      },
      selections: { 1: null, 2: null },
      ready: { 1: false, 2: false },
      active: true,
      ballActive: true // Track if ball is in play (prevents duplicate goals)
    };

    rooms.set(roomId, room);

    // Store room ID on WebSocket for quick lookup
    player1Ws.roomId = roomId;
    player2Ws.roomId = roomId;

    return roomId;
  }

  function getRoomBySocket(ws) {
    return rooms.get(ws.roomId);
  }

  function getPlayerIndex(room, ws) {
    if (room.player1.ws === ws) return 1;
    if (room.player2.ws === ws) return 2;
    return null;
  }

  function broadcast(room, payload) {
    room.player1.ws.send(JSON.stringify(payload));
    room.player2.ws.send(JSON.stringify(payload));
  }

  function handleCharacterSelect(ws, character) {
    const room = getRoomBySocket(ws);
    if (!room) return;

    const playerIndex = getPlayerIndex(room, ws);

    room.selections[playerIndex] = character;

    const conflict =
      room.selections[1] &&
      room.selections[2] &&
      room.selections[1] === room.selections[2];

    broadcast(room, {
      type: 'selectionUpdate',
      selections: room.selections,
      ready: room.ready,
      conflict
    });
  }

  function handlePlayerReady(ws) {
    const room = getRoomBySocket(ws);
    if (!room) return;

    const playerIndex = getPlayerIndex(room, ws);

    const conflict =
      room.selections[1] === room.selections[2];

    if (conflict) return;

    room.ready[playerIndex] = true;

    broadcast(room, {
      type: 'selectionUpdate',
      selections: room.selections,
      ready: room.ready,
      conflict: false
    });

    if (room.ready[1] && room.ready[2]) {
      broadcast(room, {
        type: 'startGame',
        players: room.selections
      });
    }
  }



  function handlePlayerMovement(ws, velocity)
  {
    const roomId = ws.roomId;
    if (!roomId) return;

    const room = rooms.get(roomId);
    if (!room || !room.active) return;

  }

  /**
   * Handle player disconnection
   * @param {WebSocket} ws - Disconnected player's WebSocket
   */
  function handleDisconnect(ws) {
    const roomId = ws.roomId;
    if (!roomId) return;

    const room = rooms.get(roomId);
    if (!room) return;

    // Only notify the other player if the game is still active
    // If the game already ended (room.active = false), don't send disconnect message
    if (room.active) {
      const opponent = room.player1.ws === ws ? room.player2.ws : room.player1.ws;

      if (opponent.readyState === 1) { // WebSocket.OPEN
        opponent.send(JSON.stringify({
          type: 'playerDisconnected'
        }));
      }
    }

    // Clean up room
    room.active = false;
    rooms.delete(roomId);
  }

  /**
   * Get number of active rooms
   * @returns {number} Number of active rooms
   */
  function getActiveRoomCount() {
    return Array.from(rooms.values()).filter(room => room.active).length;
  }

  return {
    createRoom,
    handleDisconnect,
    getActiveRoomCount,
    handleCharacterSelect,
    handlePlayerReady
  };
}
