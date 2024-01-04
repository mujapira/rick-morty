import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SidebarService {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}