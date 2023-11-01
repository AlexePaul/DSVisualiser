export class binaryHeap{
    array: number[] = [];
    minimum: boolean;
    size : number = 0;
    draw: (specialNumbers: number[], specialColor:string) => void

    constructor(minimum : boolean = true, draw:any){
        this.minimum = minimum;
        this.draw = draw;
    }

    async delay(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async insertValue(value: number){
        // Insert the new value at the end of a the array (If the heap structure is broken, we will need to repair it)
        this.size++;
        this.array[this.size] =  value;

        await this.draw([this.size], "Blue");
        
        //will use this in order to make it work for both a min heap and a max heap
        var term = 1;
        if(this.minimum == false)
            term = -1;
        
        //repair

        var position = this.size;
        while(position != 1 && this.array[Math.floor(position/2)]*term > this.array[position]*term){
            // if the position i'm on is smaller than it's father, i need to swap them
            [this.array[Math.floor(position/2)], this.array[position]] = [this.array[position], this.array[Math.floor(position/2)]]; 
            await this.draw([position, Math.floor(position/2)], "Green");
            position = Math.floor(position/2);
        }
    }

    async removeRoot(){
        var rootValue = this.array[1];

        [this.array[1], this.array[this.size]] = [this.array[this.size],this.array[1]];
        await this.draw([1,this.size], "Green");
        await this.delay(10);
        await this.draw([this.size], "Red");
        await this.delay(10);
        this.size--;
        let position = 1;
        var term = 1;
        if(this.minimum == false)
            term = -1;

        while(position <= this.size){
            if(position*2+1 <=this.size){
                if(this.array[position]*term > Math.min(this.array[position*2]*term, this.array[position*2+1]*term)){
                    if(this.array[position*2]*term < this.array[position*2+1]*term){
                        [this.array[position],this.array[position*2]] = [this.array[position*2], this.array[position]];
                        await this.draw([position,position*2], "Green");
                        position *= 2; 
                        continue;
                    }   
                    else{
                        [this.array[position],this.array[position*2 + 1]] = [this.array[position*2 + 1], this.array[position]];
                        await this.draw([position,position*2 + 1], "Green");
                        position = position * 2 + 1; 
                        continue;
                    }
                }
            }
            else if(position*2 <=this.size && this.array[position] * term > this.array[position*2]*term){
                [this.array[position],this.array[position*2]] = [this.array[position*2], this.array[position]];
                position *= 2; 
                continue;
            }
            else break;
            if(this.array[position]*term <= Math.min(this.array[position*2]*term, this.array[position*2+1]*term))
                break;
        }
        return rootValue;
    }

}