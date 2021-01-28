'use strict';

function baseResponse(type) {
  return {
    msg: { type: 'string', required: true, example: 'success.' },
    code: { type: 'number', required: true, example: 10200 },
    data: { type: `${type}`, required: true, example: {} },
  };
}


function baseResponseArray(type) {
  return {
    msg: { type: 'string', required: true, example: 'success.' },
    code: { type: 'number', required: true, example: 10200 },
    data: { type: 'array', required: true, itemType: `${type}` },
  };
}

module.exports = {
  data: {},
  login: {
    user_id: { type: 'number', required: true },
  },
  logout: {
    username: { type: 'string', required: true, example: '' },
    keyword: { type: 'string', required: true, example: '' },
  },
  //
  detail: {
    title: { type: 'string', required: true },
    introduce: { type: 'string', required: true },
    content: { type: 'string', required: true },
  },
  list: {
    list_id: { type: 'number', required: true },
    title: { type: 'string', required: true },
    introduce: { type: 'string', required: true },
  },
  update: {
    list_id: { type: 'number', required: true },
    title: { type: 'string', required: true },
    introduce: { type: 'string', required: true },
    content: { type: 'string', require: true },
  },
  //
  history: {
    content: { type: 'string', require: true },
    tapNode: { type: 'string', require: true },
  },
  action: {
    node: { type: 'string', require: true },
    start: { type: 'string', require: true },
    interval: { type: 'string', require: true },
  },
  reaction: {
    history: { type: 'array', required: true, itemType: 'history' },
    action: { type: 'array', required: true, itemType: 'action' },
  },
  listInsert: {
    list_id: { type: 'number', required: true },
  },
  baseOK: baseResponse('data'),
  loginOK: baseResponse('login'),
  detailOK: baseResponseArray('detail'),
  listOK: baseResponseArray('list'),
  queryOK: baseResponse('reaction'),
  listInsertOK: baseResponse('listInsert'),
};
