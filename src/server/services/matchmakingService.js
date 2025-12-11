/**
 * Matchmaking service - manages player queue and matches players
 */
export function createMatchmakingService(gameRoomService) {
  const queue = [];

  /**
   * Add a player to the matchmaking queue
   * @param {WebSocket} ws - The WebSocket connection
   */
  function joinQueue(ws) {
    // Check if already in queue
    if (queue.some(player => player.ws === ws)) {
      return;
    }

    queue.push({ ws });

    // Notify player they're in queue
    ws.send(JSON.stringify({
      type: 'queueStatus',
      position: queue.length,
      total: queue.length
    }));

    // Try to match players
    tryMatch();
  }

  /**
   * Remove a player from the queue
   * @param {WebSocket} ws - The WebSocket connection
   */
  function leaveQueue(ws) {
    const index = queue.findIndex(player => player.ws === ws);
    if (index !== -1) {
      queue.splice(index, 1);
    }
  }

  /**
   * Try to match two players from the queue
   */
  function tryMatch() {
    if (queue.length >= 2) {
      const player1 = queue.shift();
      const player2 = queue.shift();

      // Create a game room
      const roomId = gameRoomService.createRoom(player1.ws, player2.ws);

      // Generate random ball direction
      const angle = (Math.random() * 60 - 30) * (Math.PI / 180); // -30 to 30 degrees
      const speed = 300;
      const ballData = {
        x: 400,
        y: 300,
        vx: speed * Math.cos(angle),
        vy: speed * Math.sin(angle)
      };

      // Notify both players
      player1.ws.send(JSON.stringify({
        type: 'gameStart',
        role: 'player1',
        roomId,
        ball: ballData
      }));

      player2.ws.send(JSON.stringify({
        type: 'gameStart',
        role: 'player2',
        roomId,
        ball: ballData
      }));
    }
  }

  /**
   * Get current queue size
   * @returns {number} Number of players in queue
   */
  function getQueueSize() {
    return queue.length;
  }

  return {
    joinQueue,
    leaveQueue,
    getQueueSize
  };
}
