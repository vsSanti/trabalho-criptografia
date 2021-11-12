/* eslint-disable prefer-destructuring */
import { CipherProps } from 'pages/Dashboard/@types';

import {
  findLetterPosition,
  getAlphabet,
  getKey,
  preprocessText,
} from './utils';

const PAD_CHARACTER = 'X';
const PAD_DOUBLE = true;

const encryptDigram = (text: string, table: string[]): any => {
  const pos1 = findLetterPosition(text[0], table);
  const pos2 = findLetterPosition(text[1], table);
  let ch1 = '';
  let ch2 = '';

  if (pos1.row === pos2.row && pos1.col === pos2.col) {
    ch1 = table[(pos1.row + 1) % 5][(pos1.col + 1) % 5];
    ch2 = table[(pos2.row + 1) % 5][(pos2.col + 1) % 5];
  } else if (pos1.row === pos2.row) {
    ch1 = table[pos1.row][(pos1.col + 1) % 5];
    ch2 = table[pos2.row][(pos2.col + 1) % 5];
  } else if (pos1.col === pos2.col) {
    ch1 = table[(pos1.row + 1) % 5][pos1.col];
    ch2 = table[(pos2.row + 1) % 5][pos2.col];
  } else {
    ch1 = table[pos1.row][pos2.col];
    ch2 = table[pos2.row][pos1.col];
  }

  if (text[0] >= 'a') ch1 = ch1.toLowerCase();
  if (text[1] >= 'a') ch2 = ch2.toLowerCase();
  return ch1 + ch2;
};

export const encrypt = (data: CipherProps): string => {
  const table = getKey(String(data.cipher));
  const letters = getAlphabet();

  const dst = preprocessText(data.inputText).split('');

  let i = 0;
  let digram: any[];

  while (i < dst.length) {
    if (letters.indexOf(dst[i].toUpperCase()) !== -1) {
      let j = i + 1;
      while (j < dst.length) {
        if (letters.indexOf(dst[j].toUpperCase()) !== -1) {
          if (dst[i].toUpperCase() === dst[j].toUpperCase() && PAD_DOUBLE) {
            dst.splice(j, 0, PAD_CHARACTER);
          }

          digram = encryptDigram(dst[i] + dst[j], table);
          dst[i] = digram[0];
          dst[j] = digram[1];
          break;
        }
        j += 1;
      }
      if (j >= dst.length) {
        digram = encryptDigram(dst[i] + PAD_CHARACTER, table);
        dst[i] = digram[0];
        dst.push(digram[1]);
      }
      i = j + 1;
    } else {
      i += 1;
    }
  }

  const result = dst.join('');

  return result;
};
