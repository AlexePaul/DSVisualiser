import { nodeBST } from "./nodeBST";
import { textToSpeech } from "./textToSpeech";

export class binarySearchTree{
    draw: (specialNumbers: number[], specialColor:string) => void
    size: number = 0;
    root: nodeBST|null = null;

    constructor(draw: (specialNumbers: number[], specialColor:string) => void){
        this.draw = draw;
    }

    getArray(position:number, root : nodeBST, obj:{arr:number[]}) {
        obj.arr[position] = root?.value as any;
        obj.arr[position*2] = root?.left?.value as any;
        obj.arr[position*2 + 1] = root?.right?.value as any;
        if(root?.left != null)
            this.getArray(position*2, root.left as any, obj);
        if(root?.right != null)
            this.getArray(position*2 + 1, root.right as any, obj);
    }

    get array(){
        var arr : { arr: number[] } = { arr: [] }
        this.getArray(1, this.root as any, arr);
        return arr.arr;
    }

    simulateInsertion(value: number) : number{
        var pos = 1;
        while(this.array[pos] != null){
            if(value > this.array[pos])
                pos = pos * 2 + 1;
            else if(value < this.array[pos])
                pos = pos*2;
            else
                break;
        }
        return pos;
    }

    async insertValue(value:number, verbose:boolean = true){
        var pos = 1;
        let speech = new textToSpeech();
        console.log("here");
        if(this.array[pos] != null)
            await speech.speakText("If the insertValue is smaller than the current position i go left, otherwise right");
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
        await speech.speakText("I found the position where the value should be");
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

/*
*   ToDo:
*       ->removeValue doesn't care aout children. Must take into account
*       ->Add TTS 
*/
    async removeValue(value:number){

        var pos = 1;
        while(this.array[pos] != null){
            await this.draw([pos], "Blue");
            if(value > this.array[pos])
                pos = pos * 2 + 1;
            else if(value < this.array[pos])
                pos = pos*2;
            else{
                await this.draw([pos], "Red");
                this.array[pos] = null as any;
            }
        }
    }
}