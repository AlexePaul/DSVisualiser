import { Component } from '@angular/core';
import { simpleLinkedList } from 'src/shared/models/simpleLinkedList';

@Component({
  selector: 'sll',
  templateUrl: './sll.component.html',
  styleUrls: ['./sll.component.less']
})
export class SllComponent {
  SLL: simpleLinkedList = new simpleLinkedList();
  value: number = 1;

  get SLLAsArray(){
    return this.SLL.asArray();
  }

  constructor() {
      
  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  drawRectangle(x : any, y : any, width : any, height : any){
    const canvas = document.getElementById("Canvas") as HTMLCanvasElement;
    if (canvas){
      const ctx = canvas.getContext("2d");
      if(ctx == null)
        return;
      ctx.imageSmoothingEnabled = false;
      ctx.strokeStyle = `black`;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
    } 
    else{
      console.error("Canvas element not found.");
    }
  }

  draw(){
    const canvas = document.getElementById("Canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
  
    if(ctx == null)
      return;

    ctx.canvas.width  = windowWidth;
    ctx.canvas.height = windowHeight;  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(this.SLLAsArray.length > 0){
    
      var space = windowWidth/ Math.min((this.SLLAsArray.length + 1), Math.ceil(windowWidth*9/1920)+1);
      var rectangleHeight = (windowHeight*100)/1080;
      var rectangleWidth = (windowWidth*150)/1920;
      var maxPerRow = Math.ceil(windowWidth*9/1920);
      
      if(windowHeight > windowWidth){
        [rectangleHeight, rectangleWidth] = [rectangleWidth, rectangleHeight];
      }
      console.log(maxPerRow);

      // Desenez patratele
      for (let i = 0; i < this.SLLAsArray.length; i++){
        this.drawRectangle(space*((i)%(maxPerRow)+1)-rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight, rectangleWidth, rectangleHeight);
      }

      // Impart patratele in 2
      ctx.beginPath();
      for (let i = 0; i < this.SLLAsArray.length; i++){
        ctx.moveTo(space*((i)%(maxPerRow)+1), (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight);
        ctx.lineTo(space*((i)%(maxPerRow)+1), (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight);
        ctx.stroke();
      }

      // Pun numarul in patrate
      for(let i = 0; i < this.SLLAsArray.length; i++){
        ctx.font = rectangleHeight/2+"px Tahoma";
        ctx.fillText(String(this.SLLAsArray[i]),  space*((i)%(maxPerRow)+1)-rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + 11*rectangleHeight/16);
      }

      //desenez sagetile
      for(let i = 0; i < this.SLLAsArray.length-1; i++){
        if((i+1)%maxPerRow){
          ctx.beginPath();
          ctx.moveTo(space*((i)%(maxPerRow)+1) + rectangleWidth/4, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight/2);
          ctx.lineTo(space*((i)%(maxPerRow)+2) - rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight/2);
          ctx.stroke();
          ctx.beginPath();
          ctx.lineTo(space*((i)%(maxPerRow)+2) - rectangleWidth/2 - rectangleHeight/4, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight/4);
          ctx.lineTo(space*((i)%(maxPerRow)+2) - rectangleWidth/2 - rectangleHeight/4, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + 3*rectangleHeight/4);
          ctx.lineTo(space*((i)%(maxPerRow)+2) - rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight/2);
          ctx.fill();
        }
        else{
          ctx.beginPath();
          ctx.moveTo(space*((i)%(maxPerRow)+1) + rectangleWidth/4, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight/2);
          ctx.lineTo(space*((i)%(maxPerRow)+1) + rectangleWidth/4, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight + 20);
          ctx.lineTo(space*((0)%(maxPerRow)+1), (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight + 20);
          ctx.lineTo(space*((0)%(maxPerRow)+1), (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight + 40);
          ctx.stroke();
          ctx.beginPath();
          ctx.lineTo(space*((0)%(maxPerRow)+1) + rectangleHeight/6, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight + 40 - rectangleHeight/8);
          ctx.lineTo(space*((0)%(maxPerRow)+1) - rectangleHeight/6, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight + 40 - rectangleHeight/8);
          ctx.lineTo(space*((0)%(maxPerRow)+1), (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight + 40);
          ctx.fill();
        }
      }

    }
  }
}
