import { style } from "@vanilla-extract/css";

export const SelectMonthYearFieldStyle = style({
  display: "flex",
  gap: 20,
  alignItems: "center",
  margin: 20,
});

export const tableCellWrapperStyle = style({
  width: "100%",
  height: "100%",
  minHeight: 24,
  border: "1px solid #d9d9d9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const tableHeaderCellStyle = style([
  tableCellWrapperStyle,
  {
    fontWeight: 600,
    background: "#fafafa",
  },
]);

export const employeeCellWrapperStyle = style({
  display: "flex",
  alignItems: "center",
  gap: 8, // расстояние между текстом и кнопкой
  padding: "0 8px",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  border: "1px solid #d9d9d9",
});

export const employeeNameStyle = style({
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const employeeActionButtonStyle = style({
  marginLeft: 4, // доп. небольшой safety-gap
});
