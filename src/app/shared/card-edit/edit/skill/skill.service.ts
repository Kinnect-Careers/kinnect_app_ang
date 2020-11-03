import { Injectable } from '@angular/core';
import { AsyncService } from '../async.service';
import { SkillInterface } from './../../../../_interface/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends AsyncService<SkillInterface>{
//  skills: Array<SkillInterface> | null = null;
  endPoint: string = 'api/v1/skill/';
  
  setShow(skills: SkillInterface[]){
    for (let skill of skills) {
      skill['show'] = skill.name;
    }
  }
}
