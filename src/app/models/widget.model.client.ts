export class Widget {
  _id: String;
  pageId: String;
  widgetType: String;

  constructor(_id, widgetType, pageId) {
    this._id = _id;
    this.pageId = pageId;
    this.widgetType = widgetType;
  }
}
