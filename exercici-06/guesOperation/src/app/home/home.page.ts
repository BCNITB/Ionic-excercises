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
  resultArray:string[]=["Resposta correcta", "T'has quedat curt!", "T'has passat de llarg!"];
  word:string="";

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
      // TODO: increase count variable adding 1 point
    }
    else if(this.sum < this.num){
      this.result=this.resultArray[2];
      this.fail=true;
      this.sound="../../assets/sounds/fail.mp3";
      // TODO: increase count variable adding 1 point
    }

    this.play(this.sound);

    if(this.count>1){
      this.word="intents";
    }
    else{
      this.word="intent";
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