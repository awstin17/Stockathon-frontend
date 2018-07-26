import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: any = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
  }

  constructor(private _register : UserService, private _router : Router) { }

  ngOnInit() {
  }

  register() {
    this._register.register(this.user)
    .subscribe(
     (res: any) => { console.log(res);
      window.sessionStorage.setItem('token', res.token);
      window.sessionStorage.setItem('userId', res.userId); 
      this._router.navigate(['/home']);
     }
      )
  }
}