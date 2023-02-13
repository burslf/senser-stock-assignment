import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSidenav } from '@angular/material/sidenav'
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MobileService } from '../services/mobile.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavService } from '../services/sidenav.service';
import { HeaderComponent } from './header/header.component';
import { animations } from '../animations/index';
import { ThemeService } from 'app/services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    SidenavComponent,
    HeaderComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: animations
})
export class LayoutComponent {
  @ViewChild('sidenav', { static: true }) public sidenav!: MatSidenav;
  isExpanded: boolean = false;
  isMobile: boolean = false;
  state: string = 'collapsed';
  isDarkEnable: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mobileService: MobileService,
    private sidenavService: SidenavService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.isExpanded.subscribe(r => {
      this.isExpanded = r
    })
    this.sidenavService.state.subscribe(r => this.state = r)
    this.mobileService.isMobile.subscribe(r => this.isMobile = r)
    this.themeService.darkMode.subscribe(r => this.isDarkEnable = r)
    this.handleMobileMode()
    
  }

  handleMobileMode() {
    this.breakpointObserver.observe([
      "(max-width: 768px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.sidenav.close();
        this.sidenavService.setExpanded(true);
        this.mobileService.setMobile(true);
      } else {
        this.mobileService.setMobile(false);
        this.sidenavService.setExpanded(false);
        this.sidenav.open();
      }
    });
  }

}
