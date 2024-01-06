import { Component } from "@angular/core"
import { EpisodeService } from "../../services/api/episodes/episode.service"
import { Episode } from "../../services/api/models/episode"
import { Router, RouterLink } from "@angular/router"
import { forkJoin, map, switchMap } from "rxjs"
import { Character } from "../../services/api/models/character"
import { CommonModule } from "@angular/common"
import { NgIcon, provideIcons } from "@ng-icons/core"
import { matSlideshowOutline } from "@ng-icons/material-icons/outline"
@Component({
  selector: "app-episode",
  standalone: true,
  imports: [CommonModule, RouterLink, NgIcon],
  templateUrl: "./episode.component.html",
  viewProviders: [
    provideIcons({
      matSlideshowOutline,
    }),
  ],
})
export class EpisodeComponent {
  episode: Episode = {} as Episode
  targetId: string | undefined = undefined
  constructor(private episodeService: EpisodeService, private router: Router) {}
  isEpisodeLoaded: boolean = false

  ngOnInit(): void {
    this.targetId = this.router.url.split("/").pop()
    this.loadEpisode()
  }

  loadEpisode(): void {
    this.episodeService
      .getEpisode(Number(this.targetId))
      .pipe(
        switchMap((episodeData: Episode) => {
          this.episode = episodeData
          return forkJoin({
            episodeCharacters: this.episodeService.getEpisodeCharacters(
              episodeData.characters
            ),
          }).pipe(
            map((result: { episodeCharacters: Character[] }) => ({
              ...episodeData,
              actualCharacters: result.episodeCharacters,
            }))
          )
        })
      )
      .subscribe((data: Episode) => {
        this.episode = data
        console.log(this.episode)
      })
      .add(() => {
        setTimeout(() => {
          this.isEpisodeLoaded = true
        }, 300)
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
