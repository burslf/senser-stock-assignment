import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor() { }

  isMobile: BehaviorSubject<boolean> = new BehaviorSubject(false);

  setMobile(state: boolean) {
    this.isMobile.next(state);
  }
  
}
