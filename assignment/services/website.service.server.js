module.exports = function (app) {
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websiteModel = require('../models/website/website.model.server');


  /*websites = [
    { _id: "123", name: "Facebook", developerId: "456", description: "Lorem" },
    { _id: "234", name: "Tweeter", developerId: "456", description: "Lorem" },
    { _id: "456", name: "Gizmodo", developerId: "456", description: "Lorem" },
    { _id: "890", name: "Go", developerId: "123", description: "Lorem" },
    { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
    { _id: "678", name: "Checkers", developerId: "123", description: "Lorem" },
    { _id: "789", name: "Chess", developerId: "234", description: "Lorem" }
  ];*/

  function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;

    websiteModel.createWebsite(userId,website)
      .then(
        function (website) {
          res.json(website);
        },
        function (error) {
          res.statusCode(400).send(error);
        }
      )
  }

  function findAllWebsitesForUser(req, res) {
    let userId = req.params.userId;

    websiteModel.findAllWebsiteForUser(userId)
      .then(
        function (websites) {
          res.json(websites);
        },
        function (err) {
          res.statusCode(400).send(err);
        }
      )
  }

  function findWebsiteById(req, res) {
    let websiteId = req.params.websiteId;

    websiteModel.findWebsiteById(websiteId)
      .then(
        function(website){
          res.json(website);
        },
        function (err) {
          res.statusCode(400).send(err);
        }
      )
  }

  function updateWebsite(req, res) {
    let websiteId = req.params.websiteId;
    let website = req.body;

    websiteModel.updateWebsite(websiteId,website)
      .then(
        function (website) {
          res.json(website);
        },
        function (err) {
          res.statusCode(400).send(err);
        }
      );
  }

  function deleteWebsite(req, res) {
    let websiteId = req.params.websiteId;
    websiteModel.deleteWebsite(websiteId)
      .then(
        function (data) {
          res.json(data);
        },
        function (err) {
          res.statusCode(400).send(err);

        }
      );
  }
}
