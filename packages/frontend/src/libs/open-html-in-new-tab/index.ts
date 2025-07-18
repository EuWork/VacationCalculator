export function openHtmlInNewTab(html: string) {
  const win = window.open();
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
}
