import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {Website} from '../../../models/website.model.client';


@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  userId: string;
  websiteId: string;
  website: Website;
  websites = [{}];


  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.websiteService.findWebsiteById(params.wid).subscribe(
        data => {
          this.website = data;
        }
      );
    });
    this.websiteService.findWebsitesByUser(this.userId).subscribe(
      data => {
        this.websites = data;
      }
    );
  }

  UpdateWebsite() {
    this.websiteService.updateWebsite(this.websiteId, this.website).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  delete() {
    this.websiteService.deleteWebsite(this.websiteId).subscribe();
  }
}
