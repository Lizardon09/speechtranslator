import { Component, OnInit, } from '@angular/core';
import {LanguagesService} from '../services/languages.service';
import {ILanguage} from '../services/language';
import { Observable, Subject, combineLatest } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, startWith, map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  // languages : ILanguage[];
  selectedspokentext : ILanguage;
  selectedtranslatedtext : ILanguage;

  selectedlanguage : ILanguage;

  testspoken : ILanguage;
  testtranslate : ILanguage;

  spokenlanguages$: Observable<ILanguage[]>;
  spokenfilteredLanguages$: Observable<ILanguage[]>;
  spokenfilter: FormControl;
  spokenfilter$: Observable<string>;

  constructor(private languageservice : LanguagesService) { }

  ngOnInit(): void {

    this.languageservice.getLanguages()
      .subscribe((data : any) => {
        this.testspoken=data[0];
        this.testtranslate=data[1];
      });
    this.Search();

  }

  Search()
  {
    this.spokenlanguages$ = this.languageservice.getLanguages()
    this.spokenfilter = new FormControl('');
    this.spokenfilter$ = this.spokenfilter.valueChanges.pipe(startWith(''));
    this.spokenfilteredLanguages$ = combineLatest(this.spokenlanguages$, this.spokenfilter$).pipe(
      map(([games, filterString]) => games.filter(movies => movies.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );

  }

  selectLanguage(language : ILanguage){
    this.selectedlanguage = language;
  }

  assignSpoken(language : ILanguage){
    if(language.name==this.testtranslate.name){
      this.testtranslate = this.testspoken;
    }
    this.testspoken = language;
  }

  assignTranslate(language : ILanguage){
    if(language.name==this.testspoken.name){
      this.testspoken = this.testtranslate;
    }

    this.testtranslate = language;
  }

}
