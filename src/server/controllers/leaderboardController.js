export function createLeaderboardController(userService) {

  function getLeaderboard(req, res) {
    const users = userService.getAllUsers();

    const leaderboard = users
      .filter(u => u.bestTime !== null)
      .sort((a, b) => a.bestTime - b.bestTime)
      .map(u => ({
        username: u.username,
        bestTime: u.bestTime
      }));

    res.json(leaderboard);
  }

  return { getLeaderboard };
}