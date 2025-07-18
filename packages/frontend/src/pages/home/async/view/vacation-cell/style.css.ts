import { style } from "@vanilla-extract/css";

export const vacationActiveStyle = style({
  background: "#07bc0c",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const forbiddenIntersectionStyle = style({
  background: "#ff4d4f",
  border: "1px solid #d9363e",
  cursor: "pointer",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const vacationCellBase = style({
  height: "10px",
});

export const iconButton = style({
  marginLeft: "8px",
});

export const tableContainer = style({
  maxHeight: "70vh",
  overflow: "auto",
  marginTop: "16px",
  borderRadius: "8px",
});

export const buttonContainer = style({
  display: "flex",
  gap: "12px",
  marginTop: "24px",
  marginLeft: "10px",
  marginBottom: "20px"
});

export const uploadContainer = style({
  display: "flex",
  gap: "12px",
  marginTop: "16px",
  marginLeft: "10px"
});

export const exportButton = style({
  height: "106px",
  width: "220px",
  padding: "0 24px",
  fontWeight: 600,
  borderRadius: 15
});
