import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {ITranslation} from './translation';

@Injectable({
  providedIn: 'root'
})

export class TranslateService {

  private translateurl : string = "https://translate.googleapis.com/translate_a/single?client=gtx&";
  private sourcelang : string = "&sl=";
  private targetlang : string = "&tl=";
  private sourcetext : string = "&dt=t&q=";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  translateWords(sl : string, tl : string, st : string) : Observable<ITranslation> {
    var encodedSourceText = st.replace(" ", "%20");
    return this.http.get<ITranslation>(this.translateurl + this.sourcelang + sl + this.targetlang + tl + this.sourcetext + encodedSourceText);
  }

}