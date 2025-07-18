import { PopupMaxSizeCalculator } from "../../../MaxSizeCalculator";

export class PopupCalculator {
  constructor(
    private ref: HTMLDivElement,
    minHeight: number,
  ) {
    this.sizesCalculator = new PopupMaxSizeCalculator(this.getPopupInner(), minHeight);
  }

  private sizesCalculator: PopupMaxSizeCalculator;

  private getPopupInner() {
    return this.ref.parentNode!.parentNode! as HTMLDivElement;
  }

  run() {
    this.sizesCalculator.run(() => {
      this.ref.style.display = "unset";
    });
  }
}
