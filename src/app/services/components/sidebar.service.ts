import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any',
})

export class SidebarService {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }	
}