'use strict';

module.exports = function(app) {
  var apiController = require('../controllers/controller');

  // Get all the kudos
  app.get(`/kudos/:id`, apiController.getKudos);
};