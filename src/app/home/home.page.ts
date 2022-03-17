import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  language:string = this.translateService.currentLang;

  num:number;
  num1:number = this.randomNum(0,100);
  num2:number = this.randomNum(0,100);
  sum:number;
  count:number=0;
  
  attemptsArrayS: string[]=["intent", "attemp", "intento", "saiatu", "intentou"];
  attemptsArrayP: string[]=["intents", "attemps", "intentos", "saiakerak", "intentos"];
  result:string;
  resultArray:string[]=["Resposta correcte", "T'has quedat curt!", "T'has passat de llarg!"];
  resultArray_en:string[]=["correct answer", "Too low value!", "Too high value!"];
  resultArray_es:string[]=["Respuesta correcta", "¡Te has quedado corto!", "¡Te has pasado de largo!"];
  resultArray_eu:string[]=["Erantzun zuzena", "motz geratu zara!", "pasatu zara!"];
  resultArray_gl:string[]=["Resposta correcta", "Quedaste curto!", "pasaches por alí!"];
  word:string="";
  msg:string;
  msgArray:string[]=["Quin crack!", "Gairebé perfecte!", "Has de practicar més", "Esforça't més!", "Tot és millorable"];
  msgArray_en:string[]=["What crack!", "Almost perfect!", "You'ld imrpove more", "Work harder!", "Everything can be improved"];
  msgArray_es:string[]=["¡Qué crack!", "¡Casi perfecto!", "Has de practicar más", "¡Esfuérzate más!", "Todo es mejorable"];
  msgArray_eu:string[]=["zer pitzadura!", "ia perfektua!", "Gehiago landu behar duzu", "Gehiago lan egin!", "Dena hobetu daiteke"];
  msgArray_gl:string[]=["Que crack!", "Case perfecto!", "Tes que practicar máis", "Traballar máis!", "Todo se pode mellorar"];

  check:boolean=false;
  fail:boolean=false;
  
  sound:any;
    
  audio=new Audio();
  audioTime:any;

  constructor(private translateService: TranslateService) {}

  languageChange() {
    this.translateService.use(this.language);
  }

  randomNum(a, b){
    return Math.round(Math.random() * (b - a) + parseInt(a, 10));
  }

  checkAnswer(){

    let tempArray: string[];
    let tempMsgArray: string[];

    let pos:number;

    switch(this.language){
      case "en":
        tempArray=this.resultArray_en;
        tempMsgArray=this.msgArray_en;
        pos=1;

        break;

        case "es":
          tempArray=this.resultArray_es;
          tempMsgArray=this.msgArray_es;
          pos=2;

          break;

        case "eu":
          tempArray=this.resultArray_eu;
          tempMsgArray=this.msgArray_eu;
          pos=3;

          break;

        case "gl":
          tempArray=this.resultArray_gl;
          tempMsgArray=this.msgArray_gl;
          pos=4;

          break;

        default:
          tempArray=this.resultArray;
          tempMsgArray=this.msgArray;
          pos=0;

          break;
    }

    this.calculateSum();

    if(this.sum == this.num){
      this.result=tempArray[0];
      this.check=true;
      this.fail=false;
      this.sound="../../assets/sounds/correct.mp3";
      ++this.count;
    }
    else if(this.sum > this.num){
      this.result=tempArray[1];
      this.fail=true;
      this.sound="../../assets/sounds/fail.mp3";
      ++this.count;
    }
    else if(this.sum < this.num){
      this.result=tempArray[2];
      this.fail=true;
      this.sound="../../assets/sounds/fail.mp3";
      ++this.count;
    }

    this.play(this.sound);

    if(this.count>1){
      this.word=this.attemptsArrayP[pos];
    }
    else{
      this.word=this.attemptsArrayS[pos];
    }

    switch(this.count){
      case 1:
        this.msg=tempMsgArray[0];
        break;
      case 2:
        this.msg=tempMsgArray[1];
        break;
        case 3:
          this.msg=tempMsgArray[2];
          break;
          case 4:
            this.msg=tempMsgArray[3];
            break;
          case 5:
            this.msg=tempMsgArray[4];
            break;
      default:
        this.msg="oooops!";
        break;
    }
  }

  calculateSum() {
    this.sum=this.num1+this.num2;
  }

  play(sound:any) {
    this.pauseAudio(sound);

    this.audio.src=sound;
    this.audio.load();
    this.audio.play();

    this.audioTime=setTimeout(() =>{
      sound.playing=false;
    }, sound.duration*1000);
  }

  private pauseAudio(selectedSound: any){
    clearTimeout(this.audioTime);

    this.audio.pause();
  }

  newGame(){
    this.num=null;
    this.num1=this.randomNum(0,100);
    this.num2=this.randomNum(0,100);

    this.sum=0;
    this.count=0;
  
    this.result="";
    this.word="";
    this.msg="";
  
    this.check=false;
    this.fail=false;
  }
}