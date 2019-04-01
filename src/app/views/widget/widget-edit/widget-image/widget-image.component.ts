import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget;
  baseUrl = environment.baseUrl;

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: any) => {
      this.pageId = params['pid'];
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.widgetId = params['wgid'];
    });
    this.widgetService.findWidgetById(this.widgetId).subscribe(
      data => {
        this.widget = data;
      }
    );
    console.log(this.widget);
  }

  updateWidget() {
    this.widgetService.updateWidget(this.widget._id, this.widget).subscribe(
      data => {
        this.widget = data;
      }
    );
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id).subscribe();
  }
}
