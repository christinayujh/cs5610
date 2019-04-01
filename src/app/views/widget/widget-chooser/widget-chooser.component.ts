import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})

export class WidgetChooserComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widget;

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.pageId = params['pid'];
      this.userId = params['uid'];
      this.websiteId = params['wid'];
    });
  }

  createWidget() {
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(data =>
      this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + data._id]));
  }

  createHeader() {
    this.widget = {pageId: this.pageId, widgetType: 'HEADING'};
    this.createWidget();
   }

  createHtml() {
    this.widget = {pageId: this.pageId, widgetType: 'HTML'};
    this.createWidget();
  }

  createText() {
    this.widget = {pageId: this.pageId, widgetType: 'TEXT'};
    this.createWidget();
  }

  createImage() {
    this.widget = {pageId: this.pageId, widgetType: 'IMAGE'};
    this.createWidget();
  }

  createYoutube() {
    this.widget = {pageId: this.pageId, widgetType: 'YOUTUBE'};
    this.createWidget();
  }

}
