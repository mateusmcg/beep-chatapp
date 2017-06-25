import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response.interface';
import { DataService } from "../../providers/data/data.service";
import { User } from "firebase/app";
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../providers/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toast: ToastController, private dataService: DataService, private appAuth: AuthService, private afAuth: AngularFireAuth) {
    // this.authenticatedUser$ = this.appAuth.getAuthenticatedUser().subscribe(
    //   (user: User) => {
    //     this.authenticatedUser = user
    //     console.log(user);
    //     if (!user) {
    //       alert('Não tem ninguem logado.');
    //     } else {
    //       alert(user.email);
    //     }
    //   });

    this.afAuth.auth.onAuthStateChanged(result => {
      console.debug(result);
      if (!result) {
        alert('Ninguem logado');
      } else {
        alert('Usuário logado: ' + result.email);
      }
    }, error => {
      console.debug(error);
      alert('error');
    })
  }

  login(event: LoginResponse) {
    if (!event.error) {
      this.toast.create({
        message: `Welcome to Beep, ${event.result.email}`,
        duration: 3000
      }).present();

      this.dataService.getProfile(<User>event.result).subscribe(profile => {
        console.log(profile);
        profile.val() ? this.navCtrl.setRoot("TabsPage") : this.navCtrl.setRoot("EditProfilePage");
      })

      //this.navCtrl.setRoot("EditProfilePage");
    } else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }
  }

}
