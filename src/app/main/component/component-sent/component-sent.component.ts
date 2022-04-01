import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServices } from 'src/app/service/http.service';
import { UiService } from 'src/app/ui.service';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-component-sent',
  templateUrl: './component-sent.component.html',
  styleUrls: ['./component-sent.component.css']
})
export class ComponentSentComponent implements OnInit {
dataProfile:any
profileName:any
idProfile:any
message: FormGroup;
id_chatUpdate:any
id_chatSent:any
id_sender:number
likeUser: FormGroup;
user1:any
user2:any
public newProfile: any;
loading = false;
  constructor(
    private ui: UiService,
    public http: HttpServices,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ComponentSentComponent>,
    ) { }

  ngOnInit(): void {
    this.dataProfile = this.data.dataKey
    this.profileName = this.dataProfile.nickname
    this.idProfile = this.dataProfile.id_likeuser
    this.user1 =   this.dataProfile.user1
    this.user2 =   this.dataProfile.user2

    console.log(  this.dataProfile);
    this.message  = this.formBuilder.group({
      id_chat: new FormControl({ value: '', disabled: false }),
      id_receivet: new FormControl({ value: '', disabled: false }),
      id_sender: new FormControl({ value: null, disabled: false }),
      message: new FormControl({ value: '', disabled: false }),
      time: new FormControl({ value: '', disabled: false }),
      status: new FormControl({ value: null, disabled: false }),
    });

  }
  Send(){
    this.loading = true;
    const obj = { id_chat: uuid() , chat_status: true }
    this.http.put(`/services/webasset/api/updateLike/${this.idProfile}`,obj).then(result =>{
      console.log(result);
    });

    this.message.patchValue({
      id_chat:obj.id_chat,
      id_receivet:this.user1,
      id_sender:this.user2,
      status:true,
      message: this.message.value.message
    })
    console.log(  this.message.value);
    this.http.postData('services/webasset/api/createMessage', this.message.value).then(result =>{
      this.loading = false;
      this.dialogRef.close();
    });

  }


  save(): void {
    this.loading = true;
  }

}
