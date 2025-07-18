import React from "react";

export type RenderValueType = React.FC<{ value: number; index: number }>;

export interface BarValue {
  value: number;
  valueIndex: number;
  position: "top" | "bottom";
  tooltip?: string;
  equal?: boolean;
  afterChangesValue?: BarValue;
}

export interface BarsViewInterface {
  type: "bars";
  values: BarValue[];
  ranges: number[];
  legendValues?: number[];
  RenderValue?: RenderValueType;
}

export interface BlockValue {
  value: number;
  tooltip?: string;
}

export interface BlocksViewInterface {
  type: "blocks";
  values: BlockValue[];
  RenderValue?: RenderValueType;
}
