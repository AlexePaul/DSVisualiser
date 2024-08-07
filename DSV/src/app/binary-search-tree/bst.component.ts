import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { binarySearchTree } from 'src/shared/models/binarySearchTree';
@Component({
  selector: 'app-bst',
  templateUrl: './bst.component.html',
  styleUrls: ['./bst.component.less']
})
export class BstComponent {
  value : number = 0;
  bst: binarySearchTree;
  tooMuch: number = 0;
  animation: boolean = false;
  stopAnimation: boolean = false;
  disabled: boolean = false;
  numberList: string = "";
  position:[number,number,number][] = [];
  printedNumbers: number[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder){
    this.draw = this.draw.bind(this);
    this.bst = new binarySearchTree(this.draw);
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

  drawLines(circleRadius : any){
    const canvas = document.getElementById("Canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    if(ctx == null)
      return;

    let numberOfNodes = 1;
    let size = this.bst.size;
    let step = 0;
    let counter = 1;

    while(size > 0){
      let space = Math.floor(windowWidth / (numberOfNodes*2));
      for(var i = 0; i < Math.min(numberOfNodes,size); i++){
        if(i == 0){
          if(counter*2 <= this.bst.size && this.bst.array[counter*2] != null){
            var cspace = Math.floor(windowWidth / (numberOfNodes*4));
            ctx.beginPath();
            ctx.moveTo(space, 150*(step+1)+circleRadius);
            ctx.lineTo(cspace, 150*(step+2)-circleRadius);
            ctx.stroke();
          }13
          if(counter*2 + 1 <= this.bst.size && this.bst.array[counter*2 + 1] != null){
            var cspace = Math.floor(windowWidth / (numberOfNodes*4));
            ctx.beginPath();
            ctx.moveTo(space, 150*(step+1)+circleRadius);
            ctx.lineTo(cspace + 2*cspace*(i+1), 150*(step+2)-circleRadius);
            ctx.stroke();
          }
        }
        else{
          if(counter*2 <= this.bst.size && this.bst.array[counter*2] != null){
            var cspace = Math.floor(windowWidth / (numberOfNodes*4));
            var positionNextLine = counter*2 - numberOfNodes*2;
            ctx.beginPath();
            ctx.moveTo(space + 2*space*i, 150*(step+1)+circleRadius);
            ctx.lineTo(cspace + 2*cspace*(positionNextLine), 150*(step+2)-circleRadius);
            ctx.stroke();
          }
          if(counter*2 + 1 <= this.bst.size && this.bst.array[counter*2 + 1] != null){
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

  printNumbers() {
        const canvas = document.getElementById("Canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        if(ctx == null)
         return new Promise(resolve => setTimeout(resolve, 10));

        canvas.width = windowWidth;
        canvas.height = windowHeight;

        ctx.font = "40px Tahoma";
        ctx.fillStyle = "black";
        ctx.textBaseline = "bottom";

        var toPrint: string = "";
        this.printedNumbers.forEach((number, index) => {
            toPrint = toPrint.concat(number.toString());
            toPrint = toPrint.concat(" ");
        });
        
        ctx.fillText(toPrint, 10, windowHeight-10);

        return new Promise(resolve => setTimeout(resolve, 10));
    }

  async draw(specialNumbers:number[], specialColor: string, placeNumber:number | null){
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
    var size = this.bst.size;  
    var step = 0;
    var counter = 1;
    var circleRadius = 24 * windowWidth / 1080;
    if(ctx == null)
    return new Promise(resolve => setTimeout(resolve, 10));
    
    ctx.canvas.width  = windowWidth;
    ctx.canvas.height = windowHeight;

    if(placeNumber != null)
      this.printedNumbers.push(placeNumber);
    this.printNumbers();

    while(size > 0){
      var space = Math.floor(windowWidth / (numberOfNodes*2));
      for(var i = 0; i < Math.min(numberOfNodes,size); i++){
        if(this.bst.array[counter] != null){
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
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";  
              ctx.font = this.calculateFontSize(this.bst.array[counter], circleRadius)+"px Tahoma";
              ctx.fillStyle = myColor;
              ctx.fillText(String(this.bst.array[counter++]),space,150*(step+1));
            }
            else{
              ctx.textAlign = "center";
              ctx.textBaseline = "middle"; 
              ctx.font = this.calculateFontSize(this.bst.array[counter], circleRadius)+"px Tahoma";
              ctx.fillStyle = myColor;
              ctx.fillText(String(this.bst.array[counter++]),space + 2*space*i,150*(step+1));
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
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.font = this.calculateFontSize(this.bst.array[counter], circleRadius)+"px Tahoma";
              ctx.fillStyle = myColor;
              ctx.fillText(String(this.bst.array[counter++]),space,150*(step+1));
            }
            else{
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.font = this.calculateFontSize(this.bst.array[counter], circleRadius)+"px Tahoma";
              ctx.fillStyle = myColor;
              ctx.fillText(String(this.bst.array[counter++]),space + 2*space*i,150*(step+1));
            }
          }
          ctx.strokeStyle=myColor;
      }
      else{
        counter++;
      }
      }
        step++;
        size -= numberOfNodes;
        numberOfNodes *= 2;
    }
    this.drawLines(circleRadius);

    while(this.animation == true){
      await this.delay(1);
    }
    return new Promise(resolve => setTimeout(resolve, 10));
  }

  calculateFontSize(value: any, circleRadius: any) {
    var numcif = 0;
    while(value!= 0){
      if(value > 0)
        value = Math.floor(value / 10);
      else
        value = Math.ceil(value / 10);
      numcif++;
    }
    return circleRadius - numcif*circleRadius/14;
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
    console.log("inserting: " + this.value + "\nmaxAmount is: " + maxAmount+ "\nsize is: " + this.bst.size);
    if(this.bst.simulateInsertion(this.value) < maxAmount){
      await this.bst.insertValue(this.value);
      if(this.bst.size == maxAmount)
        this.tooMuch = 0.5;
    }
    else if(this.bst.simulateInsertion(this.value) == maxAmount && this.tooMuch == 0)
      this.tooMuch = 0.5;
    else
      this.tooMuch = 1;
    this.draw([], "", null);
    this.disabled = false;
  }
  async remove(){
    this.disabled = true;
    await this.bst.removeValue(this.value);
    this.tooMuch = 0;
    this.draw([], "", null);
    this.disabled = false;
  }

  async search(){
    this.disabled = true;
    await this.bst.searchValue(this.value);
    this.draw([], "", null);
    this.disabled = false;
  }

  checkString(string : any) {
    return /^-?\d+(\.\d+)?$/.test(string);
  }

  async insertValue(value: number, verbose: boolean){
    this.disabled = true;
    let maxAmount = Math.max(31 * window.innerWidth / 1920,31 * window.innerHeight / 1080);
    while(this.only1binary(maxAmount) == false)
      maxAmount--;
    if(this.bst.simulateInsertion(value) < maxAmount+1){
      await this.bst.insertValue(value, verbose);
      if(this.bst.size == maxAmount)
        this.tooMuch = 0.5;
    }
    else if(this.bst.simulateInsertion(value) == maxAmount+1 && this.tooMuch == 0)
      this.tooMuch = 0.5;
    else
      this.tooMuch = 1;
    this.draw([], "", null);
    this.disabled = false;
  }

  async insertArrayOrdered(values : number[], idxlft : number, idxrt : number){
    if(idxlft > idxrt)
      return;
    let middle = Math.floor((idxlft+idxrt) /2);
    this.insertValue(values[middle], false);
    this.insertArrayOrdered(values, idxlft, middle-1);
    this.insertArrayOrdered(values, middle+1, idxrt);
  }

  async insertArray(){
    this.disabled = true;
    const values = this.numberList.split(/,| /);
    let checkedValues = [];
    for (let value of values){
        if(this.checkString(value))
          checkedValues.push(parseInt(value));
    }
    await this.bst.clear();
    checkedValues.sort((a,b)=>a-b);
    await this.insertArrayOrdered(checkedValues, 0 , checkedValues.length - 1);
    this.disabled = false;
  }

  async inOrderTraversal(){
    await this.bst.inOrderTraversal(this.bst.root, 1);
    this.printedNumbers = [];
    this.draw([], '', null)
  }
}
