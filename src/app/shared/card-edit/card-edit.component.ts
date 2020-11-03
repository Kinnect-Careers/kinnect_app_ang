import { Component, ViewEncapsulation, OnInit, AfterViewInit, Input, HostListener, Inject } from '@angular/core';

import { RemoveList, ResumeInterface, ResumeClass } from './../../_interface/resume.model';
import { ResumeService } from './edit/resume/resume.service';

import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../repository.service';
import { ErrorHandlerService } from './../error-handler.service';

import { AddPersonal } from './edit/personal/personal.component';
import { PersonalInterface } from '../../_interface/personal.model';
import { PersonalService } from './edit/personal/personal.service';

import { AddExperience } from './edit/experience/experience.component';
import { ExperienceInterface } from '../../_interface/experience.model';
import { ExperienceService } from './edit/experience/experience.service';

import { EducationService } from './edit/education/education.service';
import { EducationInterface } from '../../_interface/education.model';
import { AddEducation } from './edit/education/education.component';

import { AddSkill } from './edit/skill/skill.component';
import { SkillInterface } from '../../_interface/skill.model';
import { SkillService } from './edit/skill/skill.service';

import { AddOther } from './edit/other/other.component';
import { OtherInterface } from '../../_interface/other.model';
import { OtherService } from './edit/other/other.service';

import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';


class Labels {
  personal: string;

}

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardEditComponent implements OnInit {
  keys = ['personal', 'experiences', 'educations', 'skills', 'other'];
  labels: Object = {
    personal: 'Personal',
    experiences: 'Experience',
    educations: 'Education', 
    skills: 'Skill', 
    other: 'Other'
  };
  showDescription: boolean = false;
  
  type: string | null = null;
  slug: string | null = null;
  
  // Labels on tabs
  personalLabel: string;
  experienceLabel: string;
  educationLabel: string;
  skillLabel: string;
  otherLabel: string;
  
  available = new ResumeClass('Available');
  current: ResumeClass = new ResumeClass('Current');
  newName: string | null = null;
  newNameIsSet: boolean = false;
  
  @Input() selectedObject: string = "";
  
  status: boolean = false;
  toggleBox(){
    this.status = !this.status;
  }

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    public dialog: MatDialog,
    private personalService: PersonalService,
    private educationService: EducationService,
    private skillService: SkillService,
    private experienceService: ExperienceService,
    private otherService: OtherService,
    private resumeService: ResumeService,
  ) { }

  ngOnInit(): void {
    this.getCurrentDetails();
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
          this.current = new ResumeClass('');
          this.getAvailableDetails();
        } else {
          this.resumeService.getDetails(slug)
          .then((res: ResumeClass) => {
            this.current = res;
            this.current.removeList = new RemoveList();
            this.setLabels();
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

  setLabels(){
    this.personalLabel = `Personal ${this.current.personal.length}`;
    this.experienceLabel = `Experience ${ this.current.experiences.length}`;
    this.educationLabel = `Education ${this.current.educations.length}`;
    this.skillLabel = `Skills ${this.current.skills.length}`;
    this.otherLabel = `Other ${this.current.other.length}`;
  }

  getAvailableDetails() {
    const { personal, experiences, educations, skills, other } = this.current;
    
    this.personalService.getNotInCurrent(personal)
    .then(res => {
      this.available.personal = res as PersonalInterface[];
      this.personalService.setShow(this.available.personal);
      this.personalService.setShow(this.current.personal);
    });

    this.experienceService.getNotInCurrent(experiences)
    .then(res => {
      this.available.experiences = res as ExperienceInterface[];
      this.experienceService.setShow(this.available.experiences);
      this.experienceService.setShow(this.current.experiences);
    }, err => console.log(err));

    this.educationService.getNotInCurrent(educations)
    .then(res => {
      this.available.educations = res as EducationInterface[];
      this.educationService.setShow(this.available.educations);
      this.educationService.setShow(this.current.educations);
    }, err => console.log(err));
    
    this.skillService.getNotInCurrent(skills)
    .then(res => {
      this.available.skills = res as SkillInterface[];
      this.skillService.setShow(this.available.skills);
      this.skillService.setShow(this.current.skills);

    console.log(this.available.skills);
    }, err => console.log(err));
    
    this.otherService.getNotInCurrent(other)
    .then(res => {
      this.available.other = res as OtherInterface[];
      this.otherService.setShow(this.available.other);
      this.otherService.setShow(this.current.other);

    }, err => console.log(err));
  }

  refreshAvailableDetails(option?) {
    if (!option) {
      const options = ['personal', 'experiences', 'educations', 'skills', 'others'];
      options.forEach(op => {
        this.refreshAvailableDetails(op);
      });
    } else {
      console.log("Refreshing", option);
      const inCurrent = this.current[option];
      const singular = ['personal', 'other'].includes(option) ? option : option.slice(0, -1) ;
      console.log(singular)
      this.repository.getData(`api/v1/${singular}`)
      .subscribe(res => {
        const arr = res as any[];
        this.available[option] = (res as Array<PersonalInterface|ExperienceInterface|EducationInterface|SkillInterface|OtherInterface>).filter(function(value, index){
          return !inCurrent.some(ed => ed.id === value.id);
        })
        this.setLabels();
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
    this.repository.patch(`api/v1/resume/${this.current.slug}/`, {
      ...this.current
    })
    .subscribe(res => {
      console.log(res);
      this.router.navigate([`resumes/${this.current.slug}`])
    }, (err)=>{
      console.log(err);
    })
  }

  transferToOtherBox = (option, id, obj: ResumeClass) => {
    const source: ResumeClass = obj.title === this.available.title ? this.available : this.current;
    const target: ResumeClass = obj.title === this.current.title ? this.available : this.current;
    source.removeList[option].push(source[option][id]['id']);
    setTimeout(() => {
      const removeThis = source[option].splice(id,1)[0]; // Removed from source box
      target[option].push(removeThis); // Placed in target box
      const indexInTarget = target.removeList[option].indexOf(removeThis['id'], 0); // Check if indexedin target box
      if (indexInTarget > -1){
        target.removeList[option].splice(indexInTarget, 1); 
      }
      this.setLabels();
    }, 1000);
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
      case "other": {
        const dialogRef = this.dialog.open(AddOther, {
          width: '300px', data: {info: this.info}
        });
        dialogRef.afterClosed().subscribe(() => {
          this.refreshAvailableDetails('other');
        });
      }
    }
  }

  editElement(){
    console.log(event);
  }

  toNumber(i) {
    return parseFloat(i);
  }

  getRemoveClass(i) {
    console.log(i, parseFloat(i) %2 === 0);
    return parseFloat(i) % 2 === 0 ? 'remove-left' : 'remove-right';
  }
}

