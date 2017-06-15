import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  text: string;

  constructor(private navCtrl: NavController) {
  }

  navigateToPage(pageName: string, isRoot: boolean) {
    if (isRoot) {
      this.navCtrl.setRoot(pageName);
    } else {
      this.navCtrl.push(pageName);
    }
  }

}
