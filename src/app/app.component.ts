import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, RouterOutlet } from "@angular/router"
import { TopBarComponent } from "./components/top-bar/top-bar.component"
import { FooterComponent } from "./components/footer/footer.component"
import { SidebarComponent } from "./components/sidebar/sidebar.component"
import { CharactersComponent } from "./pages/characters/characters.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopBarComponent,
    FooterComponent,
    SidebarComponent,
    CharactersComponent,
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "rickandmorty"
  
}
