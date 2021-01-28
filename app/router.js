'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // custom
  router.post('/api/v1/custom/login', controller.custom.login);
  router.post('/api/v1/custom/logout', controller.custom.logout);
  router.post('/api/v1/custom/detail', controller.custom.detail);
  router.post('/api/v1/custom/like', controller.custom.like);
  router.post('/api/v1/custom/submit', controller.custom.submit);
  router.post('/api/v1/custom/query', controller.custom.query);
  router.post('/api/v1/custom/list', controller.custom.list);
  // manage;
  // group /api/v1/manage;
  router.post('/api/v1/manage/insert', controller.manage.insert);
  router.delete('/api/v1/manage/delete', controller.manage.delete);
  router.post('/api/v1/manage/update', controller.manage.update);
};
