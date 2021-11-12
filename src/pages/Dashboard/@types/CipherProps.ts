export type CipherProps = {
  inputText: string;
  cipher: number | string;
  type: 'cipher' | 'decipher';
  method: 'caesar' | 'des' | '3des' | 'hill' | 'otp' | 'playfair' | 'vigenere';
  fileName?: string;
  mode?: 'ecb' | 'cbc' | 'cfb' | 'ofb' | 'ctr';
};
