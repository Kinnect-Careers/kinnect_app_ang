import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Resume } from './../../_interface/resume.model';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.sass']
})
export class ResumeListComponent implements OnInit , AfterViewInit{
  displayedColumns = ["title", 'created_at', 'details', 'update', 'delete'];
  dataSource = new MatTableDataSource<Resume>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repoService: RepositoryService) { }

  ngOnInit(): void {
    this.getAllResumes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllResumes = () => {
    this.repoService.getData('api/v1/resume/')
    .subscribe(res => {
      console.log(res);
      this.dataSource.data = res as Resume[];
    });
  }

  redirectToDetails = (id: string) => {}
  
  redirectToUpdate = (id: string) => {}
  
  redirectToDelete = (id: string) => {}

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
