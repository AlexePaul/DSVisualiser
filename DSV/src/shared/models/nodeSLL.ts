export class nodeSLL{
    value : number = 0;
    next : nodeSLL | null = null;
    new : boolean = true; //this is used for animations
    constructor(value:number, next:nodeSLL|null = null){
        this.value = value;
        this.next = next;
    }
};