import { Component } from "@angular/core"
import { NgIcon, provideIcons } from "@ng-icons/core"
import { CharacterService } from "../../services/api/characters/character.service"
import { Character } from "../../services/api/models/character"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import {
  matKeyboardDoubleArrowRightOutline,
  matKeyboardDoubleArrowLeftOutline,
  matKeyboardArrowRightOutline,
  matKeyboardArrowLeftOutline,
  matBadgeOutline,
  matAccountBoxOutline,
  matMaleOutline,
  matFemaleOutline,
  matHelpOutline,
  matDangerousOutline,
  matFavoriteOutline,
  matDoNotDisturbOnOutline,
  matCategoryOutline,
  matPinDropOutline,
  matFavoriteBorderOutline
} from "@ng-icons/material-icons/outline"
@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterLink],
  viewProviders: [
    provideIcons({
      matKeyboardDoubleArrowRightOutline,
      matKeyboardDoubleArrowLeftOutline,
      matKeyboardArrowRightOutline,
      matAccountBoxOutline,
      matKeyboardArrowLeftOutline,
      matBadgeOutline,
      matMaleOutline,
      matFemaleOutline,
      matHelpOutline,
      matCategoryOutline,
      matDangerousOutline,
      matFavoriteOutline,
      matDoNotDisturbOnOutline,
      matPinDropOutline,
      matFavoriteBorderOutline
    }),
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  constructor(private service: CharacterService) {}

  characterList:Character[] = [] as Character[]

  ngOnInit() {
    this.service.getCharacters([1,2,3,4,5]).subscribe((data) => {
      this.characterList = data
    })
  }

}
