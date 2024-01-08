import { Component, inject } from "@angular/core"
import { ChatCompletion, OpenAiService } from "../../services/open-ai.service"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { NgIcon, provideIcons } from "@ng-icons/core"
import { matArrowUpwardOutline } from "@ng-icons/material-icons/outline"

@Component({
  selector: "app-questions",
  standalone: true,
  imports: [FormsModule, CommonModule],
  viewProviders: [
    provideIcons({
      matArrowUpwardOutline,
    }),
  ],
  templateUrl: "./questions.component.html",
})

export class QuestionsComponent {
  question: string = ""
  chatHistory: ChatCompletion[] = []
  isLoading: boolean = false

  constructor() {}

  openAiService = inject(OpenAiService)

  onEnterPress() {
    this.getAnswer()
  }

 getAnswer() {
  if (!this.question.trim()) {
    return;
  }

  this.isLoading = true;
  const element = document.querySelector(".loader");
  if (element) {
    element.classList.add("animate-spin");
  }

  // Call the server-side route for the API request
  this.openAiService.getChatCompletionObservable(this.question).subscribe(
    (data) => {
      // Process the result as needed
      this.chatHistory.push(data as any);
      const lastIndex = this.chatHistory.length - 1;
      if (lastIndex >= 0) {
        this.chatHistory[lastIndex].choices[0].question = this.question;
      }
      this.question = "";
    },
    (error) => {
      console.error("Error fetching data:", error);
    },
    () => {
      this.isLoading = false;
      element?.classList.remove("animate-spin");
    }
  );
}
}
