import express from 'express';

export function createLeaderboardRoutes(leaderboardController) {
  const router = express.Router();

  // GET /api/leaderboard
  router.get('/leaderboard', leaderboardController.getLeaderboard);

  return router;
}