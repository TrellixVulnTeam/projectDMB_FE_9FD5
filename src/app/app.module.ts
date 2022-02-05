import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatSliderModule} from '@angular/material/slider';
import { MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { UserAccountService } from './service/userAccount.service';
import { FormsModule } from '@angular/forms';
import { EmployeeService} from './service/employee.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpServices } from './service/http.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { ForgotPasswordComponent } from './changead/components/forgot-password/forgot-password.component';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import { AppRoutingModule } from  './app-routing.module';
import { EditPassComponent } from './changead/components/edit-pass/edit-pass.component';
import {MatMenuModule} from '@angular/material/menu';
import { MAT_DATE_LOCALE } from '@angular/material/core';

//------Component-----//
import { ChangeadComponent} from './changead/components/chande-ad/chande-ad.component';
import { CreateAccountComponent } from './account-manage/components/create-account/create-account.component';
import { ListAccountComponent } from './account-manage/components/list-account/list-account.component';
import { EditAccountComponent } from './account-manage/components/edit-account/edit-account.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/component/main/main.component';


// import { NgxTextEditorModule } from 'ngx-text-editor';
// import { AngularEditorModule } from '@kolkov/angular-editor';
// import { EditorModule } from 'primeng/editor'
// import { ConfirmationService } from 'primeng-lts/api';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import { CreateAccountPage2Component } from './account-manage/components/create-account-page2/create-account-page2.component';
import { SearchComponent } from './main/component/search/search.component';
import { ChatComponent } from './main/component/chat/chat.component';
import { LikeComponent } from './main/component/like/like.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangeadComponent,
    ForgotPasswordComponent,
    CreateAccountComponent,
    ListAccountComponent,
    EditAccountComponent,
    EditPassComponent,
    MainComponent,
    CreateAccountPage2Component,
    SearchComponent,
    ChatComponent,
    LikeComponent,
  ],

  imports: [
    BrowserModule,
    // ConfirmationService,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutingModule,{
      useHash: true
    }),
    MatSliderModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule ,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatRadioModule,
    MatMenuModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()

    // AngularEditorModule
    // EditorModule


  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    MatPaginatorModule,
    MatSliderModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule
    // EditorModule
    ],
    entryComponents: [
      // DataEmployeePopupComponent,
      // PopupAssetComponent,
      // DataAssetPopupComponent,
    ],

  providers: [
    UserAccountService,
    HttpServices,
    EmployeeService,
    // ConfirmationService,
    // PositionService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

