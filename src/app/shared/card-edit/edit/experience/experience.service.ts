import { Injectable } from '@angular/core';
import { ExperienceInterface } from './../../../../_interface/experience.model';
import { AsyncService } from  '../async.service';

import { upperInitials } from '../utils'

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends AsyncService<ExperienceInterface> {
  endPoint = 'api/v1/experience/';
  
  setShow(experiences: ExperienceInterface[]){
    for (let exp of experiences) {
      exp['show'] = `${upperInitials(exp.job_title)} at ${upperInitials(exp.company)}`;
      exp['description'] = `${exp.job_title} at ${exp.company}`;
    }
  }
}
