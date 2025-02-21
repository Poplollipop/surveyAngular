import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _login$ = new BehaviorSubject<boolean>(false);
  login$ = this._login$.asObservable();

  login() {
    this._login$.next(true);
  }

  logout() {
    this._login$.next(false)
  }
  constructor() { }
}
