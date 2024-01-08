import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"

import OpenAI from "openai"
import { environment } from "../../environments/environment "
import { Observable, filter, from, map } from "rxjs"

@Injectable({
  providedIn: "any",
})
export class OpenAiService {
  private apiKey = environment.apiKey
  //private API_KEY = process.env["NG_API_KEY"]

  readonly openai = new OpenAI({
    apiKey: this.apiKey,
    dangerouslyAllowBrowser: true,
  })

  async getData() {
    const completion = await this.openai.chat.completions.create(
      {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Who won the world series in 2020?" },
          {
            role: "assistant",
            content: "The Los Angeles Dodgers won the World Series in 2020.",
          },
          { role: "user", content: "Where was it played?" },
        ],

        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          "content-type": "application/json;",
          authorization: "Bearer" + this.apiKey,
        },
        
      }
    )
    console.log(completion)
  }
}
