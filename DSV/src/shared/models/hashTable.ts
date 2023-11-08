export class hashTable{
    array: [number[]] = [[]];
    hashFunction: (value:number) => number;
    maxValue: number = 0;

    constructor(hashFunction: (value:number) => number, maxValue:number){
        this.hashFunction = hashFunction;
        this.maxValue = maxValue;
        for(let i = 0; i < maxValue; i++){
            this.array[i] = [];
        }
    }

    insertValue(value:number){
        const position = this.hashFunction(value);
        console.log(position);
        if(this.array[position].indexOf(value) == -1)
        this.array[position].push(value);
    }

}