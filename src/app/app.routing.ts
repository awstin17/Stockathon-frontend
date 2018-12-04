/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent } from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {TrendComponent} from './trend/trend.component';
import {DailyComponent} from './daily/daily.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'nada', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'chart', component: TrendComponent},
    {path: 'home', component: DailyComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
