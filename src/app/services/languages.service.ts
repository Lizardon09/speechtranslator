import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {ILanguage} from './language';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LanguagesService {

  private languageurl : string = "assets/language.json";

  request : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getLanguages() : Observable<ILanguage[]> {
    return this.http.get<ILanguage[]>(this.languageurl).pipe(
      tap(data => data.sort(
        (a,b) => a.name<b.name ? -1 : 1
        )
      ));
  }

}
