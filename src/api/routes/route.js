'use strict';

module.exports = function(app) {
  var apiController = require('../controllers/controller');

  // Get all the kudos
  // It is not clear how we are going to implement this!!!

  // Get all the kudos
  app.get(`/kudos/:id`, apiController.getKudos);

  // Delete a kudos
  app.delete(`/kudos/:id`, apiController.deleteKudos);
};