import { Injectable } from '@angular/core';
import { AsyncService } from '../async.service';
import { OtherInterface } from './../../../../_interface/other.model';
import { upperInitials } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class OtherService extends AsyncService<OtherInterface>{
//  skills: Array<SkillInterface> | null = null;
  endPoint: string = 'api/v1/other/';

  setShow(other: OtherInterface[]){
    for (let ot of other) {
      ot['show'] = `${ot.type_data} ${upperInitials(ot.data)}`;
      ot['description'] = ot.data;
    }
  }
}
