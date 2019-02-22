import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  userId: String;
  websites = [{}];
  // urls = [];

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];

    });
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
    for (let x = 0; x < this.websites.length; x++) {
      this.websites[x]['url'] = '/user/' + this.userId + '/website/' + this.websites[x]['_id'];
    }
  }

}