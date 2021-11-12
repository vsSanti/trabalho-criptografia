import { CipherProps } from 'pages/Dashboard/@types';

import { decrypt } from './decrypt';
import { encrypt } from './encrypt';

export const playfairMethod = (data: CipherProps): string => {
  if (data.type === 'cipher') {
    return encrypt(data);
  }

  return decrypt(data);
};
