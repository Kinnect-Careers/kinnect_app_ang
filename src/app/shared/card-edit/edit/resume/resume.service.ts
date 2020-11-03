import { Injectable } from '@angular/core';
import { ResumeClass } from './../../../../_interface/resume.model';
import { AsyncService } from  '../async.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService extends AsyncService<ResumeClass> {
  endPoint = 'api/v1/resume/';
}
