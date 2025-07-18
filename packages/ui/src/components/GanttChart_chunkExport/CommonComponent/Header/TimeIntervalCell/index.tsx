import React from "react";
import { DateMode, IntlDate, nbspString, range } from "@worksolutions/utils";
import { Typography } from "antd";
import { DateTime } from "luxon";
import cn from "classnames";

import { dateStyles, hoursListWrapperStyles, hourTextActiveStyles, hourTextStyles, wrapperStyles } from "./style.css";

export interface GanttHeaderTimeIntervalCellInterface {
  date: Date;
  dateMode: DateMode;
  intlDate: IntlDate;
  hoursStep: number;
  fixedLeft: number;
  getHourPostfix: (hour: number) => string;
  getIsActive?: (hour: number) => boolean;
}

function GanttHeaderTimeIntervalCell({
  date,
  dateMode,
  intlDate,
  getHourPostfix,
  fixedLeft,
  hoursStep,
  getIsActive,
}: GanttHeaderTimeIntervalCellInterface) {
  const stepsCount = 24 / hoursStep;
  const dateStyle = React.useMemo(() => ({ left: fixedLeft + 8 }), [fixedLeft]);

  return (
    <div className={wrapperStyles}>
      <Typography.Text style={dateStyle} className={dateStyles} strong>
        {intlDate.formatDate(DateTime.fromJSDate(date), dateMode)}
      </Typography.Text>
      <div className={hoursListWrapperStyles}>
        {range(0, stepsCount + 1).map((hourIndex) => {
          const active = getIsActive?.(hourIndex * hoursStep) ?? false;
          return (
            <Typography.Text key={hourIndex} className={cn(hourTextStyles, active && hourTextActiveStyles)}>
              {(hourIndex * hoursStep).toString().padStart(2, "0")}
              {nbspString}
              <Typography.Text type="secondary" className={cn(active && hourTextActiveStyles)}>
                {getHourPostfix(hourIndex * hoursStep)}
              </Typography.Text>
            </Typography.Text>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(GanttHeaderTimeIntervalCell);
