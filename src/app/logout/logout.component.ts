import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _service: UserService, private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this._service.logout(window.sessionStorage.getItem('token'))
      .subscribe(
        (response) => {alert("you're logged out! yay!");
        window.sessionStorage.clear();
        this.router.navigate(['/login']);
        }
        
        
        )
  }
}
