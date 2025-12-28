export default class AuthCheckScene extends Phaser.Scene
{
  constructor() {
    super('AuthCheckScene');
  }

  async create() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.scene.start('LoginScene');
      return;
    }

    try {
      const res = await fetch('/api/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error();

      this.scene.start('MenuScene');
    } catch {
      localStorage.removeItem('token');
      this.scene.start('LoginScene');
    }
  }
}