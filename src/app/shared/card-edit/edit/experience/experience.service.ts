import { Injectable } from '@angular/core';
import { ExperienceInterface } from './../../../../_interface/experience.model';
import { AsyncService } from  '../async.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends AsyncService<ExperienceInterface> {
  endPoint = 'api/v1/experience/';
}
