import { ValidatorService } from './../../@service/validator.service';
import { LoginService } from './../../@service/login.service';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // 切換登入註冊表單
  isLoginForm: boolean = true;

  // 註冊帳號資料
  ages: number[] = [];
  registerAccount!: string;
  registerPassword!: string;
  registerEmail!: string;
  registerPhone!: string;
  registerAge!: number;
  registerData: any;



  // 登入資料
  userAccount!: string;
  userPassword!: string;


  constructor(
    private router: Router,
    private loginservice: LoginService,
    private validatorservice: ValidatorService,
  ) { }


  ngOnInit(): void {
    for (let i = 16; i <= 100; i++) {
      this.ages.push(i);
    }
  }

  register() {
    this.registerData = {
      registerAccount: this.registerAccount,
      registerPassword: this.registerPassword,
      registerEmail: this.registerEmail,
      registerPhone: this.registerPhone,
      registerAge: this.registerAge,
    };
    this.router.navigateByUrl('/homepage');
    console.log(this.registerData);
  }

  login() {
    const userData = {
      userAccount: this.userAccount,
      userPassword: this.userPassword,
    }
    // console.log(userData);

    this.loginservice.login();
    this.router.navigateByUrl('/admin-homepage');
  }

  logout() {
    this.loginservice.logout();
  }





  backToHomepage() {
    this.router.navigateByUrl('/homepage')
  }

  toLoginForm() {
    this.isLoginForm = !this.isLoginForm;
    this.registerAccount = '';
    this.registerPassword = '';
    this.registerEmail = '';
    this.registerPhone = '';
    this.registerAge = 16;
  }

}
