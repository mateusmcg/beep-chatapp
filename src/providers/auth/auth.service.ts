import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)
      };
    } catch (e) {
      return <LoginResponse>{
        error: e
      };
    }
  }

}
