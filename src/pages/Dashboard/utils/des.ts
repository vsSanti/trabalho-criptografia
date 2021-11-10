import { message } from 'antd';
import CryptoJS from 'crypto-js';

import { CipherProps } from '../@types';

const desEncryption = (data: CipherProps, mode: any): string => {
  const encrypted = CryptoJS.DES.encrypt(
    String(data.inputText),
    String(data.cipher),
    { mode },
  );

  return encrypted.toString();
};

const desDecryption = (data: CipherProps, mode: any): string => {
  const decrypted = CryptoJS.DES.decrypt(data.inputText, String(data.cipher), {
    mode,
  }).toString(CryptoJS.enc.Utf8);

  return decrypted;
};

export const desMethod = (data: CipherProps): string => {
  let mode: any;
  switch (data.mode) {
    case 'cbc':
      mode = CryptoJS.mode.CBC;
      break;
    case 'cfb':
      mode = CryptoJS.mode.CFB;
      break;
    case 'ctr':
      mode = CryptoJS.mode.CTR;
      break;
    case 'ecb':
      mode = CryptoJS.mode.ECB;
      break;
    case 'ofb':
      mode = CryptoJS.mode.OFB;
      break;
    default:
      mode = CryptoJS.mode.CBC;
      break;
  }

  try {
    if (data.type === 'cipher') {
      return desEncryption(data, mode);
    }

    const cleanedInputText = data.inputText.replace(
      'data:application/octet-stream;base64,',
      '',
    );

    return desDecryption({ ...data, inputText: cleanedInputText }, mode);
  } catch (error) {
    message.error('Erro ao realizar operação!');
    return 'error';
  }
};
