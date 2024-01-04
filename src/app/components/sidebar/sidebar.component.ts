import { SidebarService } from "./../../services/sidebar.service"
import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { MatSidenavModule } from "@angular/material/sidenav"
import { NgIcon } from "@ng-icons/core"
import {} from "@ng-icons/material-icons"
import { MatIconModule } from "@angular/material/icon"
import { RouterLink } from "@angular/router"
@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, MatSidenavModule, NgIcon, MatIconModule, RouterLink],
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent {
  constructor(public SidebarService: SidebarService) {}

  showFiller = true
}
