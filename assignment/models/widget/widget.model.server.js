var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');

var widgetModel = mongoose.model("Widget", widgetSchema);


widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;


function createWidget(pageId, widget) {
  widget.pageId = pageId;
  return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
  return widgetModel.find({pageId: pageId});
}

function findWidgetById(id) {
  return widgetModel.findById(id);
}


function updateWidget(widgetId, widget) {
  return widgetModel.findByIdAndUpdate(widgetId, widget);
}

function deleteWidget(widgetId) {
  return widgetModel.findByIdAndRemove(widgetId);
}

function reorderWidget(pageId, start, end) {

}
