import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
const {width} = Dimensions.get('screen');

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${props => props.theme.background};
  justify-content: center;
  align-items: center;
`;

export const FormArea = styled.View`
  border: 1px solid #000;
  width: ${width / 1.2}px;
`;

export const InputWrapper = styled.View`
  margin: 10px 0;
`;
