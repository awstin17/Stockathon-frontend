import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RegisterService {

  constructor(private http : HttpClient) { }
  
  register(user: {}) {
    return this.http.post("http://summer-austin-2018-phortonssf.c9users.io:8080/api/appUsers", user)
  }
}
