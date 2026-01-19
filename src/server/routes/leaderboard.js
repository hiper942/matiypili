import express from 'express';

export function createLeaderboardRoutes(leaderboardController) {
  const router = express.Router();

  // GET /api/leaderboard
  router.get('/leaderboard', leaderboardController.getLeaderboard);

  // POST /api/leaderboard
  router.post('/record', auth, leaderboardController.addRecord);

  return router;
}