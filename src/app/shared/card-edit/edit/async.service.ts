import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RepositoryService } from './../../repository.service';
import { PersonalInterface } from './../../../_interface/personal.model';
import { ExperienceInterface } from './../../../_interface/experience.model';
import { EducationInterface } from './../../../_interface/education.model';
import { SkillInterface } from './../../../_interface/skill.model';
import { OtherInterface } from './../../../_interface/other.model';
import { ResumeClass } from './../../../_interface/resume.model';


@Injectable({
  providedIn: 'root'
})
export class AsyncService<T extends
  PersonalInterface|ExperienceInterface|EducationInterface|SkillInterface|OtherInterface|ResumeClass
  >{
  endPoint: string;
  slug: string;
  data: T;
  datas: T[];

  constructor(private repoService: RepositoryService){}

  async getDetails(slug: string): Promise<T> {
    const prom = await this.repoService.getData(`${this.endPoint}${slug}`)
    .toPromise()
    .then(res => {
      this.data = res as T;
    });
    return this.data;
  }

  async getNotInCurrent(current: T[]): Promise<T[]>{
    const prom = await this.repoService.getData(this.endPoint)
      .toPromise()
      .then(res => {
        this.datas = (res as T[]).filter(function(value, index){
          return !current.some((d) => d.id === value.id );
        });
      });
      return this.datas;
  }

  async create(data: T){
    const prom = await this.repoService.create(this.endPoint, {
      ...data
    })
    .toPromise()
    .then(res => {
      console.log("Created:", res);
    });
  }
} 

