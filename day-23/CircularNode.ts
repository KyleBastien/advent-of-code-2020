export class CircularNode<T> {
  public next: CircularNode<T> = this;
  public previous: CircularNode<T> = this;

  public value: T;

  constructor(value: T) {
    this.value = value;
  }

  public remove(): CircularNode<T> {
    this.previous.next = this.next;
    this.next.previous = this.previous;

    return this;
  }

  public jumpAhead(count: number) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let rv: CircularNode<T> = this;
    for (let i = 0; i < count; i++) {
      rv = rv.next;
    }
    return rv;
  }

  public jumpBack(count: number) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let rv: CircularNode<T> = this;
    for (let i = 0; i < count; i++) {
      rv = rv.previous;
    }
    return rv;
  }

  public insertAfter(node: CircularNode<T>) {
    this.next.previous = node;
    node.previous = this;
    node.next = this.next;
    this.next = node;

    return node;
  }

  public insertBefore(node: CircularNode<T>) {
    this.previous.next = node;
    node.previous = this.previous;
    node.next = this;
    this.previous = node;

    return node;
  }
}
