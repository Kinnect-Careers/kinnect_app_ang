import { TestBed, inject } from '@angular/core/testing';
import { EducationService } from './education.service';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('EducationService', () => {
  let educationService: EducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpTestingController],
      providers: [EducationService],
    });

    educationService = TestBed.get(EducationService);
  });

  it('should be created', () => {
    expect(educationService).toBeTruthy();
  });

  describe('all', () => {
    it('should return a collection of educational experience',
       inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const educationResponse = [
        {
          id:'1',
          degree: '',
          degree_type: '',
          started_at: new Date(),
          ended_at: new Date(),
          current: true,
          institution: '',
          slug: '',
        },
        {
          id:'2',
          degree: '',
          degree_type: '',
          started_at: new Date(),
          ended_at: new Date(),
          current: false,
          institution: '',
          slug: '',
        }
      ];
      let response;
      spyOn(educationService, 'all').and.returnValue(of(educationResponse));

      educationService.all().subscribe(res => {
        response = res;
      });
      expect(response).toEqual(educationResponse);
      expect(response.length).toEqual(2);
    }));
  });
})
