const b64toBlob = (b64Data: string, sliceSize = 512): Blob => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: 'text/plain' });
  return blob;
};

export const downloadFile = (
  dataUrl: string,
  fileName: string,
  type: 'cipher' | 'decipher',
): void => {
  let fullFileName = fileName;
  let href = dataUrl;

  if (type === 'cipher') {
    const blob = b64toBlob(dataUrl);
    const date = new Date();

    href = URL.createObjectURL(blob);
    fullFileName = `${date.getTime()}_${fileName}.sec`;
  } else if (type === 'decipher' && fileName.endsWith('.sec')) {
    fullFileName = fileName.substring(0, fileName.length - 4);
  }

  const link = document.createElement('a');
  link.href = href;
  link.download = fullFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
