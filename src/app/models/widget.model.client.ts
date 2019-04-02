export class Widget {
  _id: String;
  pageId: String;
  widgetType: String;
  name: String;
  text: String;
  placeholder: String;
  description: String;
  url: String;
  width: String;
  height: String;
  rows: Number;
  size: Number;
  class: String;
  icon: String;
  deletable: Boolean;
  formatted: Boolean;
  position: Number;


  constructor(_id, widgetType, pageId) {
    this._id = _id;
    this.pageId = pageId;
    this.widgetType = widgetType;
  }
}
