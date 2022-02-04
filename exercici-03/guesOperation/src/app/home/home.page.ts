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
  
  result:string;
  resultArray:string[]=["Respuesta correcta", "¡Te has quedado corto!"];

  check:boolean=false;

  constructor() {}

  randomNum(a, b){
    return Math.round(Math.random() * (b - a) + parseInt(a, 10));
  }

  checkAnswer(){
    this.calculateSum();

    if(this.sum == this.num){
      this.result=this.resultArray[0];
      this.check = true;
    }
    else if(this.sum < this.num){
      this.result=this.resultArray[1];
    }
    else if(this.sum > this.num){
      this.result=this.resultArray[2];
    }
  }

  calculateSum() {
    this.sum=this.num1+this.num2;
  }
}
