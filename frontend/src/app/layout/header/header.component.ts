import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'app/services/sidenav.service';
import { MobileService } from 'app/services/mobile.service';
import { MatListModule } from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ThemeService } from 'app/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  sidenav: MatSidenav|null = null;
  isMobile: boolean = false;
  isExpanded: boolean = false;
  darkMode: boolean = false;

  constructor(
    private sidenavService: SidenavService,
    private mobileService: MobileService,
    private themeService: ThemeService
  ) {}
  
  ngOnInit() {
    this.sidenavService.sidenav.subscribe(r => this.sidenav = r)
    this.mobileService.isMobile.subscribe(r => this.isMobile = r)
    this.sidenavService.isExpanded.subscribe(r => this.isExpanded = r)
    this.themeService.darkMode.subscribe(r => this.darkMode = r)
  }

  expandSidenav() {
    this.sidenavService.setExpanded(!this.sidenavService.isExpanded.value)
    this.sidenavService.setState(this.sidenavService.state.value == 'expanded' ? 'collapsed' : 'expanded')
  }

  toggleSidenav() {
    this.sidenav!.toggle();
    // this.sidenav.toggle()
  }

  toggleDarkMode() {
    this.themeService.setDarkMode(!this.themeService.darkMode.value)
    localStorage.setItem('theme', this.themeService.darkMode.value ? 'dark' : 'light')
  }
}
