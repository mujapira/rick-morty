import { Routes } from "@angular/router"
import { HomeComponent } from "./components/home/home.component"
import { CharactersComponent } from "./components/characters/characters.component"
import { EpisodesComponent } from "./components/episodes/episodes.component"
import { LocationsComponent } from "./components/locations/locations.component"
import { NotFoundComponent } from "./components/not-found/not-found.component"
import { CharacterComponent } from "./components/character/character.component"

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
