import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  account = {} as Account;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController) {
  }

  async register() {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.account.email, this.account.password);

      this.toastCtrl.create({
        message: 'Account successfully created!',
        duration: 3000
      }).present();

      console.log(result);
    } catch (e) {
      console.error(e);
      this.toastCtrl.create({
        message: e.message,
        duration: 3000
      }).present();
    }

  }
}
