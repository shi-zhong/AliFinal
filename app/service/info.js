'use strict';

const Service = require('egg').Service;

class InfoService extends Service {

  async insert(userid) {
    try {
      // generate infos;
      const result = await this.app.mysql.insert('infos', {
        user_id: userid,
        likes: '[]',
        history: '[]',
        action: '[]',
      });
      return {
        success: result.affectedRows === 1,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
      };
    }
  }

  async delete(userid) {
    try {
      const result = await this.app.mysql.delete('infos', {
        user_id: userid,
      });
      return result.affectedRows === 1;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async update(userobj) {
    try {
      const row = {
        ...userobj,
      };
      const options = {
        where: {
          user_id: userobj.user_id,
        },
      };
      const result = await this.app.mysql.update('infos', row, options);
      return {
        success: result.affectedRows === 1,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
      };
    }
  }

  async find(userid) {
    try {
      const list = await this.app.mysql.get('infos', {
        user_id: userid,
      });
      return {
        success: list !== null,
        list,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        list: [],
      };
    }
  }

}

module.exports = InfoService;
