import { GanttChartHeaderColumn } from "../types";

type HeaderColumnSize = {
  min: number;
  max: number;
};

export class AbsolutePositionCalculator {
  static getFixedLeft(fixedHeaderColumns: GanttChartHeaderColumn<any>[]) {
    return fixedHeaderColumns.reduce((acc, column) => acc + column.width, 0);
  }

  constructor(
    private fixedHeaderColumns: GanttChartHeaderColumn<any>[],
    private headerColumns: GanttChartHeaderColumn<any>[],
    private headerHeight: number,
    private cellHeight: number,
    private rowIndex: number,
    private position:
      | { type: "interval"; start: number; end: number }
      | { type: "position"; start: number; end?: never },
  ) {}

  private _fixedLeft: number | null = null;
  private getFixedLeft() {
    if (this._fixedLeft !== null) return this._fixedLeft;

    this._fixedLeft = AbsolutePositionCalculator.getFixedLeft(this.fixedHeaderColumns);
    return this._fixedLeft;
  }

  private _headerColumnWidthSum: number | null = null;
  private getHeaderColumnWidthSum() {
    if (this._headerColumnWidthSum !== null) return this._headerColumnWidthSum;

    this._headerColumnWidthSum = this.headerColumns.reduce((acc, column) => acc + column.width, 0);
    return this._headerColumnWidthSum;
  }

  private _headerColumnSizes: HeaderColumnSize | null = null;
  private getHeaderColumnSizes(): HeaderColumnSize {
    if (this._headerColumnSizes !== null) return this._headerColumnSizes;

    const headerColumns = this.headerColumns
      .map((column) => {
        if (column.value === undefined || column.valueWidth === undefined) return undefined!;
        return { value: column.value, width: column.valueWidth };
      })
      .filter((value) => value !== undefined);

    const minValue = Math.min(...headerColumns.map((column) => column.value));
    const maxValue = Math.max(...headerColumns.map((column) => column.value + column.width));

    this._headerColumnSizes = { min: minValue, max: maxValue };
    return this._headerColumnSizes;
  }

  calculate() {
    const fixedLeft = this.getFixedLeft();
    const headerColumnWidthSum = this.getHeaderColumnWidthSum();
    const { min, max } = this.getHeaderColumnSizes();

    const top = this.headerHeight + this.cellHeight * this.rowIndex;

    const normalizedMax = max - min;
    const normalizedStart = this.position.start - min;

    const startInPercent = normalizedStart / normalizedMax;
    const left = fixedLeft + startInPercent * headerColumnWidthSum;

    if (this.position.type === "interval") {
      const normalizedEnd = this.position.end - min;
      const endInPercent = normalizedEnd / normalizedMax;
      const right = fixedLeft + endInPercent * headerColumnWidthSum;
      return { type: "interval", left, width: right - left, top } as const;
    }

    return { type: "position", left, top } as const;
  }
}
