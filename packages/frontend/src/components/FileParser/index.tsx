import * as XLSX from "xlsx-js-style";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

import { ForbiddenIntersection, UserItem } from "../../pages/home/async";

export interface VacationParseResult {
  users: UserItem[];
  forbiddenIntersections: ForbiddenIntersection[];
  weekends: string[];
  warnings: string[];
  errors: string[];
}

export async function parseExcelFile(file: File): Promise<VacationParseResult> {
  const reader = new FileReader();
  const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });

  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const users: UserItem[] = [];
  const forbiddenIntersections: ForbiddenIntersection[] = [];
  const weekends: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const markerCell = sheet["A1"];
    if (!markerCell || typeof markerCell.v !== "string") {
      warnings.push(`Лист "${sheetName}" пропущен: нет текстового маркера в A1`);
      continue;
    }

    const marker = markerCell.v.trim();

    if (marker === "sample") {
      continue;
    }

    if (marker.startsWith("vacations/")) {
      const year = parseInt(marker.split("/")[1]);
      if (!isNaN(year)) {
        users.push(...parseVacationSheet(sheet, year, errors));
      } else {
        errors.push(`Невалидный год в маркере "${marker}" на листе "${sheetName}"`);
      }
    } else if (marker === "forbiddenIntersection") {
      forbiddenIntersections.push(...parseIntersectionSheet(sheet));
    } else if (marker.startsWith("weekends")) {
      const match = sheetName.match(/(\d{4})/);
      if (match) {
        const year = parseInt(match[1]);
        weekends.push(...parseWeekendSheet(sheet, year, warnings));
      } else {
        errors.push(`Невозможно определить год из имени листа "${sheetName}" для выходных`);
      }
    } else {
      warnings.push(`Неизвестный маркер "${marker}" на листе "${sheetName}"`);
    }
  }

  const groupMap = new Map<string, string>();
  for (const item of forbiddenIntersections) {
    if (item.group) {
      groupMap.set(item.employee1, item.group);
      groupMap.set(item.employee2, item.group);
    }
  }

  for (const user of users) {
    if (groupMap.has(user.fullName)) {
      user.group = groupMap.get(user.fullName)!;
    }
  }

  return { users, forbiddenIntersections, weekends, warnings, errors };
}

function parseVacationSheet(sheet: XLSX.WorkSheet, year: number, errors: string[]): UserItem[] {
  const result: UserItem[] = [];
  let row = 3;

  while (sheet[`A${row}`] && sheet[`A${row}`].v) {
    const nameCell = sheet[`A${row}`];
    const fullName = String(nameCell.v).trim();

    if (!isNaN(Number(fullName))) {
      errors.push(`Некорректное ФИО в A${row}: "${nameCell.v}"`);
    }

    const vacationDates: string[] = [];

    for (let col = 2; col <= 366; col++) {
      const colLetter = XLSX.utils.encode_col(col);
      const cellRef = `${colLetter}${row}`;
      const cell = sheet[cellRef];

      if (cell && (cell.v === 1 || cell.v === "1" || cell.v === "У")) {
        const date = DateTime.fromObject({ year }).plus({ days: col - 1 });
        vacationDates.push(date.toISODate()!);
      }
    }

    result.push({ id: uuidv4(), fullName, vacationDates, group: "" });
    row++;
  }
  console.log(result);
  return result;
}

function parseIntersectionSheet(sheet: XLSX.WorkSheet): ForbiddenIntersection[] {
  const result: ForbiddenIntersection[] = [];

  const employees: string[] = [];
  let col = 1;
  while (sheet[`${XLSX.utils.encode_col(col)}1`] && sheet[`${XLSX.utils.encode_col(col)}1`].v) {
    const colLetter = XLSX.utils.encode_col(col);
    const cell = sheet[`${colLetter}1`];
    employees.push(String(cell.v).trim());
    col++;
  }

  const pairMap = new Map<string, ForbiddenIntersection>();

  let row = 2;
  while (sheet[`A${row}`] && sheet[`A${row}`].v) {
    const employee1 = String(sheet[`A${row}`].v).trim();

    for (let c = 1; c <= employees.length; c++) {
      const colLetter = XLSX.utils.encode_col(c);
      const cell = sheet[`${colLetter}${row}`];

      if (!cell) continue;
      const raw = typeof cell.v === "string" ? cell.v.trim() : cell.v?.toString()?.trim();
      if (!raw) continue;

      const employee2 = employees[c - 1];

      const [a, b] = employee1 < employee2 ? [employee1, employee2] : [employee2, employee1];
      const key = `${a}||${b}`;

      if (!pairMap.has(key)) {
        pairMap.set(key, { employee1: a, employee2: b, group: raw });
      }
    }
    row++;
  }

  pairMap.forEach((fi) => result.push(fi));
  console.log(result);
  return result;
}

function parseWeekendSheet(sheet: XLSX.WorkSheet, year: number, warnings: string[]): string[] {
  const weekends: string[] = [];

  const ranges = [
    { month: 1, from: "B3", to: "E13" },
    { month: 2, from: "G3", to: "J13" },
    { month: 3, from: "L3", to: "O13" },
    { month: 4, from: "Q3", to: "T13" },
    { month: 5, from: "V3", to: "Y13" },
    { month: 6, from: "AA3", to: "AD13" },
    { month: 7, from: "B16", to: "E26" },
    { month: 8, from: "G16", to: "J26" },
    { month: 9, from: "L16", to: "O26" },
    { month: 10, from: "Q16", to: "T26" },
    { month: 11, from: "V16", to: "Y26" },
    { month: 12, from: "AA16", to: "AD26" },
  ];

  for (const { month, from, to } of ranges) {
    const { s, e } = XLSX.utils.decode_range(`${from}:${to}`);

    for (let r = s.r; r <= e.r; r++) {
      for (let c = s.c; c <= e.c; c++) {
        const cellAddress = XLSX.utils.encode_cell({ c, r });
        const cell = sheet[cellAddress];

        if (cell && cell.v != null && String(cell.v).trim() !== "") {
          const raw = String(cell.v).trim();
          const day = parseInt(raw);
          if (!isNaN(day)) {
            const date = DateTime.fromObject({ year, month, day });
            weekends.push(date.toISODate()!);
          } else {
            warnings.push(`Некорректное значение "${raw}" в ячейке ${cellAddress} — ожидается число`);
          }
        }
      }
    }
  }
  console.log(weekends);
  return weekends;
}
