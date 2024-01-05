import { Component } from "@angular/core"
import { Character } from "../../services/api/models/character"
import { CharacterService } from "../../services/api/characters/character.service"
import { Router, RouterLink } from "@angular/router"
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
  matSlideshowOutline,
  matFavoriteBorderOutline,
  matCribOutline
} from "@ng-icons/material-icons/outline"
import { forkJoin, map, switchMap } from "rxjs"
import { EpisodeService } from "../../services/api/episodes/episode.service"
import { Episode } from "../../services/api/models/episode"

@Component({
  selector: "app-character",
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink],
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
      matFavoriteBorderOutline,
      matCribOutline,
      matSlideshowOutline
    }),
  ],
})
export class CharacterComponent {
  character: Character = {} as Character
  targetId: string | undefined = undefined
  constructor(
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.targetId = this.router.url.split("/").pop()
    this.loadCharacter()
  }

  loadCharacter(): void {
    this.characterService
      .getCharacter(Number(this.targetId))
      .pipe(
        switchMap((charData: Character) => {
          this.character = charData
          return forkJoin({
            characterEpisodes: this.episodeService.geCharacterEpisodes(
              charData.episode
            ),
          }).pipe(
            map((result: { characterEpisodes: Episode[] }) => ({
              ...charData,
              actualEpisodes: result.characterEpisodes,
            }))
          )
        })
      )
      .subscribe((characterEpisodes: Character) => {
        this.character = characterEpisodes
      })
  }

  transformEpisodeAndSeason(input: string): string {
    const regex = /^S(\d+)E(\d+)$/

    const match = input.match(regex)

    if (match) {
      const season = match[1]
      const episode = match[2]
      return `Season ${this.padWithZeroes(
        season
      )} - Episode ${this.padWithZeroes(episode)}`
    } else {
      return input
    }
  }

  padWithZeroes(number: string): string {
    return number.padStart(2, "0")
  }
}
