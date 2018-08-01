import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {URLSearchParams} from '@angular/http';


@Injectable()
export class UserService {
  
  userToken: string = "";
  userId: string = "";
  APIURL: string = "http://summer-austin-2018-phortonssf.c9users.io:8080/api/appUsers";
  constructor(private http: HttpClient) { }
  
  login(credentials) {
    // return this.http.get("http://summer-austin-2018-phortonssf.c9users.io:8080/api/appUsers?filter=[where][and][0][username]=" + username + "&filter[where][and][1][password]=" + password);
    // return this.http.get("http://summer-austin-2018-phortonssf.c9users.io:8080/api/appUsers/findOne?filter[where][username]=awstin17&filter[where][password]=Blorinthium2!");
    return this.http.post(this.APIURL + "/login", credentials);

  }
  
  logout(token) {
    return this.http.post(this.APIURL + "/logout" + "?access_token=" + token, {});
    // return this.http.post("http://summer-austin-2018-phortonssf.c9users.io:8080/api/appUsers/logout?access_token=OBivUmsbh7C9DRkLS9NX7VLpDOmdlTbmyIqJWjYO2HA2lefZX4UU55RnXOT2R7L6", {});
    
  }
  
  register(user: {}) {
    return this.http.post(this.APIURL, user)
  }
  
  getUser(id, token) {
    return this.http.get(this.APIURL + '/' + id + '?access_token=' + token)
  }
}
