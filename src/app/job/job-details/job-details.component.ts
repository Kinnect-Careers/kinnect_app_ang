import { Component, OnInit } from '@angular/core';
import { Job } from './../../_interface/job.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/repository.service';
import { ErrorHandlerService } from './../../shared/error-handler.service';
import * as moment from 'moment';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  job: Job;
  showTags;

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.getJobDetails();
  }

  private getJobDetails(){
    let slug: string = this.activeRoute.snapshot.params["id"];
    console.log(this.activeRoute.snapshot.params);
    let apiUrl: string = `api/v1/job/${slug}/`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.job = res as Job;
      this.job['time_ago'] = moment(this.job.pub_date, "YYYY-MM-DD").fromNow();
      const splitter = this.job.partner.split("/");
      const name = splitter[splitter.length-2].replace(/-/g, ' ');
      console.log(name, this.toTitleCase(name));
      this.job['partner_name'] = this.toTitleCase(name);
    },
    (error) => {
      this.errorHandler.handleError(error);
    })


  }

  toTitleCase(str){
	  str = str.toLowerCase().split(' ');
	  for (var i = 0; i < str.length; i++) {
	  	str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  	}
	  return str.join(' ');
  }

}
