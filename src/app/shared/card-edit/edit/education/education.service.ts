import { Injectable } from '@angular/core';
import { AsyncService } from '../async.service';
import { EducationInterface } from './../../../../_interface/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends AsyncService<EducationInterface> {
  endPoint: string = 'api/v1/education/';
}
