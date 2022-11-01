import { LinkedList } from './../../types/linked-list';
import { Component, OnInit } from '@angular/core';
import { Node } from 'src/app/types/node';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

	head:any;
	size: number = 0;
	previous: any;

	constructor() { }

	ngOnInit(): void {
	}

	_cyclicRotation() {
		let A: number[] = [1,2,3,4];
		let K: number = 4;
		this.cyclicRotation(A, K);
	}
	cyclicRotation(A: number[], K: number) {
		//if each element of A is not an integer between -1000 and 1000, return.
		for (let i = 0; i < A.length; i++) {
			if (A[i] < -1000 || A[i] > 1000) {
				return;
			}
		let result: number[] = [];
		let length = A.length;
		let index = 0;

		for (let i = 0; i < length; i++) {
			index = (i + K) % length;
			result[index] = A[i];
		}

		console.log(result);
	}

	solution() {
		class Node {
			element: any;
			next!: any;

			constructor(element: any) {
				this.element = element;
				this.next = null;
			}
		}

		class LinkedList {

			head!: Node | null;
			current!: Node | null;
			previous!: Node | null;
			size: number = 0;

			constructor(head:any) {
				if (!this.head && this.size === 0) {
					this.current = null;
					this.head = head;
					this.previous = null;
					this.size++;
				}
			}

			//add(element:any)
			add(element: any): void {
				this.current = this.head;

				if(this.head === null && this.size === 0) {
					this.head = new Node(element);
					this.size++;
				} else {
					while(this.current!.next) {
						this.current = this.current!.next;
					}
					this.current!.next = new Node(element);
					this.size++;
				}
			}

			//reverse()
			reverse(): void {
				this.current = this.head;
				let next: any;
				let previous: any = null;

				while(this.current) {
					next = this.current.next;
					this.current.next = previous;
					previous = this.current;
					this.current = next;
				}
				this.head = previous;
			}

			//linkedList2Array()
			linkedList2Array(): any[] {
				let array: any[] = [];
				this.current = this.head;

				while(this.current) {
					array.push(this.current.element);
					this.current = this.current.next;
				}
				return array;
			}

			//array2LinkedList(array:any[])
			array2LinkedList(array: any[]): LinkedList {
				let linkedList = new LinkedList(null);
				if(array.length === 0) { return linkedList
				} else {
					for(let i = 0; i < array.length; i++) {
						if (i === 0) {
							linkedList.head = new Node(array[i]);
							linkedList.size++;
						} else {
							linkedList.current = linkedList.head;

							while(linkedList.current!.next) {
								linkedList.current = linkedList.current!.next;
							}
							linkedList.current!.next = new Node(array[i]);
							linkedList.size++;
						}
					}
				}
				return linkedList;
			}



			print(): void {
				let printstring = '';
				this.current = this.head;
				while(this.current) {
					printstring += this.current.element + '';
					this.current = this.current.next;
				}
				console.log(printstring);
			}
		}

		let node1:any = new Node(9);
		let list = new LinkedList(node1);
		list.add(9);
		list.add(9);
		list.add(9);
		list.add(9);
		list.add(9);
		list.add(9);
		

		let node2:any = new Node(9);
		let list2 = new LinkedList(node2);
		list2.add(9);
		list2.add(9);
		list2.add(9);


		list.print();
		list2.print();
		
		list.reverse();
		list2.reverse();

		console.log("---- REVERSED ----")
		list.print();
		list2.print();

		let array1 = list.linkedList2Array();
		let array2 = list2.linkedList2Array();

		let sum = parseInt(array1.join('')) + parseInt(array2.join(''));
		let sumArray = sum.toString().split('').reverse();

		let sumLinkedList = list.array2LinkedList(sumArray);
		sumLinkedList.print();
		//console.log(sum);


		let a3 = [2, 4, 3];
		let a4 = [5, 6, 4];
		let l3 = list.array2LinkedList(a3);
		let l4 = list.array2LinkedList(a4);
		l3.print();
		l4.print();

	}


	/*
		two non-empty linked lists representing two non-negative integers. 
		The digits are stored in reverse order, and each of their nodes contains 
		a single digit. Add the two numbers and return the sum as a linked list.
		Use typescript to solve this problem.
	*/
	reverseThenSumLinkedList() {
		let list1 = new LinkedList(new Node(2));
		list1.add(new Node(4));
		list1.add(new Node(3));

		let list2 = new LinkedList(new Node(5));
		list2.add(new Node(6));
		list2.add(new Node(4));

		let reversedList1 = new LinkedList(null);
		let reversedList2 = new LinkedList(null);

		//reverse the list and add each reversed element to the reversedList
		while (list1.head) {
			let node = list1.head;
			list1.head = list1.head.next;
			node.next = reversedList1.head;
			reversedList1.head = node;
		}

		//reverse the list and add each reversed element to the reversedList
		while (list2.head) {
			let node = list2.head;
			list2.head = list2.head.next;
			node.next = reversedList2.head;
			reversedList2.head = node;
		}

		let sum = 0;
		let carry = 0;
		let result = new LinkedList(null);

		//add the two reversed lists
		while (reversedList1.head || reversedList2.head) {
			let node1 = reversedList1.head;
			let node2 = reversedList2.head;
			let node = new Node(0);

			if (node1) {
				sum += node1.element.element;
				reversedList1.head = reversedList1.head!.next;
			}

			if (node2) {
				sum += node2.element.element;
				reversedList2.head = reversedList2.head!.next;
			}


			sum += carry;

			if (sum >= 10) {
				carry = 1;
				sum = sum - 10;
			} else {
				carry = 0;
			}


			node.element = sum;
			node.next = result.head;
			result.head = node;

			sum = 0;
		}

		if (carry > 0) {
			let node = new Node(carry);
			node.next = result.head;
			result.head = node;
		}

		//print the reversed list
		while (result.head) {
			console.table(result.head.element);
			result.head = result.head.next;
		}
	}


	reverseThenSumLinkedListByDavid() {
		let topList = new LinkedList(new Node(9));
		topList.add(new Node(9));
		topList.add(new Node(9));
		topList.add(new Node(9));
		topList.add(new Node(9));
		topList.add(new Node(9));
		topList.add(new Node(9));
		let topArray = topList.linkedListToArray(topList.getNodeAt(0));

		let bottomList = new LinkedList(new Node(9));
		bottomList.add(new Node(9));
		bottomList.add(new Node(9));
		bottomList.add(new Node(9));
		let bottomArray = bottomList.linkedListToArray(bottomList.getNodeAt(0));

		//reverse the array
		topArray.reverse();
		bottomArray.reverse();

		let topNumber = parseInt(topArray.join(''));
		let bottomNumber = parseInt(bottomArray.join(''));

		let sum = topNumber + bottomNumber;
		let sumArray = sum.toString().split('');


		let sumList = new LinkedList(null);
		let test = sumList.arrayToLinkedList(sumArray);


		test.print();
	}

	

	

	runTwoSum() {
		this.twoSum([2, 7, 11, 15], 9);
	}
	/**
		Example 1:
		Input: nums = [2,7,11,15], target = 9
		Output: [0,1]
		Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
		
		Example 2:
		Input: nums = [3,2,4], target = 6
		Output: [1,2]
		
		Example 3:
		Input: nums = [3,3], target = 6
	 * @param nums 
	 * @param target 
	 * @returns 
	 */
	twoSum(nums: number[], target: number): number[] {
		let result: number[] = [];
		for (let i = 0; i < nums.length; i++) {
			for (let j = i + 1; j < nums.length; j++) {
				if (nums[i] + nums[j] === target) {
					result.push(i, j);
					return result;
				}
			}
		}
		return result;
	}

	//runLinkedList();
	runLinkedList() {

		//create a Linked list with the node1
		let list = new LinkedList(new Node(1));
		list.add(2);
		list.add(3);
		list.add(4);

		//console.log(list.head!.next.element);
		
		//print the size
		console.log(list.size());
	}

	//runAddTwoNumbers();
	runAddTwoNumbers() {
		this.runAddTwoNumbers();
	}


	runReverseLinkedList() {
		this.reverseLinkedList();
	}

	reverseLinkedList() {
		let reversedList = new LinkedList(null);
		let list = new LinkedList(new Node(1));
		list.add(new Node(2));
		list.add(new Node(3));
		list.add(new Node(4));

		//reverse the list and add each reversed element to the reversedList
		while (list.head) {
			debugger
			let node = list.head;
			list.head = list.head.next;
			node.next = reversedList.head;
			reversedList.head = node;
		}

		//print the reversed list
		while (reversedList.head) {
			console.log(reversedList.head.element);
			reversedList.head = reversedList.head.next;
		}


		console.log(reversedList);

	}
}
