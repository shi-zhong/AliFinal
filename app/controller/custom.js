'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller custom
 */

class CustomController extends Controller {
  /**
   * @Router POST /custom/login
   * @Request query string *username 用户名
   * @Response 200 loginOK OK
   * @Description 登录
   */
  async login() {
    const { ctx } = this;
    const query = ctx.query;
    if (query.username === undefined) {
      ctx.status = 400;
      ctx.body = {
        msg: 'bad request.',
        code: 10400,
        data: {},
      };
      return;
    }
    const idObj = await ctx.service.user.deal(query.username);
    if (idObj.id) {
      ctx.status = 200;
      ctx.body = {
        msg: 'success.',
        code: 10200,
        data: {
          id: idObj.id,
        },
      };
      return;
    }

    ctx.status = 500;
    ctx.body = {
      msg: 'Fail due to database.',
      code: 10500,
      data: {
        id: idObj.id,
      },
    };
    return;
  }
  /**
   * @Router POST /custom/logout
   * @Request body logout
   * @Response 200 baseOK OK
   * @Description 注销用户
   */
  async logout() {
    const { ctx } = this;
    const { username, keyword } = ctx.request.body;
    if (keyword === '123456789') {
      const { id } = await ctx.service.user.deal(username);
      // console.log(user_id)
      const result2 = await ctx.service.info.delete(id);
      const result = await ctx.service.user.logout(id);
      if (result && result2) {
        ctx.status = 200;
        ctx.body = {
          msg: 'success.',
          code: 10200,
          data: {},
        };
        return;
      }
      ctx.status = 500;
      ctx.body = {
        msg: 'Fail due to database.',
        code: 10500,
        data: {},
      };
      return;
    }
    ctx.status = 401;
    ctx.body = {
      msg: 'Unauthorized.',
      code: 10401,
      data: {},
    };
    return;
  }
  /**
   * @Router POST /custom/detail
   * @Request query number *list_id ID
   * @Response 200 detailOK OK
   * @Description 获取详情
   */
  async detail() {
    const { ctx } = this;
    const { list_id } = ctx.query;
    const { success, list } = await ctx.service.list.find({ list_id });
    if (success) {
      ctx.status = 200;
      ctx.body = {
        msg: 'success.',
        code: 10200,
        data: list,
      };
      return;
    }
    ctx.status = 500;
    ctx.body = {
      msg: 'Fail due to database.',
      code: 10500,
      data: {},
    };
    return;
  }
  /**
   * @Router POST /custom/like
   * @Request query number *list_id ID
   * @Request query number *user_id ID
   * @Response 200 baseOK OK
   * @Description (取消)收藏
   */
  async like() {
    const { ctx } = this;
    const { user_id, list_id } = ctx.query;
    const { success: success2 } = await ctx.service.list.find(list_id);
    if (!(success2 && user_id && list_id)) {
      ctx.status = 400;
      ctx.body = {
        msg: 'bad request.',
        code: 10400,
        data: {
          detail: !(user_id && list_id) ? 'missing query.' : 'list id wrong.',
        },
      };
      return;
    }

    const { success, list } = await ctx.service.info.find(user_id);
    if (success) {
      const likeList = JSON.parse(list.likes);
      const index = likeList.findIndex(el => el === parseInt(list_id));
      let newlike = [];
      if (index !== -1) {
        newlike = likeList.filter(el => el !== parseInt(list_id));
      } else {
        likeList.push(parseInt(list_id));
        newlike = likeList.sort((a, b) => (a - b));
      }

      const { success } = await ctx.service.info.update({
        user_id,
        likes: JSON.stringify(newlike),
      });
      if (success) {
        ctx.status = 200;
        ctx.body = {
          msg: 'success.',
          code: 10200,
          data: {},
        };
        return;
      }
    }
    ctx.status = 500;
    ctx.body = {
      msg: 'Fail due to database.',
      code: 10500,
      data: {},
    };
    return;
  }
  /**
   * @Router POST /custom/submit
   * @Request query number *user_id ID
   * @Request body reaction
   * @Response 200 baseOK OK
   * @Description 提交交互
   */
  async submit() {
    const { ctx } = this;
    const { user_id } = ctx.query;
    const { history, action } = ctx.request.body;
    if (!(user_id !== undefined && history instanceof Array && action instanceof Array)) {
      ctx.status = 400;
      ctx.body = {
        msg: 'bad request.',
        code: 10400,
        data: {
          detail: user_id === undefined ? 'missing query.' : history !== undefined && action !== undefined ? 'need array.' : 'body param missing.',
        },
      };
      return;
    }
    const { success, list: preList } = await ctx.service.info.find(user_id);
    if (success) {
      const { history: Phistory, action: Paction } = preList;
      const { success } = await ctx.service.info.update({
        user_id,
        history: JSON.stringify(JSON.parse(Phistory).concat(history)),
        action: JSON.stringify(JSON.parse(Paction).concat(action)),
      });
      if (success) {
        ctx.status = 200;
        ctx.body = {
          msg: 'success.',
          code: 10200,
          data: {},
        };
        return;
      }
    } else if (preList == null) {
      ctx.status = 401;
      ctx.body = {
        msg: 'UnAuthorized.',
        code: 10401,
        data: {},
      };
      return;
    }
    ctx.status = 500;
    ctx.body = {
      msg: 'Fail due to database.',
      code: 10500,
      data: {},
    };
    return;
  }
  /**
   * @Router POST /custom/query
   * @Request query number *user_id ID
   * @Response 200 queryOK OK
   * @Description 获取交互
   */
  async query() {
    const { ctx } = this;
    const { user_id } = ctx.query;
    if (user_id === undefined) {
      ctx.status = 400;
      ctx.body = {
        msg: 'bad request.',
        code: 10400,
        data: {},
      };
      return;
    }
    const { success, list } = await ctx.service.info.find(user_id);
    if (success) {
      ctx.status = 200;
      ctx.body = {
        msg: 'success.',
        code: 10200,
        data: {
          history: JSON.parse(list.history),
          action: JSON.parse(list.action),
        },
      };
      return;
    } else if (list === null) {
      ctx.status = 401;
      ctx.body = {
        msg: 'UnAuthorized.',
        code: 10401,
        data: {},
      };
      return;
    }
    ctx.status = 500;
    ctx.body = {
      msg: 'Fail due to database.',
      code: 10500,
      data: {},
    };
    return;
  }
  /**
   * @Router POST /custom/list
   * @Request query number *page 页数[0-?)
   * @Request query number *limit 最大返回数[0-?)
   * @Response 200 listOK OK
   * @Description 获取展示列表
   */
  async list() {
    const { ctx } = this;
    const { page, limit } = ctx.query;
    const { success, list } = await ctx.service.list.find({
      where: {},
      limit,
      offset: limit * page,
      columns: [ 'list_id', 'title', 'introduce' ],
    });
    if (success) {
      ctx.status = 200;
      ctx.body = {
        msg: 'success.',
        code: 10200,
        data: list,
      };
      return;
    }
    ctx.status = 500;
    ctx.body = {
      msg: 'Fail due to database.',
      code: 10500,
      data: {},
    };
    return;
  }
}

module.exports = CustomController;
