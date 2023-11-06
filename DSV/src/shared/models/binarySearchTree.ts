export class binarySearchTree{
    draw: (specialNumbers: number[], specialColor:string) => void
    size: number = 0;
    array: number[] = [];
    constructor(draw: (specialNumbers: number[], specialColor:string) => void){
        this.draw = draw;
    }

    async insertValue(value:number, verbose:boolean = true){
        var pos = 1;
        while(this.array[pos] != null){
            if(verbose == true)
                await this.draw([pos], "Blue");
            if(value > this.array[pos])
                pos = pos * 2 + 1;
            else if(value < this.array[pos])
                pos = pos*2;
            else
                break;
        }
        this.array[pos] = value;
        this.size = Math.max(pos, this.size);
        await this.draw([pos], "Green");
    }

    async searchValue(value:number) : Promise<boolean>{
        var pos = 1;
        while(this.array[pos] != null){
            await this.draw([pos], "Blue");
            if(value > this.array[pos])
                pos = pos * 2 + 1;
            else if(value < this.array[pos])
                pos = pos*2;
            else{
                await this.draw([pos], "Green");
                return true;
            }
        }
        return false;
    }
}