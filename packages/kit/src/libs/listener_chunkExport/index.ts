export class Listener<DATA = undefined> {
  private listeners = new Set<(data: DATA) => void>();

  constructor(private saveLastData?: boolean) {}

  subscribe(callback: (data: DATA) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  subscribeOnce(callback: (data: DATA) => void) {
    const resultCallback = (data: DATA) => {
      this.listeners.delete(resultCallback);
      callback(data);
    };
    this.listeners.add(resultCallback);
    return () => this.listeners.delete(resultCallback);
  }

  lastData!: DATA | undefined;

  emit(data: DATA = undefined as DATA) {
    if (this.saveLastData) this.lastData = data;
    this.listeners.forEach((listener) => listener(data));
  }

  get subscribersCount() {
    return this.listeners.size;
  }
}
