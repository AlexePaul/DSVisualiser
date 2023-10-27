import { nodeSLL } from "./nodeSLL";

export class simpleLinkedList{
    root: nodeSLL | null;

    constructor(root : nodeSLL | null = null) {
        this.root = root;
    }

    insertNode(node : nodeSLL){
        node.next = this.root;
        this.root = node;
    }

    insertValue(value : number){
        let newNode = new nodeSLL(value);
        this.insertNode(newNode);
    }

    removeFirst(){
        if(this.root != null)
            this.root = this.root?.next;
    }

    asArray() : number[] {
        let answear : number[] = [];
        let idx = this.root;

        while(idx != null){
            answear.push(idx.value);
            idx = idx.next;
        }

        return answear;
    }
}