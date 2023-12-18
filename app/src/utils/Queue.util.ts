export class Queue<T> {
  public items: Array<T> = [];

  constructor(items: T[] = []) {
    this.items = [...items];
  }

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items.length > 0 ? this.items[0] : undefined;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getAllItems(): T[] {
    return [...this.items];
  }
}
