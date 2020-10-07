import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Job } from './../../_interface/job.model';
import { ErrorHandlerService } from './../../shared/error-handler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, AfterViewInit {
 
  displayedColumns = [
    'title', 'text', 'pub_date', 'partner', 'tags',
    'details', 'update', 'delete'];
  
  dataSource = new MatTableDataSource<Job>();

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllJobs();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllJobs = () => {
    this.repoService.getData('api/v1/job/')
    .subscribe(res => {
      console.log(res);
      this.dataSource.data = res as Job[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (slug: string) => {
    let url: string = `jobs/${slug}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {

  }
  public redirectToDelete = (id: string) => {

  }

}
