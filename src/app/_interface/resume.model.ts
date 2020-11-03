import { PersonalInterface } from './personal.model';
import { ExperienceInterface } from './experience.model';
import { EducationInterface } from './education.model';
import { SkillInterface } from './skill.model';
import { OtherInterface } from './other.model';


export class RemoveList {
  personal = new Array();
  experiences = new Array();
  educations = new Array();
  skills = new Array();
  other = new Array();

  constructor(){}
}

export interface ResumeInterface {
  personal: any[];
  experiences: any[];
  educations: any[];
  skills: any[];
  other: OtherInterface[];
  title: string;
  created_at: Date;
  slug: string;
  removeList: RemoveList;
}

export class ResumeClass implements ResumeInterface {
  id: string;
  removeList = new RemoveList();
  personal = Array<PersonalInterface>();
  experiences = Array<ExperienceInterface>();
  educations = Array<EducationInterface>();
  skills = Array<SkillInterface>();
  other = Array<OtherInterface>();
  title: string;
  slug: string;
  created_at: Date;

  constructor(title: string){
    this.title = title;
    this.created_at = new Date();
  }
}
