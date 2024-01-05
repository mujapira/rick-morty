import { SidebarService } from "./../../services/sidebar.service"
import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
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
    RouterModule,
  ],
  templateUrl: "./top-bar.component.html",
})
export class TopBarComponent {
  currentRoute: string = ""
  constructor(public SidebarService: SidebarService, private router: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.router.url.subscribe((url) => console.log(url))
  // }
}
