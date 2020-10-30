import { Injectable } from '@angular/core';
import { AsyncService } from '../async.service';
import { PersonalInterface } from './../../../../_interface/education.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalService extends AsyncService<PersonalInterface> {
  endPoint: string = 'api/v1/personal/';
}
