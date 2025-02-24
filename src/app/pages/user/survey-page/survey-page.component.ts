import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from '../../../@service/login.service';

@Component({
  selector: 'app-survey-page',
  imports: [
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './survey-page.component.html',
  styleUrl: './survey-page.component.scss'
})
export class SurveyPageComponent {

  userStatus: boolean = false;

  constructor(
    private router: Router,
    private loginservice: LoginService,
  ) { }

  ngOnInit(): void {
    // 訂閱登入狀態
    this.loginservice.login$.subscribe(status => {
      this.userStatus = status;
      // console.log(this.userStatus);
    });
  }

  toStatistics() {
    this.router.navigateByUrl('/statistics')
  }

}
