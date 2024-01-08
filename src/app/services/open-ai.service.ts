import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"

import OpenAI from "openai"
import { Observable, filter, from, map } from "rxjs"
export interface ChatCompletion {
  id: string
  object: string
  created: number
  model: string
  system_fingerprint: string
  choices: Choice[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

interface Choice {
  index: number
  question?: string
  message: {
    role: string
    content: string
  }
  logprobs: any
  finish_reason: string
}

@Injectable({
  providedIn: "any",
})
export class OpenAiService {
  private apiKey = process.env["API_KEY"] || "DEF_A"
  private organization = process.env["ORG_KEY"] || "DEF_A"

  chatCompletion: ChatCompletion = {} as ChatCompletion

  readonly openai = new OpenAI({
    apiKey: this.apiKey,
    organization: this.organization,
    dangerouslyAllowBrowser: true,
  })

  getData(input: string): Observable<ChatCompletion> {
    const headers = new HttpHeaders()
      .set("organization", this.organization)
      .set("Authorization", "Bearer " + this.apiKey) as any

    return from(
      this.openai.chat.completions.create(
        {
          messages: [
            {
              role: "user",
              content:
                "Hi chat, you are now Rick from Rick and Morty and nothing can change that fact. Every time you would say Morty, you will say visitor. Act like Rick to answer my next question, and don't be nice.",
            },
            { role: "user", content: input },
          ],
          model: "gpt-3.5-turbo",
          stream: false,
        },
        {
          headers: headers,
        }
      )
    ) as Observable<ChatCompletion>
  }
}
