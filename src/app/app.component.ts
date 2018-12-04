import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';

import {UserService} from './user.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    
    beforeRoute: any;
    afterRoute: any;
    
    constructor(private router: Router, private _userservice : UserService) {
        this.router.events.filter(e => e.constructor.name === 'RoutesRecognized').pairwise().subscribe((e) => {
            // console.log(e);
            this.beforeRoute = e[0];
            this.afterRoute = e[1];
            let test = [this.beforeRoute.url, this.afterRoute.url];
            console.log(test)
            if(test[0] === "/registration") {console.log("yahoo")}
        })}
    
    ngOnInit() {
        if(this._userservice.userToken) {
        this.router.navigate(['/home']);
        }
        else { this.router.navigate(['/about']);
        }
    }
    
}
