import LinkedList from "./LinkedList.mjs";

export default class Graph {
    
    #matrizAdyacencia = [];
    #map = new Map();

    constructor() {}

    addVertex(vertex) {
        if (!this.#map.has(vertex)) {
            this.#matrizAdyacencia.push(new LinkedList());
            this.#map.set(vertex, this.#matrizAdyacencia.length - 1);
            return true;
        }
        return false;
    }

    addEdge(node1, node2, weight = 1) {
        if (this.#map.has(node1) && this.#map.has(node2)) {
            this.#matrizAdyacencia[this.#map.get(node1)].push(node2, weight);
            return true;
        }
        return false;
    }

    dijkstra(startVertex, endVertex) {
        const inf = 1000000;
        const numVertices = this.numVertices();
        let D = [];   
        let lPrima = [];
        let L = []; 
        let V = [];   
    
        for (let i = 0; i < numVertices; i++) {
            D.push(inf);   
            lPrima.push(i);    
            V.push(i);     
        }
    
        const start = this.#map.get(startVertex);
        const end = this.#map.get(endVertex);
    
        D[start] = 0;
    
        while (lPrima.length !== 0) {
            let u = null;
            let minDistance = inf;
    
            for (let i = 0; i < lPrima.length; i++) {
                if (D[lPrima[i]] < minDistance) {
                    minDistance = D[lPrima[i]];
                    u = lPrima[i];
                }
            }
    
            if (u === null) {
                break;
            }
    
            L.push(u);
            lPrima = lPrima.filter(vertex => vertex !== u);
    
            const neighborsLinkedList = this.#matrizAdyacencia[u];
            let current = neighborsLinkedList.head;
    
            while (current) {
                const neighbor = this.#map.get(current.value.node);
                const weight = current.value.weight;
    
                if (lPrima.includes(neighbor) && D[u] + weight < D[neighbor]) {
                    D[neighbor] = D[u] + weight;
                }
                current = current.next;
            }
        }
    
        return D[end];
    }
    
    dfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {};
        const stack = [];
        stack.push(startVertex);

        while (stack.length > 0) {
            const currentVertex = stack.pop(); // Saca el ultimo vertice agregado
            if (!visited[currentVertex]) { // Si no ha sido visitado
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current) {
                    const neighborVertex = current.value.node; // Obtiene el vecino
                    if (!visited[neighborVertex]) {
                        stack.push(neighborVertex); // Agrega el vecino a la pila si no ha sido visitado
                    }
                    current = current.next; // Pasa al siguiente vecino
                }
            }
        }
    }

    bfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {};
        const queue = [];
        queue.push(startVertex);

        while (queue.length > 0) {
            const currentVertex = queue.shift();
            if (!visited[currentVertex]) {
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current) {
                    const neighborVertex = current.value.node; 
                    if (!visited[neighborVertex]) {
                        queue.push(neighborVertex);
                    }
                    current = current.next;
                }
            }
        }
    }

    getVertices() {
        return this.#map.keys();
    }

    numVertices() {
        return this.#map.size;
    }

    numEdges() {
        let numEdges = 0;
        for (let linkedList of this.#matrizAdyacencia) {
            numEdges += linkedList.size();
        }
        return numEdges;
    }
}
