import { Component } from "@angular/core"
import { NgIcon, provideIcons } from "@ng-icons/core"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({  })],

  templateUrl: "./home.component.html",
})
export class HomeComponent {}
