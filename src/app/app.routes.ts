import { Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { CharactersComponent } from "./pages/characters/characters.component"
import { EpisodesComponent } from "./pages/episodes/episodes.component"
import { LocationsComponent } from "./pages/locations/locations.component"
import { NotFoundComponent } from "./components/not-found/not-found.component"
import { CharacterComponent } from "./pages/character/character.component"

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "characters",
    component: CharactersComponent,
  },
  {
    path: "characters/:id",
    component: CharacterComponent,
  },
  {
    path: "episodes",
    component: EpisodesComponent,
  },
  {
    path: "locations",
    component: LocationsComponent,
  },
  {
    path: "**",
    pathMatch: "full",
    component: NotFoundComponent,
  },
]
