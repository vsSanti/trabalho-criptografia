import { CipherProps } from '../@types';

export const caesarCipher = (data: CipherProps): string => {
  const cipher =
    data.type === 'cipher' ? data.cipher : Number(data.cipher) * -1;
  const arrayOfInputTextChars = data.inputText.split('');
  const outputText = arrayOfInputTextChars.reduce(
    (acc, cur) => acc + String.fromCharCode(cur.charCodeAt(0) + Number(cipher)),
    '',
  );

  return outputText;
};
