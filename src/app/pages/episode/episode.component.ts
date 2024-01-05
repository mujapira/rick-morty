import { Component } from "@angular/core"
import { EpisodeService } from "../../services/api/episodes/episode.service"
import { Episode } from "../../services/api/models/episode"
import { Router } from "@angular/router"

@Component({
  selector: "app-episode",
  standalone: true,
  imports: [],
  templateUrl: "./episode.component.html",
})
export class EpisodeComponent {
  episode: Episode = {} as Episode
  targetId: string | undefined = undefined
  constructor(private episodeService: EpisodeService, private router: Router) {}

  ngOnInit(): void {
    this.targetId = this.router.url.split("/").pop()
    this.loadEpisode()
  }

  loadEpisode(): void {
    this.episodeService
      .getEpisode(Number(this.targetId))
      .subscribe((data: Episode) => {
        this.episode = data
      })
  }
}
