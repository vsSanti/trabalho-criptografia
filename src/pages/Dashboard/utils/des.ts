import { message } from 'antd';
import CryptoJS from 'crypto-js';

import { CipherProps } from '../@types';

type EncryptionType = 'des' | '3des';

type MethodProps = {
  data: CipherProps;
  mode: any;
  type: EncryptionType;
};

const desEncryption = ({ data, mode, type }: MethodProps): string => {
  if (type === 'des') {
    const encrypted = CryptoJS.DES.encrypt(
      String(data.inputText),
      String(data.cipher),
      { mode },
    );

    return encrypted.toString();
  }

  if (type === '3des') {
    const encrypted = CryptoJS.TripleDES.encrypt(
      String(data.inputText),
      String(data.cipher),
      { mode },
    );

    return encrypted.toString();
  }

  return 'error encryption';
};

const desDecryption = ({ data, mode, type }: MethodProps): string => {
  if (type === 'des') {
    return CryptoJS.DES.decrypt(data.inputText, String(data.cipher), {
      mode,
    }).toString(CryptoJS.enc.Utf8);
  }

  if (type === '3des') {
    return CryptoJS.TripleDES.decrypt(data.inputText, String(data.cipher), {
      mode,
    }).toString(CryptoJS.enc.Utf8);
  }

  return 'error decryption';
};

export const desMethod = (data: CipherProps, type: EncryptionType): string => {
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
      return desEncryption({ data, mode, type });
    }

    const cleanedInputText = data.inputText.replace(
      'data:application/octet-stream;base64,',
      '',
    );

    return desDecryption({
      data: { ...data, inputText: cleanedInputText },
      mode,
      type,
    });
  } catch (error) {
    message.error('Erro ao realizar operação!');
    return 'error';
  }
};
