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
  }

  facebookLogin() {
    this.appAuth.facebookLogin().then(result => {
      alert('Logado com sucesso! ' + JSON.stringify(result));
      console.debug(result);
    }, error => {
      alert('Erro ao logar com fb! ' + JSON.stringify(error));
      console.log(error);
    });;
  }

  googleLogin() {
    this.appAuth.googleLogin();
  }

  facebookLoginPopUp() {
    this.appAuth.facebookLoginPopUp();
  }

  googleLoginPopUp() {
    this.appAuth.googleLoginPopUp();
  }

}
