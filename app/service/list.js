'use strict';

const Service = require('egg').Service;

class ListService extends Service {

  async insert(listobj) {
    try {
      const result = await this.app.mysql.insert('lists', {
        ...listobj,
      });
      return {
        success: result.affectedRows === 1,
        list_id: result.insertId,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        list_id: -1,
      };
    }
  }

  async delete(listid) {
    try {
      const result = await this.app.mysql.delete('lists', {
        list_id: listid,
      });
      return result.affectedRows === 1;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async update(listobj) {
    const row = {
      ...listobj,
    };
    const options = {
      where: {
        list_id: listobj.list_id,
      },
    };
    try {
      const result = await this.app.mysql.update('lists', row, options);
      return result.affectedRows === 1;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async find(options) {
    try {
      const list = await this.app.mysql.select('lists', options);
      return {
        success: list !== null,
        list,
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        list: {},
      };
    }
  }
}

module.exports = ListService;
