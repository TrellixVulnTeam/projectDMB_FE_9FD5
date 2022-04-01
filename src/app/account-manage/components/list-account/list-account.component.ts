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
  constructor(
    private ui: UiService,
    public http: HttpServices,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private userAccountService: UserAccountService,
  ) { }

  ngOnInit(){
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    this.id_User = this.newProfile._id
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }
    this.userAccountService.getUserAccount().then(result => {
      this.dataAccount = result.responseData.data;
      this.dataSource = new MatTableDataSource(this.dataAccount);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.ui.hide()
  })
  this.search = this.formBuilder.group({
    searchText: new FormControl({ value:'', disabled: false }),
  });
  // this.ui.hide()
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
    Swal.fire({
      title: 'Delete Account',
      text: "Are you sure you want to delete this Account?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'rgb(70, 0, 0)',
      cancelButtonColor: '#696969',
    }).then((result) => {
      this.ui.show()
      if (result.isConfirmed) {
        const obj = {
          _id:data._id ,
          status: false
        }
        this.userAccountService.editeAccount(obj).then(() => {
          this.refresh();
        });

        // this.userAccountService.deleteAccount(data).then(() => {
        //   this.refresh();
        // });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.ui.hide()
      }
    })
  }
  public doFilter = (value: string) => {
    // this.ui.show()
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    // this.ui.hide()
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
    this.userAccountService.getUserAccount().then(result => {
      this.dataAccount = result.responseData.data;
      this.dataSource = new MatTableDataSource(this.dataAccount);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.ui.hide()
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
      this.dataProfile = result[0]
      this.openPopupView(this.dataProfile)
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

}
