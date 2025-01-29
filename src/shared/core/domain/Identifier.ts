export class Identifier<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  equals(id?: Identifier<T>): boolean {
    if (!(id instanceof Identifier)) {
      return false;
    }

    if (typeof this.value !== typeof id.value) {
      return false;
    }

    return id.value === this.value;
  }

  getValue(): T {
    return this.value;
  }

  getNumber(): number {
    return Number(this.value);
  }

  getString(): string {
    return String(this.value);
  }

  isNewIdentifier(): boolean {
    return this.value === 0;
  }
}
