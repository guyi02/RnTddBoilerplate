import React, {useState} from 'react';

import * as S from './styles';
import {InputTextComponent} from '@/main/presentation/components/InputTextComponent';

const Login: React.FC = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  return (
    <S.Container>
      <S.FormArea>
        <S.InputWrapper>
          <InputTextComponent
            accessibilityHint="input-user"
            value={user}
            onChangeText={val => setUser(val)}
          />
        </S.InputWrapper>

        <S.InputWrapper>
          <InputTextComponent
            accessibilityHint="input-password"
            value={pass}
            onChangeText={val => setPass(val)}
          />
        </S.InputWrapper>
      </S.FormArea>
    </S.Container>
  );
};

export {Login};
