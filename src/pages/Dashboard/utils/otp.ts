// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import otp from 'one-time-pad';

import { CipherProps } from '../@types';

const encrypt = (data: CipherProps): string => {
  return otp.encrypt(data.inputText, data.cipher);
};

const decrypt = (data: CipherProps): string => {
  return otp.decrypt(data.inputText, data.cipher);
};

export const otpMethod = (data: CipherProps): string => {
  if (data.type === 'cipher') {
    return encrypt(data);
  }

  return decrypt(data);
};
