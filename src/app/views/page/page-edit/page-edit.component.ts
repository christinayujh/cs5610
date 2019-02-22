import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

export class Page {
  _id: String;
  name: String;
  websiteId: String;
  description: String;

  constructor(_id, name, websiteId, description) {
    this._id = _id;
    this.name = name;
    this.websiteId = websiteId;
    this.description = description;
  }

}

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  page: Page;

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
    });
    this.page = this.pageService.findPageById(this.pageId);
  }

  UpdatePage() {
    this.pageService.updatePage(this.pageId, this.page);
  }

  delete() {
    this.pageService.deletePage(this.pageId);
  }

}
