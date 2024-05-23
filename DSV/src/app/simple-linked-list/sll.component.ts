import { Component } from '@angular/core';
import { simpleLinkedList } from 'src/shared/models/simpleLinkedList';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sll',
  templateUrl: './sll.component.html',
  styleUrls: ['./sll.component.less']
})
export class SllComponent {
  SLL: simpleLinkedList = new simpleLinkedList();
  value: number = 0;
  stopAnimation: boolean = false;
  position:[number,number,number,number,string, number][] = [];
  clicked: boolean = false;
  form: FormGroup;

  get SLLAsArray(){
    return this.SLL.asArray();
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      InsertValue: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]]
    });
  }

  ngOnInit(){
    this.form.get('InsertValue')?.valueChanges.subscribe(value => {
      this.value = value ? parseInt(value, 10) : 0;
      this.value = Math.min(this.value, 99999999);
      this.value = Math.max(this.value, -99999999);
    });
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

  calculateFontSize(value: number, rectangleWidth: number) {
    var numcif = 0;
    while(value!= 0){
      value= Math.floor(value /10);
      numcif++;
    }
    return rectangleWidth/3 - numcif*rectangleWidth/48;
  }

  async update(){

  }

  async FadingColorRectangle(i:any, color:string = ""){
    let startingColor = this.position[i][4]; 
    let startingSize = this.position[i][5];
    let value = 255;
    while(value > 0){
      let x = this.position[i][0];
      let y = this.position[i][1];
      let width = this.position[i][2];
      let height = this.position[i][3];

      if(this.stopAnimation == true || this.position[i][5] > startingSize){
        return;
      }
      console.log(color)
      if(color == "rgb(255,255,255)"){
        if(startingColor == "Red")
          this.drawRectangle(x,y,width,height,"rgb("+255+","+(255-value)+","+(255-value)+")")
        else if(startingColor == "Blue")
          this.drawRectangle(x,y,width,height,"rgb("+(255-value)+","+(255-value)+","+255+")")
        else
          this.drawRectangle(x,y,width,height,"rgb("+(255-value)+","+255+","+(255-value)+")")
      }
      else{
        if(startingColor == "Red")
        this.drawRectangle(x,y,width,height,"rgb("+value+",0,0)")
      else if(startingColor == "Blue")
        this.drawRectangle(x,y,width,height,"rgb(0,0,"+value+")")
      else
        this.drawRectangle(x,y,width,height,"rgb(0,"+value+",0)")
      }
      value -= 2;
        await this.delay(1)
    }
    this.draw()
  }

  async draw(){
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var myColor = "rgb(0,0,0)"
    if(prefersDarkMode)
      myColor = "rgb(255,255,255)"
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
      // Aleg dimensiunile/numarul de patrate in functie aplicand regula de 3 simpla
      // avand niste dimensiuni subiective pentru 1920x1080, generez dimensiunile pentru orice rezolutie.

      var space = windowWidth/ Math.min((this.SLLAsArray.length + 1), Math.ceil(windowWidth*9/1920)+1);
      var rectangleHeight = (windowHeight*100)/1080;
      var rectangleWidth = (windowWidth*150)/1920;
      var maxPerRow = Math.ceil(windowWidth*9/1920);
      
      if(windowHeight > windowWidth){
        [rectangleHeight, rectangleWidth] = [rectangleWidth, rectangleHeight];
      }


      // Desenez patratele
      for (let i = 0; i < this.SLLAsArray.length; i++){
        this.position[i] = [space*((i)%(maxPerRow)+1)-rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight, rectangleWidth, rectangleHeight, "", this.SLLAsArray.length];
        if(this.SLLAsArray[i].new == false)
          this.drawRectangle(this.position[i][0],this.position[i][1], this.position[i][2], this.position[i][3],myColor);
        else{
          if(i == 0){
            this.position[i][4] = "Red";
            this.FadingColorRectangle(i, myColor);
          }
          else if(i == this.SLLAsArray.length -1){
            this.position[i][4] = "Blue";
            this.FadingColorRectangle(i, myColor);
          }
          else{
            this.position[i][4] = "Green";
            this.FadingColorRectangle(i, myColor);
          }
          this.SLLAsArray[i].new = false;
        }
      }

      // Impart patratele in 2
      ctx.beginPath();
      for (let i = 0; i < this.SLLAsArray.length; i++){
        ctx.moveTo(space*((i)%(maxPerRow)+1)+ rectangleWidth/4, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight);
        ctx.lineTo(space*((i)%(maxPerRow)+1)+ rectangleWidth/4, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight);
        ctx.strokeStyle=myColor;
        ctx.stroke();
      }

      // Pun numarul in patrate
      for(let i = 0; i < this.SLLAsArray.length; i++){
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; 
        ctx.font = this.calculateFontSize(this.SLLAsArray[i].value, rectangleWidth)+"px Tahoma";
        ctx.fillStyle=myColor;
        ctx.fillText(String(this.SLLAsArray[i].value),  space*((i)%(maxPerRow)+1) - rectangleWidth/8, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight/2);
      }

      //desenez sagetile
      for(let i = 0; i < this.SLLAsArray.length-1; i++){
        if((i+1)%maxPerRow){
          ctx.beginPath();
          ctx.moveTo(space*((i)%(maxPerRow)+1) + 3*rectangleWidth/8, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight/2);
          ctx.lineTo(space*((i)%(maxPerRow)+2) - rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight/2);
          ctx.stroke();
          ctx.beginPath();
          ctx.lineTo(space*((i)%(maxPerRow)+2) - rectangleWidth/2 - rectangleHeight/4, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight/4);
          ctx.lineTo(space*((i)%(maxPerRow)+2) - rectangleWidth/2 - rectangleHeight/4, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + 3*rectangleHeight/4);
          ctx.lineTo(space*((i)%(maxPerRow)+2) - rectangleWidth/2, (1 + Math.floor((i)/(maxPerRow)))*40+Math.floor((i)/(maxPerRow))*rectangleHeight + rectangleHeight/2);
          ctx.fillStyle=myColor;
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

  async removeFirst(){
    this.stopAnimation = true;
    await this.delay(3);
    this.SLL.removeFirst();
    this.stopAnimation = false;
    this.draw();
  }

  async removeBack(){
    this.stopAnimation = true;
    await this.delay(3);
    this.SLL.removeBack();
    this.stopAnimation = false;
    this.draw();
  }

  checkValue(){
    const strValue = this.value.toString();

    const correctedValue = strValue.replace(/\D/g, '').slice(0, 10);
    
     if (correctedValue === "") {
        this.value = 0;
    }
    
    this.value = parseInt(correctedValue, 10);
  }

}
