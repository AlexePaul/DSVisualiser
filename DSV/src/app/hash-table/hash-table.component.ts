import { Component, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { hashTable } from 'src/shared/models/hashTable';

@Component({
  selector: 'app-hash-table',
  templateUrl: './hash-table.component.html',
  styleUrls: ['./hash-table.component.less']
})
export class HashTableComponent {
  value: number = 0;
  disabled: boolean = false;
  hashTable: hashTable;
  modulo: number = 10;
  animation : boolean = false;
  form: FormGroup;

  hashFunction(value:number) : number{
    return value%this.modulo;
  }

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder){
    this.draw = this.draw.bind(this);
    this.hashFunction = this.hashFunction.bind(this);
    this.hashTable = new hashTable(this.hashFunction,this.modulo, this.draw);
    this.form = this.fb.group({
      InsertValue: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]]
    });
  }
  
  ngOnInit() {
    this.draw(-1, [], "");
    this.form.get('InsertValue')?.valueChanges.subscribe(value => {
      this.value = value ? parseInt(value, 10) : 0;
      this.value = Math.min(this.value, 99999999);
      this.value = Math.max(this.value, -99999999);
    });
  }

  async delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  calculateFontSize(value: number, rectangleWidth: number) {
    var numcif = 0;
    while(value!= 0){
      value= Math.floor(value /10);
      numcif++;
    }
    console.log(rectangleWidth/3 + "-"+numcif*rectangleWidth/48)
    return rectangleWidth/3 - numcif*rectangleWidth/48;
  }

  async fadingRectangle(x : any, y : any, width : any, height : any, startingColor:string = "Black", color:string = ""){
    this.animation = true;
    const canvas = document.getElementById("Canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if(ctx == null)
      return;
    let value = 255;
    while(value > 128){
      ctx.strokeRect(x, y, width, height);
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
      await this.delay(10)
    }
    this.animation = false;
  }

  checkSpecial(special:number[][], i:any, j:any) :number{
    let ans = -1;

    for(let nr of special){
      if(nr[0] == i && nr[1] == j)
        return 1;
    }

    return ans;
  }

  async checkModulo(){

    while(this.animation == true){
      await this.delay(1);
    }

    let maxModulo = Math.floor(window.innerHeight * 15 / 919);
    this.modulo = Math.max(this.modulo, 1);
    this.modulo = Math.min(this.modulo, maxModulo);

    this.hashTable.reset(this.hashFunction, this.modulo);
    console.log(this.hashTable.array);
    this.cdr.detectChanges();
    this.draw(-1, [], "");
  }

  async draw(specialCategoryNumber:number, specialNumbers:number[][], specialColor: string){
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
      if(specialCategoryNumber!=i)
        this.drawRectangle(windowWidth*0.05,(rectangleHeight + 10)*(i+1), rectangleWidth, rectangleHeight, myColor);
      else
        this.drawRectangle(windowWidth*0.05,(rectangleHeight + 10)*(i+1), rectangleWidth, rectangleHeight, "rgb(0,255,0)");  
      ctx.beginPath();
      ctx.moveTo(windowWidth*0.05 + 3 * rectangleWidth/4,(rectangleHeight + 10)*(i+1));
      ctx.lineTo(windowWidth*0.05 + 3 * rectangleWidth/4,(rectangleHeight + 10)*(i+1) + rectangleHeight);
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = this.calculateFontSize(i,rectangleWidth)+"px Tahoma";
      ctx.fillStyle=myColor;
      ctx.fillText(String(i),  windowWidth*0.05 + 3 * rectangleWidth/8,(rectangleHeight + 10)*(i+1) + rectangleHeight/2);  
    }

    for(let i = 0; i < this.modulo; i++){
      let idx = 1;
      for(let j = 0; j < this.hashTable.array[i]?.length; j++){
        if(this.checkSpecial(specialNumbers, i, j) == -1)
          this.drawRectangle(windowWidth*0.05 + (rectangleWidth + 25) * idx,(rectangleHeight + 10)*(i+1), rectangleWidth, rectangleHeight, myColor);
        else
          this.fadingRectangle(windowWidth*0.05 + (rectangleWidth + 25) * idx,(rectangleHeight + 10)*(i+1), rectangleWidth, rectangleHeight, specialColor, myColor);
        ctx.strokeStyle = myColor;
        ctx.beginPath();
        ctx.moveTo(windowWidth*0.05 + (rectangleWidth + 25) * idx + 3 * rectangleWidth/4,(rectangleHeight + 10)*(i+1));
        ctx.lineTo(windowWidth*0.05 + (rectangleWidth + 25) * idx + 3 * rectangleWidth/4,(rectangleHeight + 10)*(i+1) + rectangleHeight);
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = this.calculateFontSize(this.hashTable.array[i][j],rectangleWidth)+"px Tahoma";
        ctx.fillStyle=myColor;
        ctx.fillText(String(this.hashTable.array[i][j]),  windowWidth*0.05 + (rectangleWidth + 25) * idx + 3 * rectangleWidth/8,(rectangleHeight + 10)*(i+1) + rectangleHeight/2);

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
    while(this.animation == true){
      await this.delay(1);
    }
    return new Promise(resolve => setTimeout(resolve, 10));
  }

  async insert(){
    this.disabled = true;
    await this.hashTable.insertValue(this.value);
    this.draw(-1, [], "");
    this.disabled = false;
  }

  async remove(){
    this.disabled = true;
    await this.hashTable.removeValue(this.value)
    this.draw(-1, [],"");
    this.disabled = false;
  }

  async search(){
    this.disabled = true;
    await this.hashTable.searchValue(this.value)
    this.draw(-1, [],"");
    this.disabled = false;
  }
}
