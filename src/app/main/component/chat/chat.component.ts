import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpServices } from 'src/app/service/http.service';
import { LikeUserService } from 'src/app/service/likeUser.service';
import { UiService } from 'src/app/ui.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  listlike:any;
  id_User:number
  likeUser: FormGroup;
  public newProfile: any;
  public roleAccount:boolean;
  id_sender:any
  public listChat : any
  msgChat:any
  img:any
  name:any
  ThaiTranslation:any
  id_message:any
  statusEng:boolean
  Sentmessage: FormGroup;
  idmsg:any
  msg:any
  loading = false;
  constructor(
    private ui: UiService,
    public http: HttpServices,
    private formBuilder: FormBuilder,
    public likeUserService :LikeUserService,
    public dialogRef: MatDialogRef<SearchComponent>,
  ) { }

  ngOnInit(): void {
    this.ui.show()
    this.likeUser  = this.formBuilder.group({
      user1: new FormControl({ value: '', disabled: false }),
      user2: new FormControl({ value: '', disabled: false }),
      id_chat: new FormControl({ value: null, disabled: false }),
      status: new FormControl({ value: null, disabled: false }),
    });
    this.Sentmessage  = this.formBuilder.group({
      id_receivet: new FormControl({ value: '', disabled: false }),
      id_sender: new FormControl({ value: null, disabled: false }),
      message: new FormControl({ value: '', disabled: false }),
      time: new FormControl({ value: '', disabled: false }),
      status: new FormControl({ value: null, disabled: false }),
    });

    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    this.id_User = this.newProfile._id
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }
    this.http.postData('/services/webasset/api/whereCListChat',{user2: this.id_User,user1: this.id_User,_id:this.id_User}).then(result =>{
      this.listChat =result
      console.log("result");
      this.openChat(result[0])
      console.log(result);
      this.ui.hide()

    });

  }

  openChat(item:any){
    this.Sentmessage.patchValue({
      id_receivet:null,
      id_sender:null,
      message:'',
      time:'',
      status:true,
    })
    const id = item._id
    console.log(item);
    this.http.postData('/services/webasset/api/messageChat',{id_sender: this.id_User,id_receivet: id}).then(result =>{
      this.msgChat =result
    });
    this.name =item.nickname
    this.img = item.picture
    this.idmsg = item

  }

//   translate(value,id){
//     debugger
//     this.id_message = id

//     if(value=='emoji_heart' ){
//       this.ThaiTranslation ='emoji_heart'
//     }
//     else{
//       if(value.match(/[a-z]/i) != null){
//         let a = value.match(/[a-z]/i)
//         debugger
//         console.log('Eng');
//         this.statusEng = true
//         this.sendEng(value)
//       }else{
//         this.statusEng = false
//         console.log('thai');
//         this.sendThai(value)
//       }
//     }
//   }

//   sendThai(value) {
//     const text = value
//     const key = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20220206T162939Z.f89eee1b2c620d9e.922bb9755a6f37ffd99db91fb41ebf412e0ab28b"
//     const test = key+"&text="+text+"&lang=th-en&format=html"
//     this.http.get(test).then(result => {
//       this.ThaiTranslation = result.text
//      console.log(this.ThaiTranslation);
//     });;
//   }

// sendEng(value) {
//   const text = value
//   const key = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20220206T162939Z.f89eee1b2c620d9e.922bb9755a6f37ffd99db91fb41ebf412e0ab28b"
//   const test = key+"&text="+text+"&lang=en-th&format=html"
//   this.http.get(test).then(result => {
//     this.ThaiTranslation = result.text
//    console.log(this.ThaiTranslation);
//   });;
// }
// translate(value,id){
//   debugger
//   this.id_message = id

//   if(value=='emoji_heart' ){
//     this.ThaiTranslation ='emoji_heart'
//   }
//   else{
//     if(value.match(/[a-z]/i) != null){
//       let a = value.match(/[a-z]/i)
//       debugger
//       console.log('Eng');
//       this.statusEng = true
//       this.sendEng(value)
//     }else{
//       this.statusEng = false
//       console.log('thai');
//       this.sendThai(value)
//     }
//   }
// }

sendThai(value,id) {
  this.statusEng = false
  this.id_message = id
  if(value=='emoji_heart' ){
    this.ThaiTranslation ='emoji_heart'
  }else{
  const text = value
  const key = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20220206T162939Z.f89eee1b2c620d9e.922bb9755a6f37ffd99db91fb41ebf412e0ab28b"
  const test = key+"&text="+text+"&lang=th-en&format=html"
  this.http.get(test).then(result => {
    this.ThaiTranslation = result.text
   console.log(this.ThaiTranslation);
  });;
  }

}

sendEng(value,id) {
this.statusEng = true
this.id_message = id
const text = value
if(value=='emoji_heart' ){
  this.ThaiTranslation ='emoji_heart'
}else{
const key = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20220206T162939Z.f89eee1b2c620d9e.922bb9755a6f37ffd99db91fb41ebf412e0ab28b"
const test = key+"&text="+text+"&lang=en-th&format=html"
this.http.get(test).then(result => {
  this.ThaiTranslation = result.text
 console.log(this.ThaiTranslation);
});;
}
}

  Sentmsg(){
    this.ThaiTranslation = ''
    this.loading = true;
    this.idmsg
    console.log(this.idmsg);
    this.Sentmessage.patchValue({
      id_receivet:this.idmsg._id,
      id_sender: this.id_User,
      message:this.Sentmessage.value.message,
      time:'',
      status:true,
    })
    this.Sentmessage.value
    this.http.postData('services/webasset/api/createMessage', this.Sentmessage.value).then(result =>{
        this.Sentmessage.patchValue({
          id_receivet:null,
          id_sender:null,
          message:'',
          time:'',
          status:true,
      });
      this.openChat(this.idmsg);
      this.loading = false;
    });
  }

Deletemsg(id_message){
  debugger
  this.http.delete(`/services/webasset/api/deleteMsg/${id_message}`).then(result =>{
    this.openChat(this.idmsg)
  });
}
close(){
  this.dialogRef.close();
}
search(data){

  this.msg = ''
  this.http.postData('/services/webasset/api/searchListChat',{
    user2: this.id_User,
    user1: this.id_User,
    _id:this.id_User,
    nickname:data
  }).then(result =>{
    if(result==null || result == ""){
      this.msg =''
      this.http.postData('/services/webasset/api/whereCListChat',{user2: this.id_User,user1: this.id_User,_id:this.id_User}).then(result =>{
        this.listChat =result
        console.log("result");
        this.openChat(result[0])
      });
    }
    else{
      this.listChat =result
      this.openChat(result[0])
      if(result.length == 0){
        debugger
        this.msg = "Can't find search item";
      }
      // else{
      //   this.listChat =result
      //   this.openChat(result[0])
      // }
        // this.msg =''
      // this.listChat =result
      // this.openChat(result[0])
      // }
      // this.msg = "Can't find search item";
      // if(result.length == 0){
      //   this.listChat =result
      //   this.msg = "Can't find search item";
      // }else{
      // this.msg =''
      // this.listChat =result
      // this.openChat(result[0])
      // }


    }

  });
}

sendheart(){
  this.ThaiTranslation = ''
  this.loading = true;
  this.idmsg
  let obj ={
    id_receivet:this.idmsg._id,
    id_sender: this.id_User,
    message:'emoji_heart',
    time:'',
    status:true,
  }
  this.http.postData('services/webasset/api/createMessage', obj).then(result =>{
      this.Sentmessage.patchValue({
        id_receivet:null,
        id_sender:null,
        message:'',
        time:'',
        status:true,
    });
    this.openChat(this.idmsg);
    this.loading = false;
  });

}
}
