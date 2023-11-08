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

    async delay(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        var pos = this.root;
        var position = 1;
        let speech = new textToSpeech();
        if(pos != null && verbose == true)
            await speech.speakText("I search for the value, if it doesn't exist i create it");
        while(pos != null){
            if(verbose == true)
                await this.draw([position], "Blue");
            if(value > pos.value){
                if(pos.right != null)
                    pos = pos.right;
                else
                    pos.right = new nodeBST(value, pos);
                position = position * 2 + 1;
            }
            else if(value < pos.value){
                if(pos.left != null)
                    pos = pos.left;
                else
                    pos.left = new nodeBST(value, pos);
                position = position*2;
            }
            else
                break;
        }
        if(this.root == null)
            this.root = new nodeBST(value);
        this.size = Math.max(position, this.size);
        if(verbose == true)
            await this.draw([position], "Green");
        console.log(this.array);
    }

    async searchValue(value:number, verbose:boolean = true) : Promise<{node:nodeBST | null, position:number}>{
        var pos = this.root;
        var position = 1;
        var speech = new textToSpeech;
        if(verbose == true)
            await speech.speakText("I go left if my value is smaller than the node i'm on, otherwise right");
        while(pos != null){
            await this.draw([position], "Blue");
            if(value > pos.value){
                if(pos.right != null)
                    pos = pos.right;
                else
                    pos.right = new nodeBST(value, pos);
                position = position * 2 + 1;
            }
            else if(value < pos.value){
                if(pos.left != null)
                    pos = pos.left;
                else
                    pos.left = new nodeBST(value, pos);
                position = position*2;
            }
            else
                return {node:pos, position:position};
                
        }
        return {node:null, position:0};
    }

    async findSuccessor(pair: {node:nodeBST, position: number}) : Promise<{node:nodeBST | null, position:number}>{
        let node = pair.node;
        let position = pair.position;
        node = node.right as any;
        position = position * 2 + 1;
        while(node.left){
            await this.draw([position], "Blue")
            node = node.left as any;
            position = position * 2;
        }
        return {node:node, position:position};
    }

    async removeNode(pair: {node:nodeBST | null, position:number}, verbose:boolean = true){
        var speech = new textToSpeech;
        var node = pair.node;
        if(node == null)
            return;
        if (!node.left && !node.right) {
            if(verbose == true)
                await speech.speakText("The node is a leaf so i just delete it");
            if (node.father) {
                await this.draw([pair.position],"Red");
                if (node === node.father.left) {
                    node.father.left = null;
                } else if (node === node.father.right) {
                    node.father.right = null;
                }
                await this.draw([],"");
            }
        } else if (node.left && node.right) {
            if(verbose == true)
                await speech.speakText("The node has 2 children so i set it's value to the successor");
            const successor = await this.findSuccessor({node:node, position:pair.position});
                await this.draw([pair.position, successor.position], "Green");
            node.value = successor.node?.value as any;
            this.removeNode({node: successor.node, position: successor.position}, false);
            this.draw([],"");
        } else {
            const child = node.left ? node.left : node.right as any;
            await this.draw([pair.position], "Red");
            if(verbose == true)
                await speech.speakText("The node has 1 child so i give it to it's father");
            if (node.father) {
                if (node === node.father.left) {
                    node.father.left = child;
                } else if (node === node.father.right) {
                    node.father.right = child;
                }
                child.father = node.father;
            } else {
                node.value = child.value;
                node.left = child.left;
                node.right = child.right;
            }
            this.draw([],"");
        }
    }

    async removeValue(value:number) : Promise<boolean>{
        var speech = new textToSpeech;
        await speech.speakText("I search for the value");
        const node = await this.searchValue(value, false);
        if(node != null){
            this.removeNode(node);
            return true;
        }
        return false;
    }
}