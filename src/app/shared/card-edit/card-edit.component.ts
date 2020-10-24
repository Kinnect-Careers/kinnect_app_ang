import { Component, ViewEncapsulation, OnInit, AfterViewInit, Input, HostListener, Inject } from '@angular/core';
import { Resume } from './../../_interface/resume.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../repository.service';
import { ErrorHandlerService } from './../error-handler.service';

import { AddPersonal } from './edit/personal/personal.component';
import { AddExperience } from './edit/experience/experience.component';
import { AddEducation } from './edit/education/education.component';
import { AddSkill } from './edit/skill/skill.component';

import { MatDialog } from '@angular/material/dialog';
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
export class CardEditComponent implements OnInit, AfterViewInit {
  type: string | null = null;
  slug: string | null = null;
  available: Resume = {
    contacts: [],
    skills: [],
    experiences: [],
    educations: [],
    links: [],
    title: 'Available',
    created_at: new Date(),
    slug: 'none'
  }

  current: Resume | null = null;
  newName: string | null = null;
  newNameIsSet: boolean = false;
  
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
      this.show = _.mapValues(this.show, () => false);
      if (this.innerWidth < 1000) {
        this.show.personal = true;
      } else {
        this.show.all = true;
      }
    } else {
      this.show = _.mapValues(this.show, () => false);
      this.show[option] = true;
    }
  }

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCurrentDetails();
    //this.getAvailableDetails();
    this.innerWidth = window.innerWidth;
    this.setShow();
  }

  ngAfterViewInit(): void {
    //this.getAvailableDetails();
  }

  getCurrentDetails() {
    const slug: string = this.activatedRoute.snapshot.params["slug"];
    const type: string = this.activatedRoute.snapshot["_routerState"].url.split("/")[1];
    switch(type){
      case 'resumes': {
        console.log("Editing card for Resume");
        this.type = type;
        this.slug = slug;
        if (slug === 'new') {
          this.current = {
            contacts: [],
            skills: [],
            experiences: [],
            educations: [],
            links: [],
            title: '',
            created_at: new Date(),
            slug: ''
          }
          this.getAvailableDetails();
        } else {
          const currentDetailsApiURL: string = `api/v1/resume/${slug}`;
          this.repository.getData(currentDetailsApiURL)
          .subscribe(res => {
            this.current = res as Resume;
            this.getAvailableDetails();
          });
        }
        break;
      }
      default: {
        console.log("None is editable");
      }
    }
  }

  getAvailableDetails() {
    const { contacts, links, experiences, educations, skills } = this.current;

    this.repository.getData("api/v1/contact/")
    .subscribe(res => {
      console.log(contacts);
      this.available.contacts = (res as any[]).filter(function(value, index){
        return !contacts.some(c => c.slug === value.slug);
      });
      console.log("#Contacts a:", this.available.contacts.length);
      console.log("#Contacts c:", this.current.contacts.length);
    });
    this.repository.getData("api/v1/link/")
    .subscribe(res => {
      this.available.links = (res as any[]).filter(function(value, index) {
        return !links.some(l => l.slug === value.slug);
      });
      console.log("#Links a:", this.available.links.length);
      console.log("#Links c:", this.current.links.length);
    });
    this.repository.getData("api/v1/experience/")
    .subscribe(res => {
      this.available.experiences = (res as any[]).filter(function(value, index){
        return !experiences.some(ex => ex.slug === value.slug);
      });
      console.log("#Exp a:", this.available.experiences.length);
      console.log("#Exp c:", this.current.experiences.length);
    });
    this.repository.getData("api/v1/education/")
    .subscribe(res => {
      this.available.educations = (res as any[]).filter(function(value, index) {
        return !educations.some(ed => ed.slug === value.slug);
      });
      console.log("#Edu a:", this.available.educations.length);
      console.log("#Edu c:", this.current.educations.length);
    });

    // TODO: Finish authentication and add to other fields
    
    this.repository.getData("api/v1/skill/")
    .subscribe(res => {
      this.available.skills = (res as any[]).filter(function(value, index){
        return !skills.some(sk => sk.slug === value.slug);
      });
      console.log("#Skill a:", this.available.skills.length);
      console.log("#Skill c:", this.current.skills.length);
    });
    /**
    // TODO: Add other in backend
    this.repository.getData("api/v1/other/")
    .subscribe(res => {
      this.available.experiences = res as any;
    });
    */
  }

  refreshAvailableDetails(option?) {
    if (!option) {
      const options = ['contacts', 'links', 'experiences', 'educations', 'skills', 'others'];
      options.forEach(op => {
        this.refreshAvailableDetails(op);
      });
    } else {
      console.log("Refreshing", option);
      const inCurrent = this.current[option];
      const singular = option.slice(0, -1);
      this.repository.getData(`api/v1/${singular}`)
      .subscribe(res => {
        const arr = res as any[];
        this.available[option] = (res as any[]).filter(el => !inCurrent.includes(el.id))
      });
    }
  }

  createCard() {
    console.log(this.current);
    this.repository.create(`api/v1/resume/`, {
      ...this.current
    })
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['resumes/'])
    });
  }

  updateCard() {
    this.repository.update(`api/v1/resume/${this.current.slug}/`, {
      ...this.current
    })
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['resumes/'])
    }, (err)=>{
      console.log(err);
    })
  }

  handleAdd(option, id) {
    if (this.available.hasOwnProperty(option)){
      if (!this.available[option][id]) {
        return;
      }
      if (!this.current[option]){
        this.current[option] = [];
      }
      this.current[option].push(this.available[option][id]);
      this.available[option].splice(id, 1);
    }
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
    if (this.current.hasOwnProperty(current)){
      if (!this.current[current][id]) {
        return;
      }
      if (!this.available[current]){
        this.available[current] = [];
      }
      this.available[current].push(this.current[current][id]);
      this.current[current].splice(id, 1);
    }
  }

  info: string = '';

  openDialog(option): void {
    switch (option) {
      case "personal": {
        const dialogRef = this.dialog.open(AddPersonal, {
          width: '300px', data: {info: this.info}
        });
        dialogRef.afterClosed().subscribe(() => {
          this.refreshAvailableDetails('contacts');
          this.refreshAvailableDetails('links');
        });
        break;
      }
      case "experience": {
        const dialogRef = this.dialog.open(AddExperience, {
          width: '300px', data: {info: this.info}
        });

        dialogRef.afterClosed().subscribe(() => {
          this.refreshAvailableDetails('experiences');
        });
        break;
      }
      case "education": {
        const dialogRef = this.dialog.open(AddEducation, {
          width: '300px', data: {info: this.info}
        });

        dialogRef.afterClosed().subscribe(() => {
          this.refreshAvailableDetails('educations');
        });
        break;
      }
      case "skill": {
        const dialogRef = this.dialog.open(AddSkill, {
          width: '300px', data: {info: this.info}
        });
        dialogRef.afterClosed().subscribe(() => {
          this.refreshAvailableDetails('skills');
        });
        break;
      }
    }
    console.log(this.info);
  }
}

