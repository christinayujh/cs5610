import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  userId: String;
  websiteId: String;
  pages = [{}];

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];


    });
    this.pages = this.pageService.findPagesByWebsiteId(this.websiteId);
    for (let x = 0; x < this.pages.length; x++) {
      this.pages[x]['url'] = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pages[x]['_id'];
    }
  }

}
