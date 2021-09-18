import React from 'react';
import * as ReactNative from 'react-native';

import * as S from './styles';

const InputTextComponent: React.FC<ReactNative.TextInputProps> = ({
  value,
  onChangeText,
  accessibilityHint,
}) => {
  return (
    <S.Container
      value={value}
      accessibilityHint={accessibilityHint}
      onChangeText={val => onChangeText(val)}
    />
  );
};

export {InputTextComponent};
