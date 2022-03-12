import { Component } from '@angular/core';

//Language
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
  
  result:string;
  resultArray:string[]=["Resposta correcte", "T'has quedat curt!", "T'has passat de llarg!"];
  resultArray_en:string[]=["Correct answer", "The input is too short!", "The input is too large!"];
  resultArray_es:string[]=["Respuesta correcta", "¡Te has quedado corto!", "'Te has pasado de largo!"];
  resultArray_eu:string[]=["Erantzun zuzena", "motz geratu zara!", "Urrunegi joan zara!"];
  resultArray_gl:string[]=["Resposta correcta", "Quedaste curto!", "Fuches demasiado lonxe!"];

  word:string="";
  msg:string;
  msgArray:string[]=["Quin crack!", "Gairebé perfecte!", "Has de practicar més", "Esforça't més!", "Tot és millorable"];
  msgArray_en:string[]=["What a crack!", "Almost perfect!", "You have to practice more", "Work harder!", "Everything can be improved"];
  msgArray_es:string[]=["Quin crack!", "¡Casi perfecto!", "Has de practicar más", "Esfuérzate más!", "Todo es mejorable"];
  msgArray_eu:string[]=["Zer pitzadura!", "La perfektua!", "Gehiago praktikatu behar duzu", "Lan gehiago egin!", "Dena hobetu daiteke"];
  msgArray_gl:string[]=["Qe crack!", "Case perfecte!", "Tes que practicar máis", "Traballa máis!", "Todo se pode mellorar"];
  msgSingular:string[]=["intent", "attempt", "intento", "saiatu", "intentou"];
  msgPlural:string[]=["intents", "attempts", "intentos", "saiakerak", "intentos"];

  check:boolean=false;
  fail:boolean=false;
  
  sound:any;
    
  audio=new Audio();
  audioTime:any;

  constructor(private translateService: TranslateService) {}

  languageChange(){
    this.translateService.use(this.language);
  }

  randomNum(a, b){
    return Math.round(Math.random() * (b - a) + parseInt(a, 10));
  }

  checkAnswer(){
    let tempArray:string[];
    let msgTempArray:string[];
    
    let msg:number;

    switch(this.language){
      case 'ca':
        tempArray=this.resultArray;
        msgTempArray=this.msgArray;
        msg=0;

        break;
        
      case 'en':
        tempArray=this.resultArray_en;
        msgTempArray=this.msgArray_en;
        msg=1;

        break;

      case 'es':
        tempArray=this.resultArray_es;
        msgTempArray=this.msgArray_es;
        msg=2;
        
        break;

      case 'eu':
        tempArray=this.resultArray_eu;
        msgTempArray=this.msgArray_eu;
        msg=3;
        
        break;

      case 'gl':
        tempArray=this.resultArray_gl;
        msgTempArray=this.msgArray_gl;
        msg=4;
        
        break;

      default:
        tempArray=this.resultArray;
        msgTempArray=this.msgArray;
        msg=0;
        
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
      this.word=this.msgPlural[msg];
    }
    else{
      this.word=this.msgSingular[msg];
    }

    switch(this.count){
      case 1:
        this.msg=msgTempArray[0];
        break;
      case 2:
        this.msg=msgTempArray[1];
        break;
        case 3:
          this.msg=msgTempArray[2];
          break;
          case 4:
            this.msg=msgTempArray[3];
            break;
          case 5:
            this.msg=msgTempArray[4];
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