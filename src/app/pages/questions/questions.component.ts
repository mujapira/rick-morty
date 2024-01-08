import { Component } from "@angular/core"
import { OpenAiService } from "../../services/open-ai.service"

@Component({
  selector: "app-questions",
  standalone: true,
  imports: [],
  providers: [OpenAiService],
  templateUrl: "./questions.component.html",
})
export class QuestionsComponent {
  constructor(private openAiService: OpenAiService) {}

  getAnswer() {
    this.openAiService.getData()
  }
}
