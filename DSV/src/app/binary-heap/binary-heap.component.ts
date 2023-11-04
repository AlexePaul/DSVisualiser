import { Component } from '@angular/core';
import { binaryHeap } from 'src/shared/models/binaryHeap';

@Component({
  selector: 'app-binary-heap',
  templateUrl: './binary-heap.component.html',
  styleUrls: ['./binary-heap.component.less']
})
export class BinaryHeapComponent {
  value : number = 0;
  bHeap: binaryHeap;
  tooMuch: number = 0;
  animation: boolean = false;
  stopAnimation: boolean = false;
  disabled: boolean = false;
  position:[number,number,number][] = [];
  /*
  *     TO DO:
  *     Window Resize: -> Move animations
  *
  * 
  * 
  */

  constructor(){
    this.draw = this.draw.bind(this);
    this.bHeap = new binaryHeap(true, this.draw);
  }

  drawLines(circleRadius : any){
    const canvas = document.getElementById("Canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    if(ctx == null)
      return;

    let numberOfNodes = 1;
    let size = this.bHeap.size;
    let step = 0;
    let counter = 1;

    while(size > 0){
      let space = Math.floor(windowWidth / (numberOfNodes*2));
      for(var i = 0; i < Math.min(numberOfNodes,size); i++){
        if(i == 0){
          if(counter*2 <= this.bHeap.size){
            var cspace = Math.floor(windowWidth / (numberOfNodes*4));
            ctx.beginPath();
            ctx.moveTo(space, 150*(step+1)+circleRadius);
            ctx.lineTo(cspace, 150*(step+2)-circleRadius);
            ctx.stroke();
          }13
          if(counter*2 + 1 <= this.bHeap.size){
            var cspace = Math.floor(windowWidth / (numberOfNodes*4));
            ctx.beginPath();
            ctx.moveTo(space, 150*(step+1)+circleRadius);
            ctx.lineTo(cspace + 2*cspace*(i+1), 150*(step+2)-circleRadius);
            ctx.stroke();
          }
        }
        else{
          if(counter*2 <= this.bHeap.size){
            var cspace = Math.floor(windowWidth / (numberOfNodes*4));
            var positionNextLine = counter*2 - numberOfNodes*2;
            ctx.beginPath();
            ctx.moveTo(space + 2*space*i, 150*(step+1)+circleRadius);
            ctx.lineTo(cspace + 2*cspace*(positionNextLine), 150*(step+2)-circleRadius);
            ctx.stroke();
          }
          if(counter*2 + 1 <= this.bHeap.size){
            var cspace = Math.floor(windowWidth / (numberOfNodes*4));
            var positionNextLine = counter*2 - numberOfNodes*2 + 1;
            ctx.beginPath();
            ctx.moveTo(space + 2*space*i, 150*(step+1)+circleRadius);
            ctx.lineTo(cspace + 2*cspace*(positionNextLine), 150*(step+2)-circleRadius);
            ctx.stroke();
          }
        }
        counter++;
      }
      step++;
      size -= numberOfNodes;
      numberOfNodes *= 2;
    }

  }

  async delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fadingCircle(i: any, startingColor:string = "Black", color:string = ""){
    this.animation = true;
    const canvas = document.getElementById("Canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if(ctx == null)
      return;
    let value = 255;
    while(value > 128){
      var x = this.position[i][0];
      var y = this.position[i][1];
      var circleRadius = this.position[i][2];
      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, 2*Math.PI);
      if(color == "rgb(255,255,255)"){
        if(startingColor == "Red")
          ctx.strokeStyle = "rgb("+255+","+(255-value)+","+(255-value)+")";
        else if(startingColor == "Blue")
          ctx.strokeStyle = "rgb("+(255-value)+","+(255-value)+","+255+")";
        else
          ctx.strokeStyle = "rgb("+(255-value)+","+255+","+(255-value)+")";
      }
      else{
        if(startingColor == "Red")
          ctx.strokeStyle = "rgb("+value+",0,0)";
        else if(startingColor == "Blue")
          ctx.strokeStyle = "rgb(0,0,"+value+")";
        else
          ctx.strokeStyle = "rgb(0,"+value+",0)";
      }
        value -= 1;
      ctx.stroke();
      await this.delay(10)
    }
    this.animation = false;
  }

  async draw(specialNumbers:number[], specialColor: string){
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var myColor = "rgb(0,0,0)"
    if(prefersDarkMode)
      myColor = "rgb(255,255,255)"
    
    const canvas = document.getElementById("Canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var nrs = specialNumbers;

    var numberOfNodes = 1;
    var size = this.bHeap.size;  
    var step = 0;
    var counter = 1;
    var circleRadius = 32 * windowWidth / 1080;
    
    if(ctx == null)
    return new Promise(resolve => setTimeout(resolve, 1));
    
    ctx.canvas.width  = windowWidth;
    ctx.canvas.height = windowHeight;
    while(size > 0){
      var space = Math.floor(windowWidth / (numberOfNodes*2));
      for(var i = 0; i < Math.min(numberOfNodes,size); i++){
        if(nrs.indexOf(Number(counter)) == -1){
          ctx.beginPath();
          if(i == 0){
            this.position[counter] = [space,150*(step+1),circleRadius];
            ctx.arc(this.position[counter][0], this.position[counter][1], this.position[counter][2], 0, 2* Math.PI);
          }
          else{
            this.position[counter] = [space + 2*space*i,150*(step+1),circleRadius];
            ctx.arc(this.position[counter][0], this.position[counter][1], this.position[counter][2], 0, 2* Math.PI);
          }
          ctx.strokeStyle = myColor;
          ctx.stroke();

          if(i==0){
            ctx.font = "16px Tahoma";
            ctx.fillStyle = myColor;
            ctx.fillText(String(this.bHeap.array[counter++]),space,150*(step+1));
          }
          else{
            ctx.font = "16px Tahoma";
            ctx.fillStyle = myColor;
            ctx.fillText(String(this.bHeap.array[counter++]),space + 2*space*i,150*(step+1));
          }
        }
        else{
          if(i == 0){
            this.position[counter] = [space,150*(step+1),circleRadius];
            this.fadingCircle(counter, specialColor, myColor);
          }
          else{
            this.position[counter] = [space + 2*space*i,150*(step+1),circleRadius];
            this.fadingCircle(counter, specialColor, myColor);
          }
          if(i==0){
            ctx.font = "16px Tahoma";
            ctx.fillStyle = myColor;
            ctx.fillText(String(this.bHeap.array[counter++]),space,150*(step+1));
          }
          else{
            ctx.font = "16px Tahoma";
            ctx.fillStyle = myColor;
            ctx.fillText(String(this.bHeap.array[counter++]),space + 2*space*i,150*(step+1));
          }
        }
        ctx.strokeStyle=myColor;
      }
        step++;
        size -= numberOfNodes;
        numberOfNodes *= 2;
    }
    this.drawLines(circleRadius);
    while(this.animation == true){
      await this.delay(1);
    }
    return new Promise(resolve => setTimeout(resolve, 1));
  }

  only1binary(value : number) : boolean{
    while(value!=1){
      if(value%2 == 0)
        return false;
      value = Math.floor(value/2);
    }
    return true;
  }

  async insert(){
    this.disabled = true;
    let maxAmount = Math.max(31 * window.innerWidth / 1920,31 * window.innerHeight / 1080);
    while(this.only1binary(maxAmount) == false)
      maxAmount--;
    if(this.bHeap.size < maxAmount){
      await this.bHeap.insertValue(this.value);
      if(this.bHeap.size == maxAmount)
        this.tooMuch = 0.5;
    }
    else if(this.bHeap.size == maxAmount && this.tooMuch == 0)
      this.tooMuch = 0.5;
    else
      this.tooMuch = 1;
    this.draw([], "");
    this.disabled = false;
  }
  async remove(){
    this.disabled = true;
    await this.bHeap.removeRoot();
    this.tooMuch = 0;
    this.draw([], "");
    this.disabled = false;
  }
}
