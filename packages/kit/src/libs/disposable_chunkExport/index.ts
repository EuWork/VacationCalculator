export class DisposableCall {
  private _dispose: Function | undefined;

  setDispose(dispose: Function | undefined) {
    if (this._dispose) throw new Error();
    this._dispose = undefined;
    if (dispose) this._dispose = dispose;
  }

  dispose = () => {
    this._dispose?.();
    this._dispose = undefined;
  };

  disposeAsync = async () => {
    await this._dispose?.();
    this._dispose = undefined;
  };
}
