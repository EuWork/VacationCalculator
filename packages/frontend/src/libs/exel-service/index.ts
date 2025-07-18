import * as XLSX from "xlsx-js-style";
import { downloadBlob } from "../../libs";
import { ForbiddenIntersection, UserItem } from "../../pages/home/async";
import { DateTime } from "luxon";

function createVacationSheetForYear(users: UserItem[], year: number): XLSX.WorkSheet {
  const months = [
    { name: "Январь", days: 31 },
    { name: "Февраль", days: 28 },
    { name: "Март", days: 31 },
    { name: "Апрель", days: 30 },
    { name: "Май", days: 31 },
    { name: "Июнь", days: 30 },
    { name: "Июль", days: 31 },
    { name: "Август", days: 31 },
    { name: "Сентябрь", days: 30 },
    { name: "Октябрь", days: 31 },
    { name: "Ноябрь", days: 30 },
    { name: "Декабрь", days: 31 },
  ];

  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    months[1].days = 29;
  }

  const monthHeader: any[] = [{ v: "vacations/" + year, s: { font: { bold: true } } }];
  const dateHeader: any[] = [{ v: "" }];

  months.forEach((month) => {
    monthHeader.push({
      v: month.name,
      s: {
        font: { bold: true },
        alignment: { horizontal: "center" },
        fill: { fgColor: { rgb: "D9D9D9" } },
      },
    });

    for (let i = 1; i < month.days; i++) {
      monthHeader.push({ v: "" });
    }

    for (let day = 1; day <= month.days; day++) {
      dateHeader.push({
        v: day,
        s: {
          font: { bold: true },
          alignment: { horizontal: "center" },
        },
      });
    }
  });

  monthHeader.push({ v: "Итого дней", s: { font: { bold: true } } });
  dateHeader.push({ v: "" });

  const data: any[][] = [monthHeader, dateHeader];
  const startDate = DateTime.local(year, 1, 1);

  for (const user of users) {
    const row: any[] = [{ v: user.fullName }];
    let totalDays = 0;

    const vacationDates = new Set(
      user.vacationDates.map((d) => {
        return DateTime.fromISO(d).toISODate();
      }),
    );

    for (let i = 0; i < months.reduce((sum, m) => sum + m.days, 0); i++) {
      const currentDate = startDate.plus({ days: i });
      const iso = currentDate.toISODate();

      if (vacationDates.has(iso!)) {
        row.push({
          v: 1,
          s: {
            fill: { fgColor: { rgb: "07bc0c" } },
            font: { color: { rgb: "000000" } },
            alignment: { horizontal: "center" },
          },
        });
        totalDays++;
      } else {
        row.push({ v: "" });
      }
    }

    row.push({
      v: totalDays,
      s: { font: { bold: true }, alignment: { horizontal: "center" } },
    });

    data.push(row);
  }

  const vacationSheet = XLSX.utils.aoa_to_sheet(data);

  vacationSheet["!cols"] = [
    { wch: 30 },
    ...Array(months.reduce((sum, m) => sum + m.days, 0)).fill({ wch: 3 }),
    { wch: 10 },
  ];
  vacationSheet["!merges"] = months.reduce((acc, month, index) => {
    const startCol = 1 + months.slice(0, index).reduce((sum, m) => sum + m.days, 0);
    const endCol = startCol + month.days - 1;

    acc.push({
      s: { r: 0, c: startCol },
      e: { r: 0, c: endCol },
    });

    return acc;
  }, [] as XLSX.Range[]);
  vacationSheet["!freeze"] = { xSplit: 1, ySplit: 2, topLeftCell: "B3", activePane: "bottomRight" };

  return vacationSheet;
}

export function exportToExcelMultipleYears(
  users: UserItem[],
  forbiddenIntersections: ForbiddenIntersection[] = [],
  weekends: string[] = [],
  years: number[],
) {
  const workbook = XLSX.utils.book_new();

  years.forEach((year) => {
    const yearUsers = users.filter((u) => u.vacationDates.some((d) => DateTime.fromISO(d).year === year));
    const sheet = createVacationSheetForYear(yearUsers, year);
    XLSX.utils.book_append_sheet(workbook, sheet, `График отпусков ${year}`);
  });

  const highlightYellow = ["OMNI", "ATAC", "SHPT - корп.портал", "SAP BASIS 2ЛП", "Tessa"];

  const allEmployees = Array.from(new Set(forbiddenIntersections.flatMap((i) => [i.employee1, i.employee2]))).sort();

  const intersectionSheetData: any[][] = [];

  intersectionSheetData[0] = [
    { v: "forbiddenIntersection", s: { font: { bold: true } } },
    ...allEmployees.map((name) => ({
      v: name,
      s: { font: { bold: true }, alignment: { horizontal: "center" } },
    })),
  ];

  for (let rowIdx = 0; rowIdx < allEmployees.length; rowIdx++) {
    const rowName = allEmployees[rowIdx];
    const row: any[] = [];

    row[0] = {
      v: rowName,
      s: { font: { bold: true }, alignment: { horizontal: "left" } },
    };

    for (let colIdx = 0; colIdx < allEmployees.length; colIdx++) {
      const colName = allEmployees[colIdx];
      const cell: any = { v: "" };

      if (rowName === colName) {
        cell.s = {
          fill: { fgColor: { rgb: "D9D9D9" } },
          alignment: { horizontal: "center" },
        };
      } else {
        const match = forbiddenIntersections.find(
          (i) =>
            (i.employee1 === rowName && i.employee2 === colName) ||
            (i.employee1 === colName && i.employee2 === rowName),
        );

        if (match) {
          const reason = match.group;
          const isYellow = highlightYellow.some((keyword) => reason.includes(keyword));

          cell.v = reason;
          cell.s = {
            fill: { fgColor: { rgb: isYellow ? "FFEB00" : "FF0000" } },
            font: { color: { rgb: "000000" } },
            alignment: { horizontal: "center" },
          };
        }
      }

      row[colIdx + 1] = cell;
    }

    intersectionSheetData.push(row);
  }

  intersectionSheetData.push([
    {
      v: "",
      s: {
        fill: { fgColor: { rgb: "FFEB00" } },
        alignment: { horizontal: "center" },
      },
    },
    {
      v: "В отпуске одновременно не более 1 человека из 3 (минимум, два сотрудника по направлению работают)",
      s: {
        alignment: { horizontal: "left", wrapText: true },
      },
    },
  ]);

  intersectionSheetData.push([
    {
      v: "",
      s: {
        fill: { fgColor: { rgb: "FF0000" } },
        alignment: { horizontal: "center" },
      },
    },
    {
      v: "В отпуске одновременно не более 1 человека из 2 (минимум, один сотрудник по направлению работает)",
      s: {
        alignment: { horizontal: "left", wrapText: true },
      },
    },
  ]);

  const forbiddenSheet = XLSX.utils.aoa_to_sheet(intersectionSheetData);
  forbiddenSheet["!cols"] = Array(allEmployees.length + 1).fill({ wch: 20 });
  forbiddenSheet["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: intersectionSheetData.length - 1, c: allEmployees.length },
  });

  XLSX.utils.book_append_sheet(workbook, forbiddenSheet, "Запрещенные пересечения");

  const weekendsSheetData: any[][] = Array.from({ length: 26 }, () => []);
  weekendsSheetData[0][0] = { v: "weekends", s: { font: { bold: true } } };
  weekendsSheetData[0][1] = {
    v: "Производственный календарь на 2025 год для пятидневной недели выходные дни",
    s: {
      font: { bold: true },
      alignment: { horizontal: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  weekendsSheetData[25][0] = {
    v: "Структура не должна меняться",
    s: { font: { italic: true } },
  };

  const monthAreas = [
    { month: 1, name: "Январь", from: "B3", to: "E13", label: "B2:E2" },
    { month: 2, name: "Февраль", from: "G3", to: "J13", label: "G2:J2" },
    { month: 3, name: "Март", from: "L3", to: "O13", label: "L2:O2" },
    { month: 4, name: "Апрель", from: "Q3", to: "T13", label: "Q2:T2" },
    { month: 5, name: "Май", from: "V3", to: "Y13", label: "V2:Y2" },
    { month: 6, name: "Июнь", from: "AA3", to: "AD13", label: "AA2:AD2" },
    { month: 7, name: "Июль", from: "B16", to: "E26", label: "B15:E15" },
    { month: 8, name: "Август", from: "G16", to: "J26", label: "G15:J15" },
    { month: 9, name: "Сентябрь", from: "L16", to: "O26", label: "L15:O15" },
    { month: 10, name: "Октябрь", from: "Q16", to: "T26", label: "Q15:T15" },
    { month: 11, name: "Ноябрь", from: "V16", to: "Y26", label: "V15:Y15" },
    { month: 12, name: "Декабрь", from: "AA16", to: "AD26", label: "AA15:AD15" },
  ];

  const merges: XLSX.Range[] = [
    { s: { r: 0, c: 1 }, e: { r: 0, c: 30 } },
    ...monthAreas.map(({ label }) => {
      const [start, end] = label.split(":").map(XLSX.utils.decode_cell);
      return { s: start, e: end };
    }),
  ];

  for (const { name, label } of monthAreas) {
    const [start, end] = label.split(":").map(XLSX.utils.decode_cell);

    for (let c = start.c; c <= end.c; c++) {
      if (!weekendsSheetData[start.r]) weekendsSheetData[start.r] = [];
      weekendsSheetData[start.r][c] = {
        v: c === start.c ? name : "",
        s: {
          font: { bold: true },
          alignment: { horizontal: "center" },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: c === start.c ? { style: "thin", color: { rgb: "000000" } } : undefined,
            right: c === end.c ? { style: "thin", color: { rgb: "000000" } } : undefined,
          },
        },
      };
    }
  }

  for (const dateStr of weekends) {
    const date = DateTime.fromISO(dateStr);
    const area = monthAreas.find((m) => m.month === date.month);
    if (!area) continue;

    const { from, to } = area;
    const start = XLSX.utils.decode_cell(from);
    const end = XLSX.utils.decode_cell(to);

    let placed = false;
    for (let r = start.r; r <= end.r && !placed; r++) {
      for (let c = start.c; c <= end.c && !placed; c++) {
        if (!weekendsSheetData[r]) weekendsSheetData[r] = [];
        if (!weekendsSheetData[r][c]) {
          weekendsSheetData[r][c] = {
            v: date.day,
            s: {
              alignment: { horizontal: "center" },
            },
          };
          placed = true;
        }
      }
    }
  }

  for (const { from, to } of monthAreas) {
    const start = XLSX.utils.decode_cell(from);
    const end = XLSX.utils.decode_cell(to);

    for (let r = start.r; r <= end.r; r++) {
      for (let c = start.c; c <= end.c; c++) {
        if (!weekendsSheetData[r]) weekendsSheetData[r] = [];
        if (!weekendsSheetData[r][c]) weekendsSheetData[r][c] = { v: "" };

        const cell = weekendsSheetData[r][c];
        cell.s = {
          ...cell.s,
          alignment: { horizontal: "center" },
          border: {
            top: r === start.r ? { style: "thin", color: { rgb: "000000" } } : undefined,
            bottom: r === end.r ? { style: "thin", color: { rgb: "000000" } } : undefined,
            left: c === start.c ? { style: "thin", color: { rgb: "000000" } } : undefined,
            right: c === end.c ? { style: "thin", color: { rgb: "000000" } } : undefined,
          },
        };
      }
    }
  }

  const weekendsSheet = XLSX.utils.aoa_to_sheet(weekendsSheetData);
  weekendsSheet["!merges"] = merges;
  weekendsSheet["!cols"] = Array(19).fill({ wch: 4 });

  const sampleSheetData: any[][] = Array.from({ length: 26 }, () => []);
  sampleSheetData[0][0] = { v: "sample", s: { font: { bold: true } } };
  sampleSheetData[0][1] = {
    v: "Шаблон производственного календаря на 20XX год для пятидневной недели",
    s: {
      font: { bold: true },
      alignment: { horizontal: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  const sampleMerges: XLSX.Range[] = [
    { s: { r: 0, c: 1 }, e: { r: 0, c: 30 } },
    ...monthAreas.map(({ label }) => {
      const [start, end] = label.split(":").map(XLSX.utils.decode_cell);
      return { s: start, e: end };
    }),
  ];

  for (const { name, label } of monthAreas) {
    const [start, end] = label.split(":").map(XLSX.utils.decode_cell);

    for (let c = start.c; c <= end.c; c++) {
      if (!sampleSheetData[start.r]) sampleSheetData[start.r] = [];
      sampleSheetData[start.r][c] = {
        v: c === start.c ? name : "",
        s: {
          font: { bold: true },
          alignment: { horizontal: "center" },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: c === start.c ? { style: "thin", color: { rgb: "000000" } } : undefined,
            right: c === end.c ? { style: "thin", color: { rgb: "000000" } } : undefined,
          },
        },
      };
    }
  }

  for (const { from, to } of monthAreas) {
    const start = XLSX.utils.decode_cell(from);
    const end = XLSX.utils.decode_cell(to);

    for (let r = start.r; r <= end.r; r++) {
      for (let c = start.c; c <= end.c; c++) {
        if (!sampleSheetData[r]) sampleSheetData[r] = [];
        if (!sampleSheetData[r][c]) sampleSheetData[r][c] = { v: "" };

        const cell = sampleSheetData[r][c];
        cell.s = {
          ...cell.s,
          alignment: { horizontal: "center" },
          border: {
            top: r === start.r ? { style: "thin", color: { rgb: "000000" } } : undefined,
            bottom: r === end.r ? { style: "thin", color: { rgb: "000000" } } : undefined,
            left: c === start.c ? { style: "thin", color: { rgb: "000000" } } : undefined,
            right: c === end.c ? { style: "thin", color: { rgb: "000000" } } : undefined,
          },
        };
      }
    }
  }

  const sampleSheet = XLSX.utils.aoa_to_sheet(sampleSheetData);
  sampleSheet["!merges"] = sampleMerges;
  sampleSheet["!cols"] = Array(31).fill({ wch: 4 });

  XLSX.utils.book_append_sheet(workbook, weekendsSheet, "Производственный календарь 2025");
  XLSX.utils.book_append_sheet(workbook, sampleSheet, "Шаблон производ. календаря");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  downloadBlob(blob, `График отпусков ${years.join(", ")}.xlsx`);
}
