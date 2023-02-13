import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  darkMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  setDarkMode(state: boolean) {
    this.darkMode.next(state);
    if (state == true) {
      document.documentElement.classList.add('theme-dark')
      document.documentElement.classList.remove('theme-light')

    }else{
        document.documentElement.classList.remove('theme-dark')
        document.documentElement.classList.add('theme-light')
    }
  }
  
}
