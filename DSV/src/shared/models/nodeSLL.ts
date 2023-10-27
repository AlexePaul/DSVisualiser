export class nodeSLL{
    value : number = 0;
    next : nodeSLL | null = null;

    constructor(value:number, next:nodeSLL|null = null){
        this.value = value;
        this.next = next;
    }
};