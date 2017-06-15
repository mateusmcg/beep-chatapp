import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface'

import { LoginResponse } from '../../models/login/login-response.interface';
import { AuthService } from '../../providers/auth/auth.service';

/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  account = {} as Account;
  @Output() loginStatus: EventEmitter<LoginResponse>;

  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth, private appAuth: AuthService) {
    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  navigateToRegisterPage() {
    this.navCtrl.push('RegisterPage');
  }

  async login() {

    const result = await this.appAuth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(result);

    // try {
    //   const result: LoginResponse = {
    //     result: await this.afAuth.auth.signInWithEmailAndPassword(this.account.email, this.account.password)
    //   }

    //   this.loginStatus.emit(result);
    // } catch (e) {
    //   const error: LoginResponse = {
    //     error: e
    //   }

    //   this.loginStatus.emit(error);
    // }
  }

  // navigateToPage(pageName: string, isRoot: boolean) {
  //   if (isRoot) {
  //     this.navCtrl.setRoot(pageName);
  //   } else {
  //     this.navCtrl.push(pageName);
  //   }
  // }

}
