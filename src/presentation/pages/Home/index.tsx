import {CardAnimated} from '@/presentation/components/CardAnimated';
import React from 'react';

import * as S from './styles';

const Home: React.FC = () => {
  return (
    <S.Container>
      <S.TextHeader>Home page</S.TextHeader>
      <CardAnimated />
    </S.Container>
  );
};

export {Home};
