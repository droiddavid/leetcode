import { Node } from './node';

export class LinkedList {
	head!: Node | null;
	length: number = 0;

	constructor(head: Node | null) {
		this.head = head;
	}

	//size()
	size(): number {
		return this.length;
	}


	//clear()
	clear(): void {
		this.head = null;
		this.length = 0;
	}


	//add(element: any)
	add(element: any): void {
		let node = new Node(element);
		let current: Node | null;

		if (this.head == null) {
			this.head = node;
		} else {
			current = this.head;

			while (current!.next) {
				current = current!.next;
			}

			current!.next = node;
		}

		this.length++;
	}


	//remove(element:any)
	remove(element: any): void {
		let current: Node | null = this.head;
		let previous: Node | null = null;

		while (current!.next) {
			if (current!.element === element) {
				if (previous == null) {
					this.head = current!.next;
				} else {
					previous.next = current!.next;
				}
				this.length--;
				return;
			}
			previous = current;
			current = current!.next;
		}

		if (current!.element === element) {
			if (previous == null) {
				this.head = null;
			} else {
				previous.next = null;
			}
			this.length--;
		}
	}


	//isEmpty()
	isEmpty(): boolean {
		return this.length === 0;
	}


	//indexOf(element: any)
	indexOf(element: any): number {
		let current: Node | null = this.head;
		let index: number = -1;

		while (current) {
			index++;
			if (current.element === element) {
				return index;
			}
			current = current.next;
		}

		return -1;
	}


	//elementAt(index: number)
	elementAt(index: number): any {
		let current: Node | null = this.head;
		let count: number = 0;

		while (count < index) {
			count++;
			current = current!.next;
		}

		return current!.element;
	}


	//getNodeAt(index: number)
	getNodeAt(index: number) {
		let current = this.head;
		let count = 0;

		while (count < index) {
			count++;
			current = current!.next;
		}

		return current;
	}


	//addAt(index: number, element: any)
	addAt(index: number, element: any): void {
		let node = new Node(element);
		
		let current: Node | null = this.head;
		let previous: Node | null;
		let currentIndex: number = 0;

		if (index > this.length) {
			return;
		}

		if (index === 0) {
			node.next = current;
			this.head = node;
		} else {
			while (currentIndex < index) {
				currentIndex++;
				previous = current;
				current = current!.next;
			}
			node.next = current;
			previous!.next = node;
		}

		this.length++;
	}


	//removeAt(index: number)
	removeAt(index: number): any {
		let current: Node | null = this.head;
		let previous: Node | null;
		let currentIndex: number = 0;

		if (index < 0 || index >= this.length) {
			return null;
		}

		if (index === 0) {
			this.head = current!.next;
		} else {
			while (currentIndex < index) {
				currentIndex++;
				previous = current;
				current = current!.next;
			}

			previous!.next = current!.next;
		}

		this.length--;

		return current!.element;
	}


	//first()
	first(): any {
		return this.head!.element;
	}


	//last()
	last(): any {
		let current: Node | null = this.head;

		while (current!.next) {
			current = current!.next;
		}

		return current!.element;
	}

	
	reverse() {
		let current = this.head;
		let previous = null;

		while(current !== null) {
			let next = current.next;
			current.next = previous;
			previous = current;
			current = next;
		}
		return previous;
	}


	print() {
		let current = this.head;
		let value = '';

		while(current !== null) {
			value += current.element + ' ';

			current = current.next;
		}
		console.log(value);
	}


	//Convert a linked list to an array
	linkedListToArray(head:any) {
		let values = [];
		let current = head;
	
		while (current !== null) {
			//if current's element is a Node, then push the element's element to the array
			if (current.element instanceof Node) {
				values.push(current.element.element);
			} else {
				values.push(current.element);
			}
			current = current.next;
		}
		
		return values;
	}

	//convert an array to a linked list
	arrayToLinkedList(array: any[]) {
		let list = new LinkedList(null);
				
		for (let i = 0; i < array.length; i++) {
			list.add(array[i]);
		}

		return list;
	}
}