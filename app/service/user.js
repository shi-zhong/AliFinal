'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async deal(username) {
    try {
      const list = await this.app.mysql.get('users', {
        username,
      });
      if (list) {
        return {
          id: list.user_id,
        };
      }

      const result = await this.app.mysql.insert('users', {
        username,
      });
      const result2 = await this.app.mysql.insert('infos', {
        user_id: result.insertId,
        likes: '[]',
        history: '[]',
        action: '[]',
      });

      if (result.affectedRows === 1 && result2.affectedRows === 1) {
        return {
          id: result.insertId,
        };
      }

      // await this.app.mysql.delete('users', {
      //   id: list.user_id,
      // });

      return {
        id: undefined,
      };
    } catch (err) {
      console.error(err);
      return {
        id: undefined,
      };
    }
  }

  async logout(userid) {
    try {
      await this.app.mysql.delete('users', {
        user_id: userid,
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = UserService;
