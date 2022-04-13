import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/service/http.service';
import { LikeUserService } from 'src/app/service/likeUser.service';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { UiService } from 'src/app/ui.service';
import Swal from 'sweetalert2';
import { ChatComponent } from '../chat/chat.component';
import { ComponentSentComponent } from '../component-sent/component-sent.component';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  listlike:any;
  id_User:number
  likeUser: FormGroup;
  status: FormGroup;
  public newProfile: any;
  public roleAccount:boolean;
  listMatch:any
  pollComponent: any;
  surveyComponent: any;
  dataUser:any
  picMe:any

  constructor(
    public userAccountService: UserAccountService,
    private ui: UiService,
    private router: Router,
    public dialog: MatDialog,
    public http: HttpServices,
    private formBuilder: FormBuilder,
    public likeUserService :LikeUserService,
  ) { }

  ngOnInit(): void {
    this.ui.show()
    this.likeUser  = this.formBuilder.group({
      id_likeuser: new FormControl({ value: '', disabled: false }),
      user1: new FormControl({ value: '', disabled: false }),
      user2: new FormControl({ value: '', disabled: false }),
      id_chat: new FormControl({ value: null, disabled: false }),
      status: new FormControl({ value: null, disabled: false }),
      chat_status: new FormControl({ value: false, disabled: false }),
    });

    this.status  = this.formBuilder.group({
      id_likeuser: new FormControl({ value: '', disabled: false }),
      status: new FormControl({ value: null, disabled: false })
    });
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    this.id_User = this.newProfile._id
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }
    this.http.postData('/services/webasset/api/whereListlike',{user2:this.id_User}).then(result =>{
      this.listlike = result
    });
    this.http.postData('/services/webasset/api/whereMatch',{user2:this.id_User}).then(result =>{
      this.listMatch = result
      console.log(this.listMatch);
      this.ui.hide()
    });
    this.http.postData('/services/webasset/api/viewAccouct',{_id: this.id_User}).then(result =>{
      this.dataUser = result[0]
      this.picMe =result[0].picture
      this.ui.hide()
    });
  }
  openDialogchat(): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      height: '90%',
      width: '90%',
      panelClass: 'custom-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  Deleteaccount(){
    Swal.fire({
      title: 'Delete Account',
      text: "Are you sure you want to delete this Account?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ca9dbb',
      cancelButtonColor: '#696969',
    }).then((result) => {
      if (result.isConfirmed) {
       this.http.postData('/services/webasset/api/createHistory',this.dataUser)
        this.userAccountService.deleteAccount(this.newProfile).then(() => {
         Swal.fire(
           'Deleted!',
           'Your file has been deleted.',
           'success'
         )
         this.router.navigate(['login', {}]);
        });

      }
    })

}
  openDialoglike(): void {
    this.ui.show()
    this.router.navigate(['like', {}]);
    // const dialogRef = this.dialog.open(LikeComponent, {
    //   height: '80%',
    //   width: '90%',
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }
  like(item,id,index){
    this.listlike.splice(index, 1);
    const id_likeuser = item.id_likeuser
    console.log(id_likeuser);
      this.likeUser.patchValue({
        id_likeuser:id_likeuser,
        user1:this.id_User,
        user2:id,
        status:this.likeUser.value.status,
        chat_status : false
      })
      this.status.patchValue({
        id_likeuser:id_likeuser,
        status:true,
      })

      const obj = {
        status: true }
      this.http.put(`/services/webasset/api/updateLike/${id_likeuser}`, this.status.value)
      // this.likeUserService.putStatusLike(this.status.value).then(result =>{
      //   debugger
      //   this.listlike = result
      // });

  }
  unlike(item,index){
    debugger
    this.listlike.splice(index, 1);
    const id_likeuser = item.id_likeuser
    this.http.delete(`/services/webasset/api/deleteLike/${id_likeuser}`).then(result =>{
      this.listlike = result
    });

  }
  unMatch(item,index){
    debugger
    this.listMatch.splice(index, 1);
    const id_likeuser = item.id_likeuser
    this.http.delete(`/services/webasset/api/deleteLike/${id_likeuser}`).then(result =>{
      this.listlike = result
    });
  }
  openDialogSent(item): void {
    const dialogRef = this.dialog.open(ComponentSentComponent, {
      height: '25%',
      width: '25%',
      data: {
        dataKey: item
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.http.postData('/services/webasset/api/whereMatch',{user2:this.id_User}).then(result =>{
        this.listMatch = result
      });
    });
  }
  logout() {
    localStorage.removeItem('Authorization');
    this.router.navigate(['login', {}]);
}
  openDialogsearch(): void {

  }

  onTabChanged(event: MatTabChangeEvent)
  {
    this.ui.show()
    debugger
    if(event.tab.textLabel== "See Who Like You")
    {
      this.http.postData('/services/webasset/api/whereListlike',{user2:this.id_User}).then(result =>{
        this.listlike = result
        this.ui.hide()
      });
    }
    else
    {
      this.http.postData('/services/webasset/api/whereMatch',{user2:this.id_User}).then(result =>{
        this.listMatch = result
        console.log(this.listMatch);
        this.ui.hide()
      });
    }
  }
}
