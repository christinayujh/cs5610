import { Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  userId: String;
  websiteId: String;
  pageId: String;

  constructor(private pageService: PageService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
    });
  }

  createPage() {
    const pageName = this.loginForm.value.pageName;
    const pageTitle = this.loginForm.value.pageTitle;
    const page = {name: pageName, description: pageTitle};
    this.pageService.createPage(this.websiteId, page).subscribe(pag => {
      console.log(pag);
      this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page']);
    });
  }

}
