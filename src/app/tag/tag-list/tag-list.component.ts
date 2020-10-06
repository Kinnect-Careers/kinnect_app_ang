import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Tag } from './../../_interface/tag.model';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit, AfterViewInit {

  displayedColumns = ["name"];

  dataSource = new MatTableDataSource<Tag>();

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repoService: RepositoryService) { }

  ngOnInit(): void {
    this.getAllTags();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllTags = () => {
    this.repoService.getData('api/v1/tag/')
    .subscribe(res => {
      console.log(res);
      this.dataSource.data = res as Tag[];
    })
  }

  redirectToDetails = (id: string) => {}
  
  redirectToUpdate = (id: string) => {}
  
  redirectToDelete = (id: string) => {}
  
  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
