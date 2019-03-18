import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../../models/page.model.client';


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
    this.pageService.findPageById(this.pageId).subscribe(
      data => {
        console.log(data);
        this.page = data;
      }
    );
  }

  UpdatePage() {
    this.pageService.updatePage(this.pageId, this.page).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  delete() {
    this.pageService.deletePage(this.pageId).subscribe();
  }

}
