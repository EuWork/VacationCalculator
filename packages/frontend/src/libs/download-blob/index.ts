export async function downloadBlob(blob: Blob, downloadFileName: string | null) {
  if ((window as any).showSaveFilePicker) {
    const fileHandle = await (window as any).showSaveFilePicker({
      suggestedName: downloadFileName,
    });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
    return;
  }

  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.target = "_blank";
  if (downloadFileName) anchor.download = downloadFileName;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}
