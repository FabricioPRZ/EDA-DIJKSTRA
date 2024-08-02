import Node from "./Node.mjs";

export default class LinkedList {
    #head;
    #count;

    constructor() {
        this.#head = null;
        this.#count = 0;
    }

    push(node, weight = 1) {
        const newNode = new Node({ node, weight });
        if (!this.#head) {
            this.#head = newNode;
        } else {
            let current = this.#head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.#count++;
    }

    isEmpty() {
        return this.#head === null;
    }

    size() {
        return this.#count;
    }

    indexAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.#head;
            for (let i = 0; i < index && node !== null; i++) {
                node = node.next;
            }
            return node;
        }
        return null;
    }

    print() {
        let current = this.#head;
        let result = '';
        while (current !== null) {
            result += `${current.value.node} (peso: ${current.value.weight}) -> `;
            current = current.next;
        }
        console.log(result);
    }

    get head() {
        return this.#head;
    }
}
