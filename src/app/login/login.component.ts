import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  credentials: any = {
    email: "",
    password: ""
  }
  

  constructor(private _userservice : UserService, private _router : Router) { }

  ngOnInit() {
  }
  
  login() {
    this._userservice.login(this.credentials)
    .subscribe(
      (response: any) => {console.log(response);
      alert("You are logged in!");
        window.sessionStorage.setItem('token', response.token);
        window.sessionStorage.setItem('userId', response.userId);
        this._userservice.userToken = window.sessionStorage.getItem('token');
        this._userservice.userId = window.sessionStorage.getItem('userId');
        this._router.navigate(['/home']);
      },
      (error) => alert("invalid credentials, booooo")
      
      )
  }

}
