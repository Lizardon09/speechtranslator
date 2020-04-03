import { Component, Input, OnInit } from '@angular/core';
import {TranslateService} from '../services/translate.service'
import {LanguagesService} from '../services/languages.service';
import { ITranslation } from '../services/translation';
import { ILanguage } from '../services/language';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  finaltext : string;
  languages : ILanguage[];

  @Input() testspoken : ILanguage;
  @Input() testtranslate : ILanguage;

  constructor(
    private translateservice : TranslateService,
    private languageservice : LanguagesService
    ){}

  ngOnInit(){

    this.languageservice.getLanguages()
      .subscribe((data : any) => {
        this.languages=data;
      });

  }

  ngOnChanges(){
    console.log(this.testspoken.name);
    console.log(this.testtranslate.name);
  }

  selectSpokenLanguage(language : ILanguage){

    if(language.name==this.testtranslate.name){
      this.testtranslate = this.testspoken;
    }
    this.testspoken = language;
  }

  selectTranslateLanguage(language : ILanguage){

    if(language.name==this.testspoken.name){
      this.testspoken = this.testtranslate;
    }

    this.testtranslate = language;

    let spokentext = document.getElementById("spokentext");
    let translatedtext = document.getElementById("translatedtext");

    this.translateservice.translateWords(this.testspoken.language, this.testtranslate.language, spokentext.innerHTML)
                    .subscribe((data : any) => {
                      translatedtext.innerHTML = data[0][0][0];
                    });

  }

  startlistening(){

    if ('webkitSpeechRecognition' in window) {

      var recognition = new webkitSpeechRecognition();

      var functiontranslateservice = this.translateservice;

      recognition.continuous = true;

      recognition.interimResults = true;

      recognition.lang = this.testspoken.language;

      var spokenlanguage = this.testspoken.language;

      var translatelanguage = this.testtranslate.language;

      recognition.start();

      let spokentext = document.getElementById("spokentext");
      let translatedtext = document.getElementById("translatedtext");
      let recordbutton = document.getElementById("recordbutton");
      recordbutton.innerHTML = "Recording...";

      let microphone = document.getElementById("microphone-icon");
      microphone.style["background"] = "red";
      microphone.style["color"] = "white";

      recognition.onerror = function(event) {
        console.error(event);
      };

      recognition.onstart = function() {
        console.log('Speech recognition service has started');
      };

      recognition.onend = function() {
        console.log('Speech recognition service disconnected');

        functiontranslateservice.translateWords(spokenlanguage, translatelanguage, spokentext.innerHTML)
                    .subscribe((data : any) => {
                      translatedtext.innerHTML = data[0][0][0];
                    });

      };

      recognition.onresult = function(event) {
        var interim_transcript = '';
        var final_transcript = '';
    
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            // Verify if the recognized text is the last with the isFinal property
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
                recognition.stop();
                spokentext.innerHTML = final_transcript;
                recordbutton.innerHTML = "Press to record";
                microphone.style["background"] = "white";
                microphone.style["color"] = "red";
            } else {
                interim_transcript += event.results[i][0].transcript;
                spokentext.innerHTML = interim_transcript;
            }
        }
    
        // Choose which result may be useful for you
    
        // console.log("Interim: ", interim_transcript);
    
        // console.log("Final: ",final_transcript);
    
        // console.log("Simple: ", event.results[0][0].transcript);

        this.finaltext = final_transcript;

      };

    }

    else{

      alert("Unable to record speech. Please use a browser that allows for Mic capabilities.");

    }

  }

}
