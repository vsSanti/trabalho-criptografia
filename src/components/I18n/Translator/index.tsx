import { StringMap, TOptions } from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface TranslatorProps {
  path: string;
  options?: string | TOptions<StringMap>;
}

export const Translator: FC<TranslatorProps> = ({ path, options }) => {
  const { t } = useTranslation();

  return t(path, options);
};
