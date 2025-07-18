const SAFE_AREA = 24;

export class PopupMaxSizeCalculator {
  constructor(
    private contentElement: HTMLDivElement,
    private minHeight: number,
  ) {}

  private applyMaxWidth(bounding: DOMRect) {
    this.contentElement.style.maxWidth = window.innerWidth - bounding.left - SAFE_AREA + "px";

    const computedStyle = getComputedStyle(this.contentElement);
    this.contentElement.style.setProperty(
      "--popup-max-width",
      `calc(${computedStyle.maxWidth} - ${computedStyle.paddingLeft} - ${computedStyle.paddingRight})`,
    );
  }

  private applyMaxHeight(bounding: DOMRect) {
    this.contentElement.style.minHeight = this.minHeight + "px";
    this.contentElement.style.maxHeight =
      Math.max(window.innerHeight - bounding.top - SAFE_AREA, this.minHeight) + "px";
    const computedStyle = getComputedStyle(this.contentElement);
    this.contentElement.style.setProperty(
      "--popup-max-height",
      `calc(${computedStyle.maxHeight} - ${computedStyle.paddingTop} - ${computedStyle.paddingBottom})`,
    );
  }

  private calculate(onCalculated?: () => void) {
    const bounding = this.contentElement.getBoundingClientRect();
    this.applyMaxWidth(bounding);
    this.applyMaxHeight(bounding);
    onCalculated?.();
  }

  run(onCalculated?: () => void) {
    this.calculate(onCalculated);
    const timer = setInterval(() => this.calculate(onCalculated), 100);
    return () => clearInterval(timer);
  }
}
