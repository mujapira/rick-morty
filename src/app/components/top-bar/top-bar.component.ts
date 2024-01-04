import { SidebarService } from "./../../services/sidebar.service"
import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { RouterModule } from "@angular/router"
import { MatSidenavModule } from "@angular/material/sidenav"
import { NgIcon, NgIconComponent } from "@ng-icons/core"
import { MatIconModule } from "@angular/material/icon"

@Component({
  selector: "app-top-bar",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    NgIcon,
    MatIconModule,
    NgIconComponent,
  ],
  templateUrl: "./top-bar.component.html",
})
export class TopBarComponent {
  constructor(public SidebarService: SidebarService) {}
}
