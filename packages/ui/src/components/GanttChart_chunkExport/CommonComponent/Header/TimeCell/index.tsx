import React from "react";
import { DateMode, IntlDate } from "@worksolutions/utils";
import { Typography } from "antd";
import { DateTime } from "luxon";

import { timeStyles, wrapperStyles } from "./style.css";

export interface GanttHeaderTimeCellInterface {
  date: Date;
  dateMode: DateMode;
  intlDate: IntlDate;
  fixedLeft: number;
}

function GanttHeaderTimeCell({ date, dateMode, intlDate, fixedLeft }: GanttHeaderTimeCellInterface) {
  const dateStyle = React.useMemo(() => ({ left: fixedLeft + 6 }), [fixedLeft]);

  return (
    <div className={wrapperStyles}>
      <Typography.Text style={dateStyle} className={timeStyles} type="secondary">
        {intlDate.formatDate(DateTime.fromJSDate(date), dateMode)}
      </Typography.Text>
    </div>
  );
}

export default React.memo(GanttHeaderTimeCell);
