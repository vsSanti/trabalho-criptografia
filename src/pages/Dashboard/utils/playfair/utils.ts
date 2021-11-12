const TRANSLATE_FROM = 'J';
const TRANSLATE_TO = 'I';

export const getAlphabet = (): string => {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
};

export const getKey = (cipher: string): string[] => {
  const encryptionkey = cipher.toUpperCase();

  const letters = getAlphabet();
  let key = '';

  for (let i = 0; i < encryptionkey.length; i += 1) {
    if (encryptionkey[i] < 'A' || encryptionkey[i] > 'Z') continue;
    if (
      key.indexOf(encryptionkey[i]) === -1 &&
      encryptionkey[i] !== TRANSLATE_FROM
    )
      key += encryptionkey[i];
  }

  for (let i = 0; i < letters.length; i += 1) {
    if (key.indexOf(letters[i]) === -1 && letters[i] !== TRANSLATE_FROM)
      key += letters[i];
  }

  const table = [
    key.substring(0, 5),
    key.substring(5, 10),
    key.substring(10, 15),
    key.substring(15, 20),
    key.substring(20, 25),
  ];

  return table;
};

export const preprocessText = (src: string): string => {
  let dst = '';

  const srcUpperCase = src.toUpperCase();

  for (let i = 0; i < srcUpperCase.length; i += 1) {
    if (srcUpperCase[i] === TRANSLATE_FROM) dst += TRANSLATE_TO;
    else dst += srcUpperCase[i];
  }

  return dst;
};

export const findLetterPosition = (ch: string, table: string[]): any => {
  for (let i = 0; i < 5; i += 1)
    for (let j = 0; j < 5; j += 1)
      if (ch.toUpperCase() === table[i][j]) return { row: i, col: j };
  return null;
};
