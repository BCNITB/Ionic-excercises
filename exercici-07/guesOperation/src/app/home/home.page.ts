import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  num:number;
  num1:number = this.randomNum(0,100);
  num2:number = this.randomNum(0,100);
  sum:number;
  count:number=0;
  
  result:string;
  resultArray:string[]=["Resposta correcte", "T'has quedat curt!", "T'has passat de llarg!"];
  word:string="";
  msg:string;
  msgArray:string[]=["Quin crack!", "Gairebé perfecte!"]; //TODO: Create more msg options

  check:boolean=false;
  fail:boolean=false;
  
  sound:any;
    
  audio=new Audio();
  audioTime:any;

  constructor() {}

  randomNum(a, b){
    return Math.round(Math.random() * (b - a) + parseInt(a, 10));
  }

  checkAnswer(){
    this.calculateSum();

    if(this.sum == this.num){
      this.result=this.resultArray[0];
      this.check=true;
      this.fail=false;
      this.sound="../../assets/sounds/correct.mp3";
      ++this.count;
    }
    else if(this.sum > this.num){
      this.result=this.resultArray[1];
      this.fail=true;
      this.sound="../../assets/sounds/fail.mp3";
      ++this.count;
    }
    else if(this.sum < this.num){
      this.result=this.resultArray[2];
      this.fail=true;
      this.sound="../../assets/sounds/fail.mp3";
      ++this.count;
    }

    this.play(this.sound);

    if(this.count>1){
      this.word="intents";
    }
    else{
      this.word="intent";
    }

    switch(this.count){
      case 1:
        this.msg=this.msgArray[0];
        break;
      case 2:
        this.msg=this.msgArray[1];
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
}