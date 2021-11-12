import { message } from 'antd';

import { CipherProps } from '../@types';

const encrypt = (data: CipherProps): string => {
  let plaintext = data.inputText.toLowerCase().replace(/[^a-z]/g, '');
  const k = String(data.cipher)
    .toLowerCase()
    .replace(/[^0-9 ]/g, '');
  const keys: any = k.split(' ');

  if (plaintext.length < 1) {
    message.error('please enter some plaintext (letters and numbers only)');
    return '';
  }

  if (plaintext.length % 2 === 1) {
    plaintext += 'x';
  }

  if (keys.length !== 4) {
    message.error('key should consist of 4 integers');
    return '';
  }
  for (let i = 0; i < 4; i += 1) keys[i] %= 26;

  let ciphertext = '';
  for (let i = 0; i < plaintext.length; i += 2) {
    ciphertext += String.fromCharCode(
      ((keys[0] * (plaintext.charCodeAt(i) - 97) +
        keys[1] * (plaintext.charCodeAt(i + 1) - 97)) %
        26) +
        97,
    );
    ciphertext += String.fromCharCode(
      ((keys[2] * (plaintext.charCodeAt(i) - 97) +
        keys[3] * (plaintext.charCodeAt(i + 1) - 97)) %
        26) +
        97,
    );
  }
  return ciphertext;
};

const decrypt = (data: CipherProps): string => {
  const ciphertext = data.inputText.toLowerCase().replace(/[^a-z]/g, '');
  const k = String(data.cipher)
    .toLowerCase()
    .replace(/[^0-9 ]/g, '');
  const keys: any = k.split(' ');

  if (ciphertext.length < 1) {
    message.error(
      'please enter some ciphertext (letters only, numbers should be spelled)',
    );
    return '';
  }
  if (ciphertext.length % 2 === 1) {
    message.error('ciphertext is not divisible by 2 (wrong algorithm?)');
    return '';
  }
  if (keys.length !== 4) {
    message.error('key should consist of 4 integers');
    return '';
  }
  for (let i = 0; i < 4; i += 1) keys[i] %= 26;
  // calc inv matrix
  let det = keys[0] * keys[3] - keys[1] * keys[2];
  det = ((det % 26) + 26) % 26;
  let di = 0;
  for (let i = 0; i < 26; i += 1) {
    if ((det * i) % 26 === 1) di = i;
  }

  if (di === 0) {
    message.error('could not invert, try different key');
    return '';
  }

  const ikeys = new Array(4);
  ikeys[0] = (di * keys[3]) % 26;
  ikeys[1] = (-1 * di * keys[1]) % 26;
  ikeys[2] = (-1 * di * keys[2]) % 26;
  ikeys[3] = di * keys[0];
  for (let i = 0; i < 4; i += 1) {
    if (ikeys[i] < 0) ikeys[i] += 26;
  }
  let plaintext = '';
  for (let i = 0; i < ciphertext.length; i += 2) {
    plaintext += String.fromCharCode(
      ((ikeys[0] * (ciphertext.charCodeAt(i) - 97) +
        ikeys[1] * (ciphertext.charCodeAt(i + 1) - 97)) %
        26) +
        97,
    );
    plaintext += String.fromCharCode(
      ((ikeys[2] * (ciphertext.charCodeAt(i) - 97) +
        ikeys[3] * (ciphertext.charCodeAt(i + 1) - 97)) %
        26) +
        97,
    );
  }
  return plaintext;
};

export const hillMethod = (data: CipherProps): string => {
  if (data.type === 'cipher') {
    return encrypt(data);
  }

  return decrypt(data);
};
