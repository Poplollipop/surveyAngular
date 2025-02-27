import { SessionService } from './@service/session.service';
import { LoginService } from './@service/login.service';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  admin: boolean = false;
  userStatus:boolean = false;


  constructor(
    private router: Router,
    private loginservice: LoginService,
    private sessionservice:SessionService,
  ) { }

  ngOnInit(): void {
    // 訂閱登入狀態
    this.loginservice.login$.subscribe(status => {
      this.userStatus = status;
    });
    // console.log(this.userStatus);
  }

  login() {
    // this.loginservice.login();
    this.router.navigateByUrl('/login');
    this.sessionservice.answerSurveyData = null;
  }

  logout() {
    this.loginservice.logout();
    this.router.navigateByUrl('/homepage');
    this.sessionservice.answerSurveyData = null;
  }

  toHomepage(){
    this.router.navigateByUrl('/homepage');
    this.sessionservice.answerSurveyData = null;
  }

  toAdminHomepage(){
    this.router.navigateByUrl('/admin-homepage');
    this.sessionservice.answerSurveyData = null;
  }

  toCreateSurvey(){
    this.router.navigateByUrl('/create-survey');
    this.sessionservice.answerSurveyData = null;
  }

  toMemberInfo(){
    this.router.navigateByUrl('/member-page');
    this.sessionservice.answerSurveyData = null;
  }

}
