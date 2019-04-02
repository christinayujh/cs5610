import {Injectable} from '@angular/core';
import {User} from '../models/user.model.client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService {
  constructor(private _http: HttpClient) {
  }

  baseUrl = environment.baseUrl;


  createUser(user: any) {
    return this._http.post<User>(this.baseUrl + '/api/user/', user);
  }

  findUserById(userId: String) {
    return this._http.get<User>(this.baseUrl + '/api/user/' + userId);
  }

  findUserByUsername(username: string) {
    return this._http.get<User>(this.baseUrl + '/api/user?username=' + username);
  }

  updateUser(user) {
    console.log(user);
    return this._http.put<User>(this.baseUrl + '/api/user/' + user._id, user);
  }

  findUserByCredential(username: String, password: String) {
    return this._http.get<User>(this.baseUrl + '/api/user?username=' + username + '&password=' + password);
  }

  deleteUser(userId) {
    return this._http.delete<User>(this.baseUrl + '/api/user/' + userId);
  }

  login(username: String, password: String) {

  }
}
