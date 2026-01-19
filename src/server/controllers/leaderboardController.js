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

  function addRecord(req, res)
  {
    const { time } = req.body;

    if (typeof time !== 'number')
    {
      return res.status(400).json({ error: 'Invalid time' });
    }

    const userId = req.user.id;

    const user = userService.getUserById(userId);
    if (!user)
    {
      return res.status(404).json({ error: 'User not found' });
    }

    // guardar solo si mejora
    if (user.bestTime === null || time < user.bestTime)
    {
      user.bestTime = time;
    }

    res.sendStatus(200);
  }

  return {
    getLeaderboard,
    addRecord
  };
}