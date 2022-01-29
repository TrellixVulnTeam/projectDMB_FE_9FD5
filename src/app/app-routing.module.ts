import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from '../app/login/login.component';
import { ChangeadComponent} from './changead/components/chande-ad/chande-ad.component';
import { ForgotPasswordComponent } from './changead/components/forgot-password/forgot-password.component';
import { CreateAccountComponent } from './account-manage/components/create-account/create-account.component';
import { ListAccountComponent } from './account-manage/components/list-account/list-account.component';
import { EditPassComponent } from './changead/components/edit-pass/edit-pass.component';
import { MainComponent } from './main/component/main/main.component';
import { CreateAccountPage2Component } from './account-manage/components/create-account-page2/create-account-page2.component';
export const AppRoutingModule: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login',  component: LoginComponent},
  { path: 'create-account',  component: CreateAccountComponent},
  { path: 'list-account',  component: ListAccountComponent},
  { path: 'changead',  component:  ChangeadComponent},
  { path: 'forgot',  component: ForgotPasswordComponent},
  { path: 'editpassword', component: EditPassComponent},
  { path: 'main',  component: MainComponent},
  { path: 'create-account-page2',  component: CreateAccountPage2Component},

];

