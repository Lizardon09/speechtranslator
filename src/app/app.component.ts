import { Component, Input } from '@angular/core';
import {TranslateService} from './services/translate.service'
import {LanguagesService} from './services/languages.service';
import { ITranslation } from './services/translation';
import { ILanguage } from './services/language';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    private translateservice : TranslateService,
    private languageservice : LanguagesService
    ){}

  ngOnInit(){

  }

}
