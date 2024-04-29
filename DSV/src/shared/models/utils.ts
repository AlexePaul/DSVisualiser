export class utils{
    static calculateFontSize(value: number, rectangleHeight: number) {
      var numcif = 0;
      while(value!= 0){
        value= Math.floor(value /10);
        numcif++;
      }
      console.log(rectangleHeight*3/4+ "-"+numcif)
      return rectangleHeight*3/4 - numcif*rectangleHeight/24;
    }
}