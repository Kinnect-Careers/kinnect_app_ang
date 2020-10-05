import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './../../_interface/user.model';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['name', 'dob', 'address', 'detail', 'update', 'delete'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private repoService: RepositoryService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllUsers = () => {
    this.repoService.getData('api/v1/user')
    .subscribe(res => {
      this.dataSource.data = res as User[];
    })
  }

  redirectToDetails = (id: string) => {}

  redirectToUpdate = (id: string) => {}

  redirectToDelete = (id: string) => {}

}
