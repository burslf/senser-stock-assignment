import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  sidenav: BehaviorSubject<MatSidenav|null> = new BehaviorSubject<MatSidenav|null>(null);
  isExpanded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  state: BehaviorSubject<string> = new BehaviorSubject<string>('collapsed');

  setExpanded(state: boolean) {
    this.isExpanded.next(state);
  }
  setSidenav(sidenav: MatSidenav) {
    this.sidenav.next(sidenav);
  }
  setState(state: string) {
    this.state.next(state);
  }
}
