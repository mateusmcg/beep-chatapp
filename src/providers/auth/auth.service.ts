import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private fb: Facebook, private platform: Platform, private google: GooglePlus) {
    console.log('Hello AuthProvider Provider');
  }

  facebookLoginPopUp() {
    try {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(result => {
        console.debug(result);
      }, error => {
        console.debug(error);
      });
    } catch (e) {
      console.error(e);
    }
  }

  googleLoginPopUp() {
    try {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
        console.debug(result);
      }, error => {
        console.debug(error);
      });
    } catch (e) {
      console.error(e);
    }
  }

  facebookLogin() {
    try {
      if (this.platform.is('cordova')) {
        return this.fb.login(['email', 'public_profile']).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential);
        })
      }
      else {
        return this.afAuth.auth
          .signInWithPopup(new firebase.auth.FacebookAuthProvider());
      }
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }

  // facebookLogin() {
  //   try {
  //     this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).then(result => {
  //       console.debug(result);
  //       alert("Logado com sucesso!");
  //     }, error => {
  //       console.debug(error);
  //       alert("Erro ao autenticar! " + error.name + " " + error.message);
  //     });
  //   } catch (e) {
  //     alert("Erro Geral");
  //     console.error(e);
  //   }
  // }

  googleLogin() {
    try {
      this.google.login({
        'webClientId': '606200178526-ntne7hs5oicf0qlv4esd6bdfqarbf9fq.apps.googleusercontent.com',
        'offline': true
      }).then(result => {
        alert('Atenticado no google: ' + JSON.stringify(result));
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken))
          .then(success => {
            console.debug(result);
            alert("Logado com sucesso!");
          })
          .catch(error => {
            console.log("Firebase failure: " + JSON.stringify(error));
            alert("Erro ao autenticar no Firebase!");
          });
      }, error => {
        console.debug(error);
        alert("Erro ao autenticar!" + JSON.stringify(error));
      });
    } catch (e) {
      alert("Erro Geral");
      console.error(e);
    }
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

  async createUserWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse>{
        result: await this.afAuth.auth.createUserWithEmailAndPassword(account.email, account.password)
      }
    } catch (e) {
      return <LoginResponse>{
        error: e
      }
    }
  }

  getAuthenticatedUser() {
    return this.afAuth.authState;
  }

}
