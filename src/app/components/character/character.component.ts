import { Component } from "@angular/core"
import { Character } from "../../services/api/models/character"
import { CharacterService } from "../../services/api/characters/character.service"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { NgIcon, provideIcons } from "@ng-icons/core"
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
  selector: "app-character",
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: "./character.component.html",
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
})
export class CharacterComponent {
  character: Character = {} as Character
  targetId: string | undefined = undefined
  constructor(private service: CharacterService, private router: Router) {}

  ngOnInit(): void {
    this.targetId = this.router.url.split("/").pop()
    this.loadCharacter()
  }

  loadCharacter(): void {
    if (this.targetId === undefined) {
      return
    }
    this.service
      .getCharacter(Number(this.targetId))
      .subscribe((data: Character) => {
        this.character = data
      })
  }
}
