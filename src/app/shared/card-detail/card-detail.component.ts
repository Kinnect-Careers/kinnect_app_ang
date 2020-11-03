import { Component, OnInit } from '@angular/core';
import { Job } from './../../_interface/job.model';
import { ResumeClass } from './../../_interface/resume.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../repository.service';
import { ErrorHandlerService } from './../error-handler.service';
import * as moment from 'moment';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  type: string | null = null;  
  detail: Job | ResumeClass;

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ){ }

  ngOnInit(): void {
    this.getDetails();
  }

  private getDetails(){
    let slug: string = this.activatedRoute.snapshot.params["id"];
    // Routes to proper collection of object and rendering in template
    let type: string = this.activatedRoute.snapshot["_routerState"].url.split("/")[1];
    switch(type) {
      case 'jobs': {
        this.type = "jobs";
        let detailApiURL: string = `api/v1/job/${slug}/`;
        this.repository.getData(detailApiURL)
        .subscribe(res => {
          var job = res as Job;
          job['time_ago'] = moment(job.pub_date, "YYYY-MM-DD").fromNow();
          const splitter = job.partner.split("/");
          const name = splitter[splitter.length-2].replace(/-/g, ' ');
          job['partner_name'] = this.toTitleCase(name);
          this.detail = job;
        });
        break;
      } 
      case 'resumes': {
        console.log("Resumes detail");
        this.type = "resumes";
        let detailApiURL: string = `api/v1/resume/${slug}/`;
        this.repository.getData(detailApiURL)
        .subscribe(res => {
          var resume = res as ResumeClass;
          console.log(resume);
          resume['time_ago'] = moment(resume.created_at, "YYYY-MM-DD").fromNow();
          resume['educations'].map((ed) => {
            ed['institution'] = this.toTitleCase(ed['institution']);
          });
          resume['experiences'].map(exp => {
            exp['task_lines'] = this.getLines(exp['tasks']);
          });
          this.detail = resume;
        });
        break;
      }
      default : {
        console.log("None caught");
        break;
      }
    }
  }
  
  toTitleCase(str){
	  str = str.toLowerCase().split(' ');
	  for (var i = 0; i < str.length; i++) {
	  	str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  	}
	  return str.join(' ');
  }

  handleEdit(){
    this.router.navigate([`${this.type}/${this.detail['slug']}/edit`]);
  }

  handleDownload(){
    console.log("Implement Resume Download");
  }

  getLines(str) {
    return str.split(/\r\n|\r|\n/)
  }
}
