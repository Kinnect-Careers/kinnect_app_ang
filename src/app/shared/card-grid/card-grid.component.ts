import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorHandlerService } from './../error-handler.service';
import { RepositoryService } from './../repository.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

interface DateRange {
  asString: string;
  asDate: any | null;
}

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss']
})
export class CardGridComponent<T> implements OnInit {

  @Input() slug: string | null = "";
  @Input() gridName: string | null = "";
  @Input() displayColumns: string[];
  items: T[] | null = null;

  hasPubDate: boolean = false;

  dataSource = new MatTableDataSource<T>();
  filteredData: T[] | null = null;

  selectFormControl = new FormControl('');
  dateRanges: DateRange[] = [
    {asString: 'All', asDate: null},
    {asString: 'A week ago', asDate: moment().subtract(1, 'weeks')},
    {asString: 'A month ago', asDate: moment().subtract(1, 'months')},
    {asString: '6 months ago', asDate: moment().subtract(6, 'months')},
    {asString: 'A year ago', asDate: moment().subtract(1, 'years')},
  ]

  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getItems();
    this.setHasPubDate();
    console.log(`Init grid ${this.slug} ${this.gridName} ${this.displayColumns} ${this.hasPubDate}`);
  }

  getItems(){
    this.repoService.getData(this.slug)
    .subscribe(res => {
      this.dataSource.data = res as T[];
    }, 
    (error) => {
      this.errorService.handleError(error);
    })
  }

  onFilterTitle = (value: string) => {
    if (value) {
      const filter_by = value.trim().toLocaleLowerCase();
      this.filteredData = this.dataSource.data.filter((obj) => {
        return 'title' in obj ? obj['title'].toLocaleLowerCase().includes(filter_by) : false;
      });
    } else {
      this.filteredData = null;
    }
    console.log(this.filteredData);
  }

  redirectToDetails = (slug: string) => {
    let url: string = `${this.gridName.toLocaleLowerCase()}/${slug}`;
    this.router.navigate([url]);
  }

  onDateRangeSelect = (event) => {
    const targetDateRange = event.value.asDate;

    if (!targetDateRange) {
      this.filteredData = this.dataSource.data;
      return;
    }
    if (this.filteredData) {
      this.filteredData = this.filteredData.filter((obj) => {
        return targetDateRange.isBefore(obj['pub_date']);
      });
    } else {
      this.filteredData = this.dataSource.data.filter((obj) => {
        return targetDateRange.isBefore(obj['pub_date']);
      });
    }
  }

  setHasPubDate() {
    this.hasPubDate = this.displayColumns.includes('pub_date');
  }

}
