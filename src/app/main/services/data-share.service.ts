import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataShareService {
  private data = new BehaviorSubject<object>({});
  current_data = this.data.asObservable();

  constructor() { }

  setData(data: object){
    this.data.next(data);
  }
}
