import { Component, ViewEncapsulation, OnInit, Input, HostListener } from '@angular/core';
import { Resume } from './../../_interface/resume.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../repository.service';
import { ErrorHandlerService } from './../error-handler.service';
import * as _ from 'lodash';

interface Show {
  all: boolean;
  personal: boolean;
  experiences: boolean;
  skills: boolean;
  educations: boolean;
  other: boolean;
}

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardEditComponent implements OnInit {
  type: string | null = null;
  slug: string | null = null;
  available: Resume = {
    'contacts': [],
    'skills': [],
    'experiences': [],
    'educations': [],
    'links': [],
    'title': 'Available',
    'created_at': new Date()
  }
  current: Resume | null = null;
  
  @Input() selectedObject: string = "";

  show: Show = {
    'all': true,
    'personal': false,
    'experiences': false,
    'skills': false,
    'educations': false,
    'other': false
  }
  innerWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.innerWidth = window.innerWidth;
    this.setShow();
  }

  setShow(option?){
    if (!option){
      console.log("Option is not set, using window size")
      if (this.innerWidth < 700) {
        this.show.all = false;
        this.show.personal = true;
      } else {
        this.show = _.mapValues(this.show, () => false);
        this.show.all = true;
      }
    } else {
      console.log(`Options is set ${option}`);
      this.show = _.mapValues(this.show, () => false);
      this.show[option] = true;
    }
  }

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getCurrentDetails();
    this.innerWidth = window.innerWidth;
    this.setShow();
  }

  getCurrentDetails() {
    const slug: string = this.activatedRoute.snapshot.params["slug"];
    const type: string = this.activatedRoute.snapshot["_routerState"].url.split("/")[1];
    switch(type){
      case 'resumes': {
        console.log("Editing card for Resume");
        this.type = type;
        this.slug = slug;
        const currentDetailsApiURL: string = `api/v1/resume/${slug}`;
        this.repository.getData(currentDetailsApiURL)
        .subscribe(res => {
          this.current = res as Resume;

          console.log("Resume: ", this.current);
        });
        break;
      }
      default: {
        console.log("None is editable");
        break;
      }
    }
  }

  updateCard() {
    console.log(`Post data to update ${this.type}`);
  }

  handleAddContactToResume() {

  }

  handleAdd(current, id) {
    console.log(this.selectedObject);
    console.log(`${current}, ${id}`);
    console.log("Transfer item to current");
    if (this.available.hasOwnProperty(current)){
      console.log("It has");
      if (!this.available[current][id]) {
        return;
      }
      console.log(this.available[current][id]);
      if (!this.current[current]){
        this.current[current] = [];
      }
      this.current[current].push(this.available[current][id]);
      this.available[current].splice(id, 1);
    }
  }
  
  handleAddLink() {
    console.log("Add Link");
  }

  handleAddExperience() {
    console.log("Add experience");
  }
  
  handleAddSkill() {
    console.log("Add skill");
  }
  
  handleAddTask() {
    console.log("Add task");
  }
  
  handleAddEducation() {
    console.log("Add education");
  }

  handleRemove(current, id) {
    console.log(this.selectedObject);
    console.log(`${current}, ${id}`);
    console.log("Transfer item to available");
    if (this.current.hasOwnProperty(current)){
      console.log("It has");
      if (!this.current[current][id]) {
        return;
      }
      console.log(this.current[current][id]);
      if (!this.available[current]){
        this.available[current] = [];
      }
      this.available[current].push(this.current[current][id]);
      this.current[current].splice(id, 1);
    }
  }

  changeTab(event) {
    switch (event.index) {
      case 0: {
        this.setShow('personal');
        break;
      }
      case 1: {
        this.setShow('experiences');
        break;
      }
      case 2: {
        this.setShow('educations');
        break;
      }
      case 3: {
        this.setShow('skills');
        break;
      }
      case 4: {
        this.setShow('other');
        break
      }
      default: {
        console.log("Not caught");
      }
    }

    console.log(`Changed tab: ${event}`); 
  }
}
