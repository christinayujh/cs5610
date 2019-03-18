import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Website} from '../models/website.model.client';
import {environment} from '../../environments/environment';

@Injectable()
export class WebsiteService {
  constructor(private _http: HttpClient) {
  }

  baseUrl = environment.baseUrl;

  findWebsitesByUser(userId) {
    return this._http.get<[Website]>(this.baseUrl + '/api/user/' + userId + '/website');
  }

  createWebsite(userId, website) {
    return this._http.post<Website>(this.baseUrl + '/api/user/' + userId + '/website', website);
  }

  updateWebsite(websiteId, website) {
    return this._http.put<Website>(this.baseUrl + '/api/website/' + websiteId, website);
  }

  findWebsiteById(websiteId) {
    return this._http.get<Website>(this.baseUrl + '/api/website/' + websiteId);
  }

  deleteWebsite(websiteId) {
    return this._http.delete<Website>(this.baseUrl + '/api/website/' + websiteId);
  }

}
