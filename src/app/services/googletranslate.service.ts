import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogletranslateService {
  url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?';
  // url = "https://google-translate1.p.rapidapi.com/language/translate/v2/detect"
  key = 'key=trnsl.1.1.20220206T162939Z.f89eee1b2c620d9e.922bb9755a6f37ffd99db91fb41ebf412e0ab28b';
  id = "&text=สวัสดี&lang=th-en&format=html"
  test ="https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20220206T162939Z.f89eee1b2c620d9e.922bb9755a6f37ffd99db91fb41ebf412e0ab28b&text=สวัสดี&lang=th-en&format=html"
  constructor(private http: HttpClient) { }
  translate(obj: GoogleObj) {
    debugger
    return this.http.get(this.test);

    }
}
export interface GoogleObj {
  q:any;
  target: string;
  }
