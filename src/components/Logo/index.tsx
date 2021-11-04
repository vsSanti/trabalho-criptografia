import { FC, useMemo, ImgHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { Dietitian, DietitianD, Nutricionista, NutricionistaN } from 'assets';

type LogoProps = ImgHTMLAttributes<HTMLImageElement> & {
  onlyLetter?: boolean;
};

export const Logo: FC<LogoProps> = ({ onlyLetter, ...rest }) => {
  const { i18n } = useTranslation();

  const logoAsset = useMemo(() => {
    if (i18n.language === 'pt-BR') {
      return onlyLetter ? NutricionistaN : Nutricionista;
    }

    return onlyLetter ? DietitianD : Dietitian;
  }, [i18n.language, onlyLetter]);

  return <img alt="Logo" src={logoAsset} {...rest} />;
};
