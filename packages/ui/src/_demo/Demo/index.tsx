import React from "react";
import { AlertOutlined, AimOutlined } from "@ant-design/icons";
import { DateTime } from "luxon";
import { DateMode, IntlDate } from "@worksolutions/utils";

import {
  UiProvider,
  UiPage,
  createTheme,
  GanttChart,
  europeDateFormats,
  GanttChartHeaderColumn,
  GanttHeaderSearchCell,
  GanttTextCell,
  GanttCellIndicator,
  GanttHeaderTimeIntervalCell,
  GanttChartDataset,
  GanttDefaultValueTextRenderer,
  GanttDefaultValueIndicatorRenderer,
} from "main";

const intlDate = new IntlDate({ languageCode: "ru", matchDateModeAndLuxonTypeLiteral: europeDateFormats });

type DatasetItem = {
  equipmentName: string;
};

function Demo() {
  const now = React.useMemo(() => DateTime.now(), []);

  const fixedHeaderColumns = React.useMemo<GanttChartHeaderColumn<DatasetItem>[]>(
    () => [
      {
        width: 282,
        headerCellRenderer: () => (
          <GanttHeaderSearchCell value="" placeholder="Найти оборудование" onChange={console.log} />
        ),
        cellRenderer: (props) => (
          <GanttTextCell
            text={props.equipmentName}
            mode="default"
            indicators={
              <>
                <GanttCellIndicator icon={<AlertOutlined />} color="success" />
              </>
            }
          />
        ),
      },
    ],
    [],
  );

  const headerColumns = React.useMemo<GanttChartHeaderColumn<DatasetItem>[]>(
    () => [
      {
        width: 280,
        value: now.toMillis(),
        valueWidth: oneDayInMillis,
        headerCellRenderer: ({ fixedLeft }) => (
          <GanttHeaderTimeIntervalCell
            intlDate={intlDate}
            dateMode={DateMode.DAY_WITH_STRING_MONTH}
            date={now.toJSDate()}
            fixedLeft={fixedLeft}
            hoursStep={4}
            getHourPostfix={() => "ч"}
            getIsActive={() => false}
          />
        ),
      },
      {
        width: 280,
        value: now.plus({ day: 1 }).toMillis(),
        valueWidth: oneDayInMillis,
        headerCellRenderer: ({ fixedLeft }) => (
          <GanttHeaderTimeIntervalCell
            intlDate={intlDate}
            dateMode={DateMode.DAY_WITH_STRING_MONTH}
            date={now.plus({ day: 1 }).toJSDate()}
            fixedLeft={fixedLeft}
            hoursStep={4}
            getHourPostfix={() => "ч"}
            getIsActive={() => false}
          />
        ),
      },
    ],
    [now],
  );

  const dataset = React.useMemo<GanttChartDataset<DatasetItem>[]>(
    () => [
      {
        id: "1",
        equipmentName: "Оборудование 1",
        __cellValues: [
          {
            type: "position",
            start: now.plus({ hour: 4 }).toMillis(),
            element: <GanttDefaultValueIndicatorRenderer icon={<AimOutlined />} color="warning" />,
          },
          {
            type: "interval",
            start: now.plus({ hour: 12 }).toMillis(),
            end: now.plus({ hour: 32 }).toMillis(),
            element: <GanttDefaultValueTextRenderer text="Некий процесс" color="primary" tooltipText="привет" />,
          },
        ],
      },
    ],
    [now],
  );

  return (
    <UiProvider themeName="white" theme={createTheme({})} globalWindow={window}>
      <UiPage pageName="Тут тайтл">
        <GanttChart
          headerCellHeight={50}
          cellHeight={40}
          fixedHeaderColumns={fixedHeaderColumns}
          headerColumns={headerColumns}
          dataset={dataset}
          currentValue={now.plus({ hour: 8 }).toMillis()}
          autoScrollToCurrentValue
        />
      </UiPage>
    </UiProvider>
  );
}

export default React.memo(Demo);

const oneDayInMillis = DateTime.fromMillis(0).plus({ day: 1 }).toMillis();
