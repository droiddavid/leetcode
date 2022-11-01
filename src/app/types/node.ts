export class Node {
	
	element: any;
	next!: Node | null;

	//constructor accepts element of type any or null.  Sets this.element to element and this.next to null.
	constructor(element: any) {
		this.element = element;
		this.next = null;
	}
}