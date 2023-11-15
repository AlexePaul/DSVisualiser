import { Component } from '@angular/core';
import { hashTable } from 'src/shared/models/hashTable';

@Component({
  selector: 'app-hash-table',
  templateUrl: './hash-table.component.html',
  styleUrls: ['./hash-table.component.less']
})
export class HashTableComponent {
  valueInsert: number = 0;
  disabled: boolean = false;
  hashTable: hashTable;
  modulo: number = 10;
  
  hashFunction(value:number) : number{
    return value%this.modulo;
  }

  constructor(){
    this.draw = this.draw.bind(this);
    this.hashFunction = this.hashFunction.bind(this);
    this.hashTable = new hashTable(this.hashFunction,this.modulo);
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

  async draw(specialNumbers:number[], specialColor: string){
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var myColor = "rgb(0,0,0)"
    if(prefersDarkMode)
      myColor = "rgb(255,255,255)"
    const canvas = document.getElementById("Canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var rectangleHeight = (windowHeight*50)/1080;
    var rectangleWidth = (windowWidth*100)/1920;
    
    if(rectangleHeight > rectangleWidth)
      [rectangleHeight, rectangleWidth] = [rectangleWidth, rectangleHeight];

    if(ctx == null)
      return;

    ctx.canvas.width  = windowWidth;
    ctx.canvas.height = windowHeight;  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = myColor;
    for(let i = 0; i < this.modulo; i++){
      this.drawRectangle(windowWidth*0.05,(rectangleHeight + 10)*(i+1), rectangleWidth, rectangleHeight, myColor);
      ctx.beginPath();
      ctx.moveTo(windowWidth*0.05 + 3 * rectangleWidth/4,(rectangleHeight + 10)*(i+1));
      ctx.lineTo(windowWidth*0.05 + 3 * rectangleWidth/4,(rectangleHeight + 10)*(i+1) + rectangleHeight);
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = rectangleHeight/3+"px Tahoma";
      ctx.fillStyle=myColor;
      ctx.fillText(String(i),  windowWidth*0.05 + 3 * rectangleWidth/8,(rectangleHeight + 10)*(i+1) + rectangleHeight/2);  
    }

    for(let i = 0; i < this.modulo; i++){
      let idx = 1;
      for(let item of this.hashTable.array[i]){
        this.drawRectangle(windowWidth*0.05 + (rectangleWidth + 25) * idx,(rectangleHeight + 10)*(i+1), rectangleWidth, rectangleHeight, myColor);
        ctx.beginPath();
        ctx.moveTo(windowWidth*0.05 + (rectangleWidth + 25) * idx + 3 * rectangleWidth/4,(rectangleHeight + 10)*(i+1));
        ctx.lineTo(windowWidth*0.05 + (rectangleWidth + 25) * idx + 3 * rectangleWidth/4,(rectangleHeight + 10)*(i+1) + rectangleHeight);
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = rectangleHeight/3+"px Tahoma";
        ctx.fillStyle=myColor;
        ctx.fillText(String(item),  windowWidth*0.05 + (rectangleWidth + 25) * idx + 3 * rectangleWidth/8,(rectangleHeight + 10)*(i+1) + rectangleHeight/2);

        ctx.beginPath();
        ctx.moveTo(windowWidth*0.05 + (rectangleWidth + 25) * (idx-1) + 7 * rectangleWidth/8,(rectangleHeight + 10)*(i+1) + rectangleHeight/2);
        ctx.lineTo(windowWidth*0.05 + (rectangleWidth + 25) * (idx),(rectangleHeight + 10)*(i+1) + rectangleHeight/2); 
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(windowWidth*0.05 + (rectangleWidth + 25) * (idx),(rectangleHeight + 10)*(i+1) + rectangleHeight/2)
        ctx.lineTo(windowWidth*0.05 + (rectangleWidth + 25) * (idx) - rectangleHeight/4,(rectangleHeight + 10)*(i+1) + rectangleHeight/4)
        ctx.lineTo(windowWidth*0.05 + (rectangleWidth + 25) * (idx) - rectangleHeight/4,(rectangleHeight + 10)*(i+1) + 3*rectangleHeight/4)
        ctx.fill();
        idx++;
      }
    }

  }

  insert(){
    this.hashTable.insertValue(this.valueInsert);
    this.draw([], "");
  }
}
