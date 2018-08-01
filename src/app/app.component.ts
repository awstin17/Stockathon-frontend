import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';

import {UserService} from './user.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    constructor(private router: Router, private _userservice : UserService) {
    }
    
    ngOnInit() {
        this.router.navigate(['/home']);
    }
    
}
