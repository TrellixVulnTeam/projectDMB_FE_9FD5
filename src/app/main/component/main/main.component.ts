import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { HttpServices } from 'src/app/service/http.service';
import { ChatComponent } from '../chat/chat.component';
import { LikeComponent } from '../like/like.component';
import { SearchComponent } from '../search/search.component';
// import { SpinnerCircularModule } from 'spinners-angular/spinner-circular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  public roleAccount:boolean;
  public newProfile: any;
  public isLoaded:boolean=false;
  public ishttpLoaded:boolean=false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public http: HttpServices
    ) { }


  ngOnInit(): void {

    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }
  }

  openDialogchat(): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      height: '80%',
      width: '90%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialoglike(): void {
    const dialogRef = this.dialog.open(LikeComponent, {
      height: '80%',
      width: '90%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogsearch(): void {
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '75%',
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
      localStorage.removeItem('Authorization');
      this.router.navigate(['login', {}])
    }
    send() {
      const test ="https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20220206T162939Z.f89eee1b2c620d9e.922bb9755a6f37ffd99db91fb41ebf412e0ab28b&text=สวัสดี&lang=th-en&format=html"
      this.http.get(test).then(result => {
       console.log(result);
      });;
      }
  }
