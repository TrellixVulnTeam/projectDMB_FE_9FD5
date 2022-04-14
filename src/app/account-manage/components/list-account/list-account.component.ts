import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import Swal from 'sweetalert2';
import { ViewComponent } from 'src/app/main/component/view/view.component';
import { HttpServices } from 'src/app/service/http.service';
import { UiService } from 'src/app/ui.service';
import { ChatComponent } from 'src/app/main/component/chat/chat.component';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['no', 'username', 'firstname', 'lastname','role', 'status','updateDt','action'];
  dataSource: MatTableDataSource<any>;
  public dataAccount: any;
  public search: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public data: any;
  newProfile:any;
  id_User:any;
  roleAccount:boolean
  dataProfile:any
  historyUser:any
  picMe:any
  constructor(
    private ui: UiService,
    public http: HttpServices,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private userAccountService: UserAccountService,
  ) { }

  ngOnInit(){
    this.ui.show()
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    this.id_User = this.newProfile._id
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }else{
      this.roleAccount = false
    }
    this.http.postData('/services/webasset/api/viewAccouct',{_id: this.id_User}).then(result =>{
      this.historyUser =result[0]
      this.picMe =result[0].picture
    })
    this.http.getData('/services/webasset/api/listAll').then(result => {
      this.dataAccount = result.responseData.data;
      debugger
      this.http.getData('/services/webasset/api/listHistory').then(result2 => {
        debugger
      const a = result2.responseData.data
      const ArrData = new Array()
      a.forEach(element => {
        ArrData.push(element)
      });
      this.dataAccount.forEach(element => {
        ArrData.push(element)
      });
      this.dataSource = new MatTableDataSource(ArrData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.ui.hide()
    })

  })
  this.search = this.formBuilder.group({
    searchText: new FormControl({ value:'', disabled: false }),
  });
  }
  openDialogEdit(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    this.dialog.open(EditAccountComponent, {
      width: '120px',
      data: {
        dataKey: data,
        dataTable: this.dataAccount,
      }
    }).afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  clickdelete(data) {
    if(data.status == true){
       data._id = null
    data.status = false
    console.log(data);

      Swal.fire({
        title: 'Delete Account',
        text: "Are you sure you want to delete this Account?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'rgb(70, 0, 0)',
        cancelButtonColor: '#696969',
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.postData('/services/webasset/api/createHistory',data)
          this.userAccountService.deleteAccount(data).then(() => {
            this.refresh();
          });
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    }
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  onclickcreateaccount(){
    this.router.navigate(['create-admin', {}])
  }
  onclickListManage(){
    this.router.navigate(['listManage', {}])
  }
  onclickEmployee() {
    this.router.navigate(['employee',{}])
  }
  onclickAsset() {
    this.router.navigate(['data-asset',{}])
  }
  onclickdataadmin() {
    this.router.navigate(['admin',{}])
  }
  onclickchangead() {
    this.router.navigate(['changead',{}])
  }
  onclickaccount() {
    this.router.navigate(['list-account',{}])
  }
  refresh(){
    this.ui.show()
    this.http.getData('/services/webasset/api/listAll').then(result => {
      debugger
      this.dataAccount = result.responseData.data;
      this.http.getData('/services/webasset/api/listHistory').then(result2 => {
      const a = result2.responseData.data
      const ArrData = new Array()
      a.forEach(element => {
        ArrData.push(element)
      });
      this.dataAccount.forEach(element => {
        ArrData.push(element)
      });
      this.dataSource = new MatTableDataSource(ArrData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.ui.hide()
    })
  })
  }
  logout() {
    localStorage.removeItem('Authorization');
    this.router.navigate(['login', {}])
  }
  clearFilters(){
    this.refresh()
    this.search.patchValue({
      searchText: null,
    })

  }
  openDialogView(item): void {
    this.ui.show()
    const id = item._id
    this.http.postData('/services/webasset/api/viewAccouct',{_id: id}).then(result =>{
      if(result.length==0){
         this.http.postData('/services/webasset/api/viewAccouctHistory',{_id: id}).then(result1 =>{
         this.dataProfile = result1[0]
         this.openPopupView(this.dataProfile)
      });
      }else{
       this.dataProfile = result[0]
       this.openPopupView(this.dataProfile)
      }

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
  openPopupView(data){
    this.ui.hide()
    const dialogRef = this.dialog.open(EditAccountComponent, {
      height: '75%',
      width: '60%',
      data: {
        dataKey: data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
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
       this.http.postData('/services/webasset/api/createHistory',this.newProfile)
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
}
