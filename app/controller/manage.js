'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller manage
 */

class ManageController extends Controller {
  /**
   * @Router POST /manage/insert
   * @Request body detail
   * @Response 200 listInsertOK OK
   * @Description 增加展示列表元素
   */
  async insert() {
    const { ctx } = this;
    function check(obj) {
      return obj.title && obj.content && obj.introduce;
    }
    if (!check(Object.keys(ctx.request.body))) {
      ctx.status = 400;
      ctx.body = {
        msg: 'bad request.',
        code: 20400,
        data: {},
      };
      return;
    }
    const result = await ctx.service.list.insert(ctx.request.body);
    if (result.success) {
      ctx.status = 200;
      ctx.body = {
        msg: 'success.',
        code: 20200,
        data: {
          list_id: result.list_id,
        },
      };
      return;
    }
    ctx.status = 500;
    ctx.body = {
      msg: 'Server wrong due to database.',
      code: 20500,
      data: {},
    };
    return;
  }
  /**
   * @Router DELETE /manage/delete
   * @Request query number *list_id ID
   * @Response 200 baseOK OK
   * @Description 删除展示列表元素
   */
  async delete() {
    const { ctx } = this;
    const { list_id } = ctx.query;
    const result = await ctx.service.list.delete(list_id);
    if (result) {
      ctx.status = 200;
      ctx.body = {
        msg: 'success.',
        code: 20200,
        data: {},
      };
      return;
    }
    ctx.status = 500;
    ctx.body = {
      msg: 'Server wrong due to database.',
      code: 20500,
      data: {},
    };
    return;
  }
  /**
   * @Router POST /manage/update
   * @Request body update
   * @Response 200 baseOK OK
   * @Description 修改展示列表元素
   */
  async update() {
    const { ctx } = this;

    function check(obj) {
      return obj.list_id && obj.title && obj.introduce && obj.content;
    }

    if (!check(Object.keys(ctx.request.body))) {
      ctx.status = 401;
      ctx.body = {
        msg: 'bad request.',
        code: 20401,
        data: {},
      };
      return;
    }

    const result = await ctx.service.list.update(ctx.request.body);
    if (result) {
      ctx.status = 200;
      ctx.body = {
        msg: 'success.',
        code: 20200,
        data: {},
      };
      return;
    }
    ctx.status = 500;
    ctx.body = {
      msg: 'Server wrong due to database.',
      code: 20500,
      data: {},
    };
    return;
  }

  async find() {
    const {
      ctx,
    } = this;
    ctx.body = {
      msg: 'waiting',
    };
  }
}

module.exports = ManageController;
