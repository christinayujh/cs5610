module.exports = function (app) {

//website related api
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websites = [
    { _id: "123", name: "Facebook", developerId: "456", description: "Lorem" },
    { _id: "234", name: "Tweeter",  developerId: "456", description: "Lorem" },
    { _id: "456", name: "Gizmodo",  developerId: "456", description: "Lorem" },
    { _id: "890", name: "Go12",       developerId: "123", description: "Lorem" },
    { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
    { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
    { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }
  ]

  function createWebsite(req, res) {
    let website = {};
    website.name = req.body.name;
    website.developerId = req.params.userId;
    website.description = req.body.description;
    website._id = Math.round(Math.random() * 10000).toString();
    websites.push(website);
    res.send(website);
  }

  function findAllWebsitesForUser(req, res) {
    let id = req.params.userId;
    let wsList = [];
    for (var i in websites){
      if(websites[i].developerId === id){
        wsList.push(websites[i]);
      }
    }
    res.send(wsList);
  }

  function findWebsiteById(req, res) {
    var id = req.params.websiteId;

    for (var i in websites){
      if(websites[i]._id === id){
        res.send(websites[i]);
        return;
      }
    }
  }

  function updateWebsite(req, res) {
    var id = req.params.websiteId;

    for (var i in websites){
      if(websites[i]._id === id){
        websites[i].name = req.body.name;
        websites[i].description = req.body.description;
        res.send(websites[i]);
        return;
      }
    }
  }

  function deleteWebsite(req, res) {
    var id = req.params.websiteId;
    for (var i in websites){
      if(websites[i]._id === id){
        websites.splice(i, 1);
        res.send({});
        return;
      }
    }
  }

}
