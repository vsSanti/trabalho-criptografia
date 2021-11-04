import { Button } from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSelector: FC = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
      moment.locale(language.toLowerCase());
    },
    [i18n],
  );

  return (
    <>
      <Button onClick={() => handleChangeLanguage('pt-BR')}>Português</Button>
      <Button onClick={() => handleChangeLanguage('en-US')}>English</Button>
    </>
  );
};
