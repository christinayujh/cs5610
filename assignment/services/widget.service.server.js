module.exports = function (app) {
  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../public/uploads' });

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget", reorderWidgets);
  app.post ("/api/upload", upload.single('myFile'), uploadImage);

  var widgets = [

    {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 2, 'text': 'GIZMODO'},
    {'_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    {
      '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'width': '100%',
      'url': 'http://lorempixel.com/400/200/'
    },
    {'_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
    {'_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    {
      '_id': '678', 'widgetType': 'YOUTUBE', 'pageId': '321', 'width': '100%',

      'url': 'https://youtu.be/AM2Ivdi9c4E'
    },
    {'_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
  ];

  function createWidget(req, res) {
    let widget = {};
    widget.pageId = req.params.pageId;

    widget.widgetType = req.body.widgetType;
    widget.size = req.body.size;
    widget.width = req.body.width;
    widget.text = req.body.text;
    widget.url = req.body.url;
    widget._id = Math.round(Math.random() * 10000).toString();
    widgets.push(widget);
    res.send({widget});
  }

  function findAllWidgetsForPage(req, res) {
    let id = req.params.pageId;
    let wsList = [];
    for (var i in widgets){
      if(widgets[i].pageId === id){
        wsList.push(widgets[i]);
      }
    }
    res.send(wsList);
  }

  function findWidgetById(req, res) {
    var id = req.params.widgetId;

    for (var i in widgets){
      if(widgets[i]._id === id){
        res.send(widgets[i]);
        return;
      }
    }
  }

  function updateWidget(req, res) {
    var id = req.params.widgetId;

    for (var i in widgets){
      if(widgets[i]._id === id){
        widgets[i].widgetType = req.body.widgetType;
        widgets[i].size = req.body.size;
        widgets[i].width = req.body.width;
        widgets[i].text = req.body.text;
        widgets[i].url = req.body.url;
        res.send(widgets[i]);
        return;
      }
    }
  }

  function deleteWidget(req, res) {
    var id = req.params.widgetId;
    for (var i in widgets){
      if(widgets[i]._id === id){
        widgets.splice(i, 1);
        res.send({});
        return;
      }
    }
  }


  function array_swap(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  };

  function reorderWidgets(req, res) {
    array_swap(widgets, parseInt(req.query["start"]), parseInt(req.query["end"]));
    res.sendStatus(200);
  }

  function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename; // new file name in upload folder
    var path = myFile.path; // full path of uploaded file
    var destination = myFile.destination; // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;


    for (var i in widgets){
      if(widgets[i]._id === widgetId){
        widgets[i].url = '/uploads/'+filename;
        return;
      }
    }

    //stay on the page, do not redirect for this assignment
    // var callbackUrl = "/assignment/#/user/"+userId+"/website/"+websiteId+...;
    // res.redirect(callbackUrl);
  }
}
