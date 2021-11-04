import { CipherProps } from '../@types';

const AcharCode = 'A'.charCodeAt(0);
const ZcharCode = 'Z'.charCodeAt(0);
const AZlen = ZcharCode - AcharCode + 1;

const encrypt = (text: string, key: string, reverse: boolean): any => {
  const plaintext = text;
  const messageLen = plaintext.length;
  const keyLen = key.length;
  const encriptionDir = reverse ? -1 * AZlen : 0;

  let enctext = '';

  for (let i = 0; i < messageLen; i += 1) {
    const plainLetter = plaintext.charAt(i).toUpperCase();
    if (plainLetter.match(/\s/)) {
      enctext += plainLetter;
      continue;
    }

    const keyLetter = key.charAt(i % keyLen).toUpperCase();
    const vigenereOffset = keyLetter.charCodeAt(0) - AcharCode;
    const encLetterOffset =
      (plainLetter.charCodeAt(0) -
        AcharCode +
        Math.abs(encriptionDir + vigenereOffset)) %
      AZlen;

    enctext += String.fromCharCode(AcharCode + encLetterOffset);
  }

  return enctext;
};

export const vigenereCipher = (data: CipherProps): string => {
  return encrypt(data.inputText, String(data.cipher), data.type === 'decipher');
};
