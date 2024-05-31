export class hashTable{
    array: [number[]] = [[]];
    hashFunction: (value:number) => number;
    maxValue: number = 0;
    draw: (specialCategoryNumber:number, specialNumbers: number[][], specialColor:string) => void

    constructor(hashFunction: (value:number) => number, maxValue:number, draw: (specialCategoryNumber:number, specialNumbers: number[][], specialColor:string) => void){
        this.hashFunction = hashFunction;
        this.maxValue = maxValue;
        this.draw = draw;
        for(let i = 0; i < maxValue; i++){
            this.array[i] = [];
        }
    }

    async insertValue(value:number){
        const position = this.hashFunction(value);
        if(this.array[position].indexOf(value) == -1){
            this.array[position].push(value);
            await this.draw(position, [[position,this.array[position].indexOf(value)]], "Blue");
        }
    }

    async removeValue(value:number){
        const hashValue = this.hashFunction(value);
        const position = this.array[hashValue].indexOf(value);
        if(position == -1)
            return;
        await this.draw(hashValue, [[hashValue, position]], "Red");
        for(let i = position; i < this.array[hashValue].length; i++){
            this.array[hashValue][i] = this.array[hashValue][i+1];
        }
        //this.array[hashValue][this.array[hashValue].length-1] = null;
        this.array[hashValue].length--;
    }

    async searchValue(value:number){
        const hashValue = this.hashFunction(value);
        const position = this.array[hashValue].indexOf(value);
        if(position == -1)
            return;
        await this.draw(hashValue, [[hashValue, position]], "Green");
    }

    reset(hashFunction: (value:number) => number, maxValue:number){
        for(let i = 0; i < this.array.length; i++)
            while (this.array.length > 0) {
                this.array.pop();
            }
        this.hashFunction = hashFunction;
        this.maxValue = maxValue;
        for(let i = 0; i < maxValue; i++){
            this.array[i] = [];
        }
    }

}