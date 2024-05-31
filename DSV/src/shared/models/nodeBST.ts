export class nodeBST{
    value:number = 0;
    father:nodeBST | null = null;
    left:nodeBST | null = null;
    right:nodeBST | null = null;

    constructor(value : number = 0, father : nodeBST | null = null){
        this.value = value;
        this.father = father;
    }
}