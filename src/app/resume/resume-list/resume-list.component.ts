import { RepositoryService } from './../../shared/repository.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss']
})
export class ResumeListComponent {
  slug = "api/v1/resume/";
  name = "Resumes";

  displayColumns = ["title", 'created_at', 'details', 'update', 'delete'];

  constructor(private router: Router) { }
  
  createNewResume() {
    this.router.navigate(["resumes/new/edit"]);
  }
}
