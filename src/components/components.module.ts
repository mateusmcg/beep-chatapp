import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'

import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';

@NgModule({
    imports: [IonicModule],
    exports: [
        LoginFormComponent,
        RegisterFormComponent,
        EditProfileFormComponent
    ],
    declarations: [
        LoginFormComponent,
        RegisterFormComponent,
        EditProfileFormComponent
    ],
    providers: []
})
export class ComponentsModule {

}
