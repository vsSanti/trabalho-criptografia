export type CipherProps = {
  inputText: string;
  cipher: number | string;
  type: 'cipher' | 'decipher';
  method: 'caesar' | 'vigenere';
};
