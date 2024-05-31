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

    insertNodeBack(node : nodeSLL){
        let idx = this.root;

        while(idx != null){
            if(idx.next == null)
                break;
            idx = idx.next;
        }

        if(idx != null)idx.next = node;
        else this.root = node;
    }

    insertValueBack(value : number){
        let newNode = new nodeSLL(value);
        this.insertNodeBack(newNode);
    }

    removeFirst(){
        if(this.root != null)
            this.root = this.root?.next;
    }

    removeBack(){
        let idx = this.root;
        if(idx?.next == null){
            this.root = null;
            return;
        }
        while(idx != null){
            if(idx.next != null && idx.next.next == null)
                break;
            idx = idx.next;
        }
        
        if(idx != null)
            idx.next = null;

    }

    asArray() : nodeSLL[] {
        let answear : nodeSLL[] = [];
        let idx = this.root;

        while(idx != null){
            answear.push(idx);
            idx = idx.next;
        }

        return answear;
    }
}