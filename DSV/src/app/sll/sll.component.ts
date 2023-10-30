import { Component } from '@angular/core';
import { simpleLinkedList } from 'src/shared/models/simpleLinkedList';

@Component({
  selector: 'sll',
  templateUrl: './sll.component.html',
  styleUrls: ['./sll.component.less']
})
export class SllComponent {
  SLL: simpleLinkedList = new simpleLinkedList();
  value: number = 0;
  animation: boolean = false;

  get SLLAsArray(){
    return this.SLL.asArray();
  }

  constructor() {
      
  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  drawRectangle(x : any, y : any, width : any, height : any, color : string = "black"){
    const canvas = document.getElementById("Canvas") as HTMLCanvasElement;
    if (canvas){
      const ctx = canvas.getContext("2d");
      if(ctx == null)
        return;
      ctx.imageSmoothingEnabled = false;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
    } 
    else{
      console.error("Canvas element not found.");
    }
  }

  async delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async FadingColorRectangle(x : any, y : any, width : any, height : any, startingColor:string){
    this.animation = true;
    if(startingColor == "Red"){
      let red = 255;
      while(red > 0){
        this.drawRectangle(x,y,width,height,"rgb("+red+",0,0)")
        red -= 3;
        await this.delay(1)
      }
    }
    else if(startingColor == "Blue"){
      let blue = 255;
      while(blue > 0){
        this.drawRectangle(x,y,width,height,"rgb(0,0,"+blue+")")
        blue -= 3;
        await this.delay(1)
      }
    }
    else if(startingColor == "Green"){
      let Green = 255;
      while(Green > 0){
        this.drawRectangle(x,y,width,height,"rgb(0,"+Green+",0)")
        Green -= 3;
        await this.delay(1)
      }
    }
    this.animation = false;
    this.draw()
  }

  async draw(){
    while(this.animation == true)
      await this.delay(1);
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
        if(this.SLLAsArray[i].new == false)
          this.drawRectangle(space*((i)%(maxPerRow)+1)-rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight, rectangleWidth, rectangleHeight);
        else{
          if(i == 0)
            this.FadingColorRectangle(space*((i)%(maxPerRow)+1)-rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight, rectangleWidth, rectangleHeight, "Red");
          else if(i == this.SLLAsArray.length -1){
            this.FadingColorRectangle(space*((i)%(maxPerRow)+1)-rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight, rectangleWidth, rectangleHeight, "Blue");
          }
          else{
            this.FadingColorRectangle(space*((i)%(maxPerRow)+1)-rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight, rectangleWidth, rectangleHeight, "Green");
          }
          this.SLLAsArray[i].new = false;
        }
      }

      // Impart patratele in 2
      ctx.beginPath();
      for (let i = 0; i < this.SLLAsArray.length; i++){
        ctx.moveTo(space*((i)%(maxPerRow)+1), (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight);
        ctx.lineTo(space*((i)%(maxPerRow)+1), (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight);
        ctx.strokeStyle="Black";
        ctx.stroke();
      }

      // Pun numarul in patrate
      for(let i = 0; i < this.SLLAsArray.length; i++){
        ctx.font = rectangleHeight/2+"px Tahoma";
        ctx.fillText(String(this.SLLAsArray[i].value),  space*((i)%(maxPerRow)+1)-rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + 11*rectangleHeight/16);
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
