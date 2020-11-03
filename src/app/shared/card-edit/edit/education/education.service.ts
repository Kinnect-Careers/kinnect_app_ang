import { Injectable } from '@angular/core';
import { AsyncService } from '../async.service';
import { EducationInterface } from './../../../../_interface/education.model';
import { upperInitials } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends AsyncService<EducationInterface> {
  endPoint: string = 'api/v1/education/';

  setShow(educations: EducationInterface[]){
    for (let ed of educations) {
      ed['show'] = `${ed.degree_type} at ${upperInitials(ed.institution)}`;
      ed['description'] = `${ed.degree_type} at ${ed.institution}`;
    }
  }
}
