import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from './../../../_interface/job.model';

@Component({
  selector: 'app-job-data',
  templateUrl: './job-data.component.html',
  styleUrls: ['./job-data.component.scss']
})
export class JobDataComponent implements OnInit {
  @Input() job: Job;

  constructor() { }

  ngOnInit(): void {
  }

}
