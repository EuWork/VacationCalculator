import type { GlobalToken } from "antd";

import type { BarValue } from "../../types";
import { ColorLibs } from "../libs";
import type { BarInterface } from "./Bar";

interface BarsLibsInterface {
  ranges: number[];
  values: BarValue[];
  width: number;
  token: GlobalToken;
}

export class BarsLibs {
  barsData: Pick<BarInterface, "index" | "value" | "bar" | "backgroundColor" | "isBeforeMid" | "isOpacity">[];
  private bars: number[];
  private colors: string[];
  private valueMap: Map<number, BarValue>;
  private ranges: number[];
  private values: BarValue[];
  private width: number;

  constructor({ ranges, values, width, token }: BarsLibsInterface) {
    this.ranges = ranges;
    this.values = values;
    this.width = width;

    const colorLibs = new ColorLibs({ token });
    this.bars = this.calculateBars();
    this.colors = this.calculateColors(colorLibs.colors);
    this.valueMap = this.calculateValueMap();
    this.barsData = this.calculateBarsData();
  }

  private calculateBars() {
    const min = this.ranges[0];
    const max = this.ranges[this.ranges.length - 1];
    const totalBars = Math.round(this.width / 8);
    const step = (max - min) / Math.max(totalBars - 1, 1);

    return Array.from({ length: totalBars }, (_, i) => min + i * step);
  }

  private calculateBarsData() {
    return this.bars.map((bar, index) => ({
      index,
      value: this.valueMap.get(index),
      bar,
      backgroundColor: this.colors[index],
      isBeforeMid: index < Math.floor(this.bars.length / 2),
      isOpacity: ![index - 1, index, index + 1].some((i) => this.valueMap.has(i)),
    }));
  }

  private calculateValueMap() {
    const valueMap = new Map<number, BarValue>();
    this.values.forEach((value) => {
      const closestIndex = this.findClosestBarIndex(value.value);
      if (valueMap.has(closestIndex)) {
        valueMap.set(closestIndex, { ...valueMap.get(closestIndex)!, afterChangesValue: value, equal: true });
      } else {
        valueMap.set(closestIndex, value);
      }
    });

    return valueMap;
  }

  private findClosestBarIndex(value: number) {
    let low = 0;
    let high = this.bars.length - 1;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (this.bars[mid] < value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }

  private calculateColors(baseColors: string[]) {
    const totalBars = this.bars.length;
    const totalSum = this.ranges.reduce((sum, range, index) => {
      if (index === this.ranges.length - 1) return sum;
      return sum + (this.ranges[index + 1] - range);
    }, 0);

    const barsPerColor =
      totalSum === 0
        ? this.calculateBarsPerColorForZeroSum(baseColors, totalBars)
        : this.calculateBarsPerColor(baseColors, totalBars, totalSum);

    const colors: string[] = [];
    baseColors.forEach((color, i) => {
      colors.push(...Array(barsPerColor[i]).fill(color));
    });

    while (colors.length < totalBars) {
      colors.push(baseColors[baseColors.length - 1]);
    }
    while (colors.length > totalBars) {
      colors.pop();
    }

    return colors;
  }

  private calculateBarsPerColorForZeroSum(baseColors: string[], totalBars: number) {
    return baseColors
      .flatMap((color) => Array(Math.floor(totalBars / baseColors.length)).fill(color))
      .concat(Array(totalBars % baseColors.length).fill(baseColors[baseColors.length - 1]));
  }

  private calculateBarsPerColor(baseColors: string[], totalBars: number, totalSum: number) {
    return baseColors.map((_, i) => {
      const rangeSize = this.ranges[i + 1] - this.ranges[i];
      return Math.round((rangeSize / totalSum) * totalBars);
    });
  }
}
