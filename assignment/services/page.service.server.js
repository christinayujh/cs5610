module.exports = function (app) {
  var pages = [

    {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},

    {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},

    {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}

  ];

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function createPage(req, res) {
    let page = {};
    page.name = req.body.name;
    page.websiteId = req.params.websiteId;
    page.description = req.body.description;
    page._id = Math.round(Math.random() * 10000).toString();
    pages.push(page);
    res.send({page});
  }

  function findAllPagesForWebsite(req, res) {
    let id = req.params.websiteId;
    let pageList = [];
    for (var i in pages){
      if(pages[i].websiteId === id){
        pageList.push(pages[i]);
      }
    }
    res.send(pageList);
  }

  function findPageById(req, res) {
    var id = req.params.pageId;

    for (var i in pages) {
      if (pages[i]._id === id) {
        res.send(pages[i]);
        return;
      }
    }
  }

  function updatePage(req, res) {
    var id = req.params.pageId;

    for (var i in pages){
      if(pages[i]._id === id){
        pages[i].name = req.body.name;
        pages[i].description = req.body.description;
        res.send(pages[i]);
        return;
      }
    }
  }

  function deletePage(req, res) {
    var id = req.params.pageId;
    for (var i in pages){
      if(pages[i]._id === id){
        pages.splice(i, 1);
        res.send({});
        return;
      }
    }
  }

}
