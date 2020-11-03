import { Injectable } from '@angular/core';
import { AsyncService } from '../async.service';
import { PersonalInterface } from './../../../../_interface/personal.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalService extends AsyncService<PersonalInterface> {
  endPoint: string = 'api/v1/personal/';
  
  setShow(personal: PersonalInterface[]){
    for (let p of personal) {
      p['show'] = this.getDomain(p.data, p.personal_type);
      p['description'] = p.data;
    }
  }

  getDomain(data: string, type: string): string {
    switch(type) {
      case 'P': return data;
      case 'E': return data.split('@')[1].split('.')[0];
      case 'W': return data.split('.').filter((el) => !['https://www', 'http://www', 'www', 'com'].includes(el))[0];
      case 'R': return 'git';
    }
  }
}
