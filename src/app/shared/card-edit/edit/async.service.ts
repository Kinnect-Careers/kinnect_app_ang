import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RepositoryService } from './../../repository.service';
import { LinkInterface, ContactInterface } from './../../../_interface/personal.model';
import { ExperienceInterface } from './../../../_interface/experience.model';
import { EducationInterface } from './../../../_interface/education.model';
import { SkillInterface } from './../../../_interface/skill.model';


@Injectable({
  providedIn: 'root'
})
export class AsyncService<T extends
  ContactInterface|LinkInterface|ExperienceInterface|EducationInterface|SkillInterface
  >{
  endPoint: string;
  data: T[];

  constructor(private repoService: RepositoryService){
    console.log(repoService);
  }

  async getNotInCurrent(current: T[]): Promise<T[]>{
    const prom = await this.repoService.getData(this.endPoint)
      .toPromise()
      .then(res => {
        this.data = (res as T[]).filter(function(value, index){
          return !current.some((d) => {
            d.id ? d.id === value.id : d.slug === value.slug
          });
        });
      });
      return this.data;
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

