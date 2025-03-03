import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reply-thanks',
  imports: [
    MatButton,
  ],
  templateUrl: './reply-thanks.component.html',
  styleUrl: './reply-thanks.component.scss'
})
export class ReplyThanksComponent {

  constructor(private router: Router) {

  }

  goHomepage(){
    this.router.navigateByUrl('/homepage')
  }

}
