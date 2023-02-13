import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MobileService } from 'app/services/mobile.service';
import {MatIconModule} from '@angular/material/icon';
import { SidenavService } from 'app/services/sidenav.service';
import { Menu, navigation } from 'app/contents/navigation';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @ViewChild('sidenav', {static: true}) public sidenav!: MatSidenav;
  isExpanded: boolean = false;
  isMobile: boolean = false;
  navigationMenu: Menu[];
  
  constructor(
    private mobileService: MobileService,
    private sidenavService: SidenavService,
    private router: Router,
  ) { 
    this.navigationMenu = navigation;
   }
  
  toggleSidenav(){
    this.sidenavService.sidenav.value.toggle()
  }
  
  navigateTo(url: string, name: string) {
    let menuIndex = this.navigationMenu.findIndex(r => r.name == name)
    this.navigationMenu[menuIndex].active = true
    this.router.navigate([url])
  }

  ngOnInit() {
    this.mobileService.isMobile.subscribe(r => this.isMobile = r)
    this.sidenavService.isExpanded.subscribe(r => this.isExpanded = r)
  }
}
