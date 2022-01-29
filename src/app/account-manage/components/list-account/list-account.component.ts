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

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['no', 'username', 'firstname', 'lastname','role', 'updateBy','updateDt','action'];
  dataSource: MatTableDataSource<any>;
  public dataAccount: any;
  public search: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public data: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private userAccountService: UserAccountService,

  ) { }

  ngOnInit(){
    this.userAccountService.getUserAccount().then(result => {
      this.dataAccount = result.responseData.data;
      this.dataSource = new MatTableDataSource(this.dataAccount);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
  this.search = this.formBuilder.group({
    searchText: new FormControl({ value:'', disabled: false }),
  });

  }
  openDialogEdit(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    this.dialog.open(EditAccountComponent, {

      width: '35%',
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
      if (result.isConfirmed) {
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
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onclickcreateaccount(){
    this.router.navigate(['create-account', {}])
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
    this.userAccountService.getUserAccount().then(result => {
      this.dataAccount = result.responseData.data;
      this.dataSource = new MatTableDataSource(this.dataAccount);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
}
