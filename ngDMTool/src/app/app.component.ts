import { Component, OnInit } from '@angular/core';
import {
  GridstackComponent,
  GridstackModule
} from '../../node_modules/@libria/gridstack';
import * as _ from '../../node_modules/lodash';
import * as $ from '../../node_modules/jquery';
import { Gridline } from './models/gridline';
import { AuthenticationService } from './authentication.service';
import { Router } from '../../node_modules/@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridstackService } from '../../node_modules/@libria/gridstack/services/gridstack.service';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  test = 0;
  title = 'app';
  grids = [];
  theme = 'mountain';
  locked = false;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  login(form) {
    console.log(form.value);
    this.authenticationService
      .login(form.value.username, form.value.password)
      .subscribe(
        data => {
          console.log('logged in');
          location.reload();
        },
        err => console.log(err)
      );
  }

  logout() {
    this.authenticationService.logout();
  }

  register(form) {
    const user = new User();
    user.username = form.value.username;
    user.password = form.value.password;
    this.authenticationService.register(user).subscribe(
      data => {
        this.authenticationService
          .login(form.value.username, form.value.password)
          .subscribe(
            data => {
              location.reload();
            },
            err => console.log(err)
          );
      },
      err => console.log(err)
    );
  }
  checkLogin() {
    return this.authenticationService.checkLogin();
  }

  ngOnInit() {}
}
